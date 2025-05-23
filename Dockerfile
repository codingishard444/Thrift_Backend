FROM node:24.0-alpine AS compiler
WORKDIR /app/

COPY package*.json .
RUN npm install

COPY . .

FROM node:24.0-alpine AS runner
WORKDIR /app/

COPY --from=compiler /app/ ./

EXPOSE 9090
CMD ["node","app.js"]
