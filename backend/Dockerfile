# backend/Dockerfile

FROM python:3.10-slim

# Systempakete installieren
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Arbeitsverzeichnis setzen
WORKDIR /app

# Requirements rein
COPY requirements.txt .

# Python-Abhängigkeiten installieren
RUN pip install --no-cache-dir -r requirements.txt

# Restlicher Code
COPY . .

# Port freigeben
EXPOSE 8000

# Start FastAPI per Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
