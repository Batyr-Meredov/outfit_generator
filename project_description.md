# Projektbeschreibung

Erstellt eine Web-Anwendung, bei der Nutzer ein Foto hochladen können (z. B. von sich selbst), und die App schlägt mit Hilfe von Stable Diffusion + LoRA-Modellen stylische Outfits oder Cosplay-Ideen vor – als generiertes Bild.

## Ziel des Projekts

    - Frontend: Web-Oberfläche zum Hochladen von Bildern und Auswahl des Stils
    - Backend: Anbindung an ComfyUI oder Automatic1111 zur Bildgenerierung
    - Modelle: Verwendung von SD3.5 + passenden LoRA-Modellen für Kleidung / Stil
    - Optional: Integration eines Outfit-Katalogs oder Links zu Shops

## Was lernen wir?

    - Bildverarbeitung mit KI (Stable Diffusion)
    - Umgang mit LoRAs und ControlNet
    - Backend-Kommunikation (API-Aufrufe)
    - Webentwicklung (z. B. React, Next.js, Flask oder FastAPI)
    - Teamarbeit mit Git/GitHub

## Was brauchen wir?

    - ComfyUI + ControlNet lokal installiert (wie oben beschrieben)
    - Erste LoRA-Modelle zum Testen z.B. von Civitai
    - Node zur Prompt - Eingabe + Image - Upload
    - Einfache Weboberfläche mit Upload-Funktion + Button "Outfit generieren"
    - Optional: Hugging Face oder eigenes Hosting zum Teilen

## Beispiel-Nutzerflow

    - Benutzer lädt ein Bild hoch
    - Wählt „Casual Streetwear“ oder „Cyberpunk“
    - Klickt auf „Outfit generieren“
    - KI gibt generiertes Bild im gewünschten Stil zurück
