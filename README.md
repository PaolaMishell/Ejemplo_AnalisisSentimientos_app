# API para el Análisis de Sentimientos

## Descripción

Este proyecto utiliza el modelo de Google Gemini para realizar el análisis de sentimiento de un texto proporcionado por el usuario y generar comentarios con sentimientos específicos. Está compuesto por dos partes:

1. **FastAPI**: Se encarga de recibir el texto para analizar su sentimiento y generar comentarios.
2. **React Native**: Una aplicación móvil que interactúa con la API para realizar el análisis de sentimientos y generar comentarios.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener lo siguiente:

- **Python:** para el backend (FastAPI).
- **Node.js:** para el frontend (React Native).
- Una **API Key de Google Gemini**.
- **Configurar la IP del servidor** en la aplicación React Native.

### Instalación y Configuración

### Backend: FastAPI 
1. Instala las dependencias del backend:
   
```bash
pip install -r requirements.txt
```
2. Configura la API Key de Google Gemini:
Crea un archivo config.ini en el directorio raíz del proyecto con el siguiente contenido:
```bash
[APIAccess]
GOOGLE_API_KEY = TU_API_KEY_DE_GOOGLE_GEMINI
 ```
3. PARA EJECUTAR: Ejecuta la FastAPI:
 El servidor estará disponible en http://localhost:8000.
 ```bash
uvicorn main:app --reload
 ```
 
### Frontend: React Native

Configura la IP de la API:

En el archivo App.js, cambia la URL de la API:
```bash
const response = await fetch("http://<TU_IP_>:8000/analisisSentimientos", {
```

4. Ejecuta la aplicación móvil:
```bash
npx expo start
```
