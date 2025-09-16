FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY scripts ./scripts
RUN chmod +x ./scripts/wait-for.sh
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "dist/index.js"]
