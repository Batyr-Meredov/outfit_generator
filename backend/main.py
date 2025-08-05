# backend/main.py

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse
import os
from pathlib import Path
from uuid import uuid4

app = FastAPI()

UPLOAD_DIR = "/comfyui-data/input"
OUTPUT_DIR = "/comfyui-data/output"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_image(image: UploadFile = File(...), style: str = Form(...)):
    filename = f"{uuid4().hex}_{image.filename}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    with open(filepath, "wb") as f:
        f.write(await image.read())
    return {"status": "ok", "filename": filename, "style": style}

@app.get("/result/{filename}")
def get_result(filename: str):
    path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(path):
        return FileResponse(path)
    return {"error": "File not found"}
