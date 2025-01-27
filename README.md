# API para el Análisis de Sentimientos

## Descripción

Este proyecto combina el poder del modelo **Google Gemini** y herramientas modernas para realizar análisis de sentimientos en texto. Además, permite generar comentarios con sentimientos específicos. Está compuesto por dos componentes principales:

1. **Backend (FastAPI):** Recibe texto, analiza el sentimiento y genera comentarios basados en el análisis.
2. **Frontend (React Native):** Una aplicación móvil que interactúa con la API para proporcionar una interfaz de usuario intuitiva.

## Características

- Análisis de sentimientos en tiempo real.
- Generación de comentarios personalizados basados en sentimientos.
- Integración fluida entre FastAPI y React Native.
  
## Requisitos Previos

Asegúrate de contar con lo siguiente antes de empezar:

- **[Python:](https://www.python.org/downloads/)** (para ejecutar el backend con FastAPI).
- **[Node.js:](https://nodejs.org/en/download)** (para ejecutar el frontend con React Native).
- Una **[API Key válida de Google Gemini](https://aistudio.google.com/apikey)**.
- **Conexión de red** para configurar la IP del servidor en el frontend.

---

## Instalación y Configuración

### 1. Backend: FastAPI

1. **Clonar el repositorio** y moverte al directorio del backend:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <CARPETA_BACKEND>

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
   uvicorn AnalisisSentimientos:app --host 0.0.0.0 --port 8000 --reload
   ```
---

### Frontend: React Native

   4. En el archivo App.js, cambia la URL de la API:
   ```bash
   const response = await fetch("http://<TU_IP>:8000/analisisSentimientos", {
   ```
   ```bash
   const response = await fetch(`http://<TU_IP>:8000/comentario/${sentimientoSeleccionado}`, {
   ```
   5. Ejecuta la aplicación móvil:
   ```bash
   npx expo start
   ```

---
## Uso

1. **Inicia el backend:** Asegúrate de que el servidor FastAPI esté corriendo.
2. **Configura la IP:** Actualiza la URL del backend en el archivo `App.js`.
3. **Ejecuta el frontend:** Utiliza Expo para interactuar con la aplicación móvil.
4. **Realiza análisis de sentimientos:** Ingresa un texto y genera comentarios desde la app móvil.

