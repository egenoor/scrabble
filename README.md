# Scrabble

## Created with

### Backend
Java 21

Spring Boot 3.4.1

### Frontend
Node.js v22.12.0

Angular v19

# Setup
## Install frontend packages
```bash
cd frontend
npm ci
```

## Frontend dev server with hot-reloading
Backend default port is 8080

Dev server proxy is setup in `frontend/src/proxy.conf.json`
```bash
cd frontend
npm start
```

## Example application.properties
Create `application.properties` inside `src/main/resources`.

You can choose between H2 in-memory database or run the example PostgreSQL via docker compose (see below)
```bash
spring.application.name=scrabble
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

#Postgres setup example
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=password

#H2 setup example
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
spring.datasource.url=jdbc:h2:mem:scrabble
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

dictionary.path=src/main/resources/dictionary.txt
server.error.include-message=always
```

## Run server for development
```bash
./gradlew bootRun
```
# Production
### Build jar (with bundled frontend)
```bash
./gradlew jar -Pprod
```

### Run jar
```bash
 ./gradlew run
```

## Unit tests

### Frontend

```bash
cd frontend
npm test

# or with coverage
npm run test:coverage
```

### Backend

```bash
./gradlew test
```

## (Optional) PostgresSQL via docker-compose
```bash
cd db
docker compose up -d # or "docker-compose up -d"
```