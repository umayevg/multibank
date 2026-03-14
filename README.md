# Real-Time Trading Dashboard

This project is a small real-time trading dashboard built as part of a coding challenge.

## Live Demo

https://multibank-nu.vercel.app/

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
- Ability to switch between instruments
- Mock historical price data
- Responsive dashboard layout
- Loading state while fetching market data
- Environment-based API configuration using Vite environment variables

---

## Architecture

The backend service simulates a market data feed and exposes:

### REST API

- `GET /tickers`
  Returns a list of available tickers and their current prices.

- `GET /historical/:ticker`
  Returns mocked historical price data for a given ticker.

### WebSocket

A WebSocket server broadcasts price updates to connected clients in real time.

### Frontend

The React dashboard:

- fetches initial data via REST
- subscribes to WebSocket updates
- updates ticker prices and chart data in real time

---

## Running the Project

### Option 1 — Run with Docker (Recommended)

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

### Option 2 — Run Locally Without Docker

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

## Environment Variables

Frontend uses environment variables to configure the backend API URL.

Example `.env` file inside the `frontend` directory:

```
VITE_API_URL=http://localhost:4000
```

---

## Assumptions & Trade-offs

- Market data is simulated using random price changes on the backend.
- Historical price data is generated dynamically rather than stored in a database.
- WebSocket updates are broadcast to all connected clients.

---

## Bonus Features

- Responsive UI for mobile and desktop
- Docker + Docker Compose setup for easy local execution
- Environment-based configuration for API URLs
- Real-time chart updates

---

## Running Tests

Backend unit tests can be executed from the `backend` directory.

```
cd backend
npm install
npm run test
```

If no tests are present, this command will simply exit without running tests.
