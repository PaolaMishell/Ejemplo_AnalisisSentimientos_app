import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [texto, setTexto] = useState('');
  const [sentimiento, setSentimiento] = useState(null);
  const [cargandoAnalizar, setCargandoAnalizar] = useState(false);
  const [cargandoComentario, setCargandoComentario] = useState(false);
  const [sentimientoSeleccionado, setSentimientoSeleccionado] = useState('POSITIVO');
  const [comentarioGenerado, setComentarioGenerado] = useState('');

  const handleSubmit = async () => {
    setCargandoAnalizar(true);
    try {
      const response = await fetch("http://X.X.X.X:8000/analisisSentimientos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto }),
      });
      const data = await response.json();
      if (response.ok) {
        setSentimiento(data.sentimiento);
      } else {
        alert("Error: " + data.detail);
      }
    } catch (error) {
      alert("Error al conectarse a la API: " + error.message);
    }
    setCargandoAnalizar(false);
  };

  const handleGenerarComentario = async () => {
    setCargandoComentario(true);
    try {
      const response = await fetch(`http://X.X.X.X:8000/comentario/${sentimientoSeleccionado}`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setComentarioGenerado(data.comentario);
      } else {
        alert("Error: " + data.detail);
      }
    } catch (error) {
      alert("Error al conectarse a la API: " + error.message);
    }
    setCargandoComentario(false);
  };

  const handleReset = () => {
    setTexto('');
    setSentimiento(null);
    setSentimientoSeleccionado('POSITIVO');
    setComentarioGenerado('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analizador de Sentimientos</Text>

      <View style={styles.box}>
        <Text style={styles.title}>Análisis de Sentimientos</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe un comentario"
          onChangeText={setTexto}
          value={texto}
        />
        <View style={styles.buttonContainer}>
          <Button title="Analizar Sentimiento" onPress={handleSubmit} color="#4f7d96" />
        </View>
        {cargandoAnalizar ? (
          <ActivityIndicator size="large" color="#4f7d96" style={styles.loader} />
        ) : (
          sentimiento && <Text style={styles.result}>Sentimiento: {sentimiento}</Text>
        )}
      </View>

      <View style={styles.box}>
        <Text style={styles.title}>Generar Comentario</Text>
        <Picker
          selectedValue={sentimientoSeleccionado}
          onValueChange={(itemValue) => setSentimientoSeleccionado(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="POSITIVO" value="POSITIVO" />
          <Picker.Item label="NEGATIVO" value="NEGATIVO" />
          <Picker.Item label="NEUTRO" value="NEUTRO" />
        </Picker>
        <View style={styles.buttonContainer}>
          <Button title="Generar Comentario" onPress={handleGenerarComentario} color="#4f7d96" />
        </View>
        {cargandoComentario ? (
          <ActivityIndicator size="large" color="#4f7d96" style={styles.loader} />
        ) : (
          comentarioGenerado && (
            <View style={styles.commentContainer}>
              <Text style={styles.generatedComment}>Comentario Generado: {comentarioGenerado}</Text>
            </View>
          )
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="LIMPIAR" onPress={handleReset} color="#cc9999" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  box: {
    width: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 12, // Ajusta el tamaño de la letra aquí
  },  
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: '#4f7d96',
    fontWeight: 'bold',
  },
  commentContainer: {
    marginTop: 20,
    width: '100%',
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  generatedComment: {
    fontSize: 16,
    color: '#2C6B3B',
    fontWeight: 'bold',
  },
});
