# Zipcodes Brazil: Study of NestJs + Prisma

# Technologies
- Docker
- MySql
- Javascript
- Typescript
- NodeJs
- Nestjs
- Express
- Prisma

# How to use
- Clone the repository
- Access the project directory
- Grant permission to the directory `chmod -R 777 ./`
- Rename `.env.example` file to `.env`
- Start Docker and run `docker-compose up`
- Access the application container `docker exec -it app bash`
- Run `npm install`
- Import database file `database_examples/zipcodes_brazil.sql`

# Endpoints
- `/states` - Get states
- `/:uf` - Get state by uf
- `/:uf/cities?page=1` - Get cities of state
- `/:uf/:city/range` - Get zipcode range of city
- `/:uf/:city/addresses/?page=1`- Get addresses of city
- `/:uf/:city/neighborhoods?page=1` - Get neighborhoods of city
- `/:uf/:city/:neighborhood/range` - Get zipcode range of neighborhood
- `/:uf/:city/:neighborhood/addresses?page=1`- Get addresses of neighborhood
- `/zipcode/:zipcode` - Get zipcode data