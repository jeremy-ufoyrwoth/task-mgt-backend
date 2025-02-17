FROM node:alpine

WORKDIR /app

ENV DATABASE_URL=postgresql://neondb_owner:npg_tKEisaqAP87e@ep-yellow-snow-a8ppsl6k-pooler.eastus2.azure.neon.tech/neondb?sslmode=require

ENV JWT_SECRETE_KEY=ueFGRVlgIkCrmxew61kSK0W2KFAGWQE5qNaPFvuSFqB3kb9AKKwkfWKoA6aIagDTlfvwHBYyWghg6OH8gXN9SrGVXM3njHNW

ENV PORT=4001

COPY package.json .

RUN npm install

COPY . /app

EXPOSE 4001:4001

CMD ["npm", "run", "prod"]