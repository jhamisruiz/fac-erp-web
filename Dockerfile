## STAGE: 1
FROM node:19.2.0-alpine3.16 as dev-deps
WORKDIR /app/build
COPY package.json package.json
####
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
COPY . .
RUN npm ci

### STAGE: 2
FROM node:19.2.0-alpine3.16 as builder
WORKDIR /app/build
COPY --from=dev-deps /app/build/node_modules ./node_modules
COPY . .
RUN npm run build:prod

# ### STAGE: 3
# FROM node:19.2.0-alpine3.16 as prod-deps
# WORKDIR /app/build
# #copiar del stage anterior
# COPY package.json package-lock.json ./
# RUN npm install --prod --frozen-lockfile

### STAGE: 4
FROM nginx:1.23.3 as nginx
#EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder  /app/build/dist /usr/share/nginx/html

CMD [ "nginx","-g", "daemon off;"]
