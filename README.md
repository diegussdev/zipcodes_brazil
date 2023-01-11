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
- `/zipcode/:zipcode` - Get zipcode data
- `/cities/:uf` - Get cities of state
- `/cities/range/:uf/:city` - Get zipcode range of city
- `/neighborhoods/:uf/:city?page=1` - Get neighborhoods of city
- `/neighborhoods/range/:uf/:city/:neighborhood` - Get zipcode range of neighborhood
- `/addresses/:uf/:city/:neighborhood?page=1`- Get addresses of neighborhood/city (neighborhood parameter is optional)