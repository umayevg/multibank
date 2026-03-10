# Real-Time Trading Dashboard

This project is a small real-time trading dashboard built as part of a coding challenge.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Recharts
- WebSocket client

### Backend

- Node.js
- WebSocket (`ws`)
- REST API

### Dev / Infrastructure

- Docker
- Docker Compose

---

## Features

- Real-time price updates via WebSocket
- List of available tickers
- Interactive price chart
- Switch between instruments
- Mock historical price data

---

## Architecture

The backend service simulates a market data feed and exposes:

REST API endpoints:

- `GET /tickers`
- `GET /historical/:ticker`

WebSocket:

- Streams real-time price updates for all tickers

The frontend consumes both the REST API and WebSocket stream to render the dashboard and update prices in real time.

---

## Running the project

### Option 1 — Run with Docker (recommended)

Make sure Docker is installed.

Run:

```
docker compose up --build
```

After the containers start:

Frontend:

```
http://localhost:5173
```

Backend API:

```
http://localhost:4000
```

---

### Option 2 — Run locally without Docker

#### Backend

```
cd backend
npm install
npm run dev
```

Backend will run on:

```
http://localhost:4000
```

#### Frontend

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## Assumptions

- Market data is simulated using random price movements.
- Historical price data is generated dynamically by the backend.
- The focus of this project is demonstrating real-time data flow and dashboard interaction.
