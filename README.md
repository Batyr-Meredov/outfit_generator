# Outfit Generator with ComfyUI

A web application for generating stylish outfit images using Stable Diffusion ans LoRa models.
The project uses a Python backend and CompfyUi as the image generation engine, orchestrated vie Docker.

## 🚀 How to Start the Project

## Clone Rerository

## First, clone your main project (if you haven’t already):

```shell
git clone https://github.com/Batyr-Meredov/outfit_generator.git
cd outfit_generator
```

## Then, inside this folder, clone ComfyUI Repository

```shell
git clone https://github.com/comfyanonymous/ComfyUI.git
```

## Create ComfyUI/Dockerfile with the following content

```shell
FROM python:3.10-slim

# Systemabhängigkeiten installieren
RUN apt-get update && apt-get install -y \
    git wget build-essential ffmpeg libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Arbeitsverzeichnis setzen
WORKDIR /app

# Projektdateien ins Image kopieren
COPY . .

# PyTorch + torchaudio (CPU-only) installieren – ohne torchvision
RUN pip install --no-cache-dir \
    torch==2.2.2 \
    torchaudio==2.2.2 \
    --index-url https://download.pytorch.org/whl/cpu

# Abhängigkeiten von ComfyUI installieren (requirements.txt)
RUN pip install --no-cache-dir -r requirements.txt

# xformers installieren (CPU-kompatibel)
RUN pip install --no-cache-dir xformers

# CUDA deaktivieren
ENV CUDA_VISIBLE_DEVICES=""

# PATCH: CUDA-Zwang durch CPU-Fallback ersetzen
RUN sed -i 's/return torch.device(torch.cuda.current_device())/return torch.device("cpu")/' comfy/model_management.py

# Port für ComfyUI Webserver
EXPOSE 8188

# Gemeinsames Volume (comfyui-data)
VOLUME ["/workspace"]

# Startbefehl für ComfyUI
CMD ["python", "main.py", "--listen", "--port", "8188", "--output-directory", "/workspace/output", "--input-directory", "/workspace/input"]
```

## Place your .safetensors checkpoint files inside

📁 Note: The folder `ComfyUI/models/checkpoints/` is visible in the repo,
but `.safetensors` files are excluded by `.gitignore`.
Please put your models there yourself.

## Execute the following command in the main folder outfit_generator

```shell
curl -L -o ComfyUI/models/checkpoints/v1-5-pruned-emaonly.safetensors \
https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors
```

## Execute Docker Compose to build and start all services

```shell
docker-compose build --no-cache
```

```shell
docker compose up -d 
```

#### Open your browser and go to http://localhost:8188

#### backend service running on port 8000 http://localhost:8000 and frontend you can also check http://localhost:5173