FROM node:20-alpine

WORKDIR /app

# copy package and tsconfig first for better caching
COPY package.json package-lock.json* ./
COPY tsconfig.json ./
COPY prisma ./prisma

# install all deps (including dev) so prisma CLI is available
RUN npm install

# copy source
COPY . ./

# build TypeScript
RUN npm run build

# generate prisma client (if prisma is present)
RUN npx prisma generate || true

EXPOSE 3000

CMD ["npm", "run", "start"]
