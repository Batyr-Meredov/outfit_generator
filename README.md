# Outfit Generator with ComfyUI

A web application for generating stylish outfit images using Stable Diffusion ans LoRa models.
The project uses a Python backend and CompfyUi as the image generation engine, orchestrated vie Docker.

## Features

- Upload image and apply outfit style(e.g., cosplay)
- Image generation with Stable Diffusion and LoRA
- Modular Docker setup (backend + ComfyUI)
- Shared data folder for input, output, models

## Project Structure

...........

## Getting Started

This project uses Docker Compose to run a backend service and ComfyUI as a submodule.
📦 Clone the Repository (with Submodules)
To ensure all dependencies are available (especially the ComfyUI folder), clone with submodules

## 🛠 Setup

```bash
# Clone the repository with submodules
git clone --recurse-submodules https://github.com/<your-username>/outfit_generator.git
cd outfit_generator

# If you already cloned without submodules
git submodule update --init --recursive

# Build and start all services using Docker Compose
docker compose up --build
