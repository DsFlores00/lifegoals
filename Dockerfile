#ETAPA 1: Compilación de la aplicación (Build) 
FROM node:20-alpine AS build 
WORKDIR /app
# Copiamos los archivos de empaquetado e instalamos dependencias
COPY package*.json ./ 
RUN npm install --legacy-peer-deps
# Copiamos el resto del código fuente y compilamos en modo producción
COPY . . 
RUN npm run build -- --configuration=production
# ETAPA 2: Servidor de producción (Run)
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos compilados de Angular al directorio de Nginx
COPY --from=build /app/dist/lifegoals/browser /usr/share/nginx/html
# Exponemos el puerto estándar 80 del contenedor
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
