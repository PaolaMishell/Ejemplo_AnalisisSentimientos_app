from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai 
from configparser import ConfigParser 
from fastapi.middleware.cors import CORSMiddleware


descripcion ="""
Utiliza el modelo de Google Gemini para realizar el análisis de sentimiento.
"""

# Crea una instancia de la aplicación FastAPI
app = FastAPI(
    title="API para el Análisis de Sentimientos",
    description=descripcion)

# Permite que la API sea accesible desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define el modelo de datos ---> texto enviado por los usarios
class SentimientoRequest(BaseModel):
    texto: str    
    

# Define el modelo de datos para la respuesta de sentimiento
class SentimientoResponse(BaseModel):
    sentimiento: str

# Define el modelo de datos para la respuesta de comentario
class ComentarioResponse(BaseModel):
    comentario: str


descripcionMetodo ="""
Analiza el sentimiento de un texto proporcionado por el usuario.
Su salida la clasifica en:
* POSITIVO
* NEGATIVO 
* NEUTRO
"""

# Define la ruta para el analisis de sentimientos del texto
@app.post("/analisisSentimientos", response_model=SentimientoResponse,description=descripcionMetodo)
async def analisis_sentimiento(request: SentimientoRequest):
    # Validación de la entrada y si está vacío
    if request.texto == "":
        raise HTTPException(status_code=400,detail="El texto no puede estar vacío")
    # Crea una instancia de ConfigParser para leer el archivo de configuración
    config = ConfigParser()
    config.read("config.ini")
    # Obtiene la API KEY de Google Gemeni desde el archivo de configuración
    GOOGLE_API_KEY = config["APIAccess"]["GOOGLE_API_KEY"]
    
    # Contexto y las instrucciones para el modelo generativo
    systemPrompt="""
    Eres un experto analizando el sentimiento de textos entregados por los usuarios, te va a entregar un comentario y 
    vas a clasificar si su sentimiento es: POSITIVO, NEGATIVO o NEUTRO o es una palabra que no tiene sentido.
    """
    # Configura la API KEY para la librería google-generativeai
    genai.configure(api_key = GOOGLE_API_KEY)
    # Define el prompt para el modelo
    prompt=[
            {
            "role": "user",
            "parts": [
                request.texto,
            ],
            }]
    # Carga el modelo de Gemini
    model = genai.GenerativeModel('gemini-1.5-flash',system_instruction=systemPrompt)
    # Genera la respuesta del modelo
    response = model.generate_content(prompt)
    # Eliminamos saltos de línea
    resultado = response.text.replace("\n","")
    # Retorna la respuesta como un objeto SentimientoResponse
    return SentimientoResponse(sentimiento=resultado)


# Define la ruta para generar un comentario con un sentimiento específico
@app.get("/comentario/{sentimiento}")
async def generar_comentario_sentimiento(sentimiento):
    # Valida que el sentimiento sea POSITIVO, NEGATIVO o NEUTRO
    if  sentimiento.upper() not in ["POSITIVO","NEGATIVO","NEUTRO"]:
        raise HTTPException(status_code=400,detail="Debe indicar un sentimiento POSITIVO, NEGATIVO o NEUTRO")
 
    config = ConfigParser()
    config.read("config.ini")
    GOOGLE_API_KEY = config["APIAccess"]["GOOGLE_API_KEY"]
    # Define el prompt para el modelo
    systemPrompt="""
    Genera un comentario para un producto o servicio con el sentimiento entregado por el usuario.
    """
    genai.configure(api_key = GOOGLE_API_KEY)
    prompt=[
            {
            "role": "user",
            "parts": [
                sentimiento,
            ],
            }]
    # Carga el modelo y genera el comentario.
    model = genai.GenerativeModel('gemini-1.5-flash',system_instruction=systemPrompt)
    response = model.generate_content(prompt)
    resultado = response.text.replace("\n","")
    return ComentarioResponse(comentario=resultado)