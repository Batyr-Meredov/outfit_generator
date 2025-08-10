FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

# Rest des Codes wird als Volume gemountet (s. compose), daher hier kein COPY .
EXPOSE 5173
CMD ["npm","run","dev","--","--host","0.0.0.0"]
