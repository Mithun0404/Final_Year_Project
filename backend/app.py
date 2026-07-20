from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from predictor import predict

app = FastAPI(title="Mango Disease Detection")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "API Running"}


@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):

    image = Image.open(file.file)

    result = predict(image)

    return result