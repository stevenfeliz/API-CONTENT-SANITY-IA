
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

WORKDIR /app

COPY package*.json ./

RUN npx playwright install-deps chromium


RUN npm install -g typescript

RUN npm install

COPY . .

RUN tsc

EXPOSE 3004

CMD ["node", "dist/app.js"]

# docker build -t adriel .

# docker run -p 3004:3004 adriel