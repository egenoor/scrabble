# Scrabble

## Created with

### Backend
Java 21

Spring Boot 3.4.1

### Frontend
Node.js v22.12.0

Angular v19

## Install frontend packages
```bash
cd frontend
npm ci
```

## Frontend dev server with hot-reloading
```bash
cd frontend
npm start
```

## Run server in development mode
```bash
./gradlew bootRun
```

## Build for production (with frontend)
```bash
./gradlew jar -Pprod
```

## Run production build
```bash
 ./gradlew run
```

## Running unit tests

### Frontend

```bash
cd frontend
```

```bash
npm test

# or with coverage
npm run test:coverage
```

### Backend

```bash
./gradlew test
```
