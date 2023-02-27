FROM node:16-alpine3.16
WORKDIR /app/
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE ${PORT}
