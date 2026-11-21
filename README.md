# Freebuff Portfolio Site

A full-stack portfolio website built with React + Vite on the frontend and Express + Mongoose on the backend. The project demonstrates end-to-end web development from UI to API to data persistence.

## Overview

- **Frontend**: React 18, Vite, React Router, Lucide icons
- **Backend**: Express, Helmet, CORS, Rate limiting, Zod validation
- **Storage**: Local JSON file (default) or MongoDB (via MONGODB_URI env var)
- **Deployment**: Client static files served by Express; API routes under `/api`

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- (Optional) MongoDB Atlas account for cloud database, or run MongoDB locally

## Installation

```bash
# 1. Install server dependencies
cd server
npm install

# 2. Install client dependencies
cd client
npm install
```

## Environment Configuration

Copy the `.env.example` to `.env` in the server directory:

```bash
cp server/.env.example server/.env
```

The `.env` file controls the following settings:

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `NODE_ENV` | `development` | Environment mode (`development` or `production`) |
| `CLIENT_ORIGIN` | `http://localhost:5173,http://127.0.0.1:5173` | Allowed CORS origins (comma-separated) |
| `MONGODB_URI` | *(empty)* | MongoDB connection string. If omitted, messages use local JSON storage |
| `CONTACT_STORE_PATH` | `server/data/messages.json` | Path to the local JSON file for message storage |

## Running in Development Mode

Start both the client and server concurrently:

```bash
# Terminal 1 - Start the server
cd server
npm run dev

# Terminal 2 - Start the Vite dev server
cd client
npm run dev
```

The server will be available at `http://localhost:5000` and the Vite dev server at `http://localhost:5173`. The server serves the Vite dev build for non-API routes, so visiting `http://localhost:5000/` in the browser will show the rendered app.

## Build for Production

```bash
# Build the client for production
cd client
npm run build
```

The build output goes to `client/dist/`. The Express server serves these static files in production mode.

## Production Serving

To run in production:

```bash
# From the server directory
cd server
npm start
```

The server will:
- Serve the built client files from `client/dist/`
- API routes under `/api/health` and `/api/contact` remain functional
- Non-API routes (`/`) will serve `index.html` for SPA routing
- Health checks include storage mode (`mongodb` or `file`), uptime, and environment

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api` | Root API info: OK status, app name, available endpoints |
| `GET` | `/api/health` | Health check: service OK, environment, storage mode, uptime |
| `POST` | `/api/contact` | Contact form: validates and stores messages (rate-limited to 5/15min) |

## Contact Form

The `/api/contact` endpoint accepts a JSON payload with these fields:

- `name` (string, min 2, max 80) — required
- `email` (string, valid email, max 254) — required, lowercased
- `company` (string, max 120) — optional
- `projectType` (enum: `Website`, `Web application`, `E-commerce`, `API / Backend`, `Something else`) — optional
- `budget` (enum: `< $2k`, `$2k - $5k`, `$5k - $10k`, `$10k+`, `Let's discuss`) — optional
- `message` (string, min 20, max 2000) — required

If a `website` field is present and non-empty, the request is accepted with a 202 status (spam protection).

Storage backend is determined by `MONGODB_URI`:
- Set → messages are stored in MongoDB via Mongoose
- Not set → messages are appended to `server/data/messages.json`

## Customization

### Adding/Changing Projects

Edit `client/src/data/projects.js` to add or modify project entries. Each project has:

- `title`, `subtitle`, `description`, `problem`, `architecture`
- `stack` (array of tech names)
- `category` (Full-Stack, Frontend, Backend)
- `year`, `demoUrl`, `repoUrl`
- `visual` (`dashboard`, `commerce`, `terminal`, `editorial`) — maps to the visualizer component

### Changing Colors / Design

The CSS uses CSS variables defined in `client/src/styles/index.css`. Update the `:root` block to change the entire theme.

### Adding/Modifying Stack Items

Edit `client/src/data/stack.js` to change the stack group icons, descriptions, and item lists.

### Adjusting Rate Limits

Modify `server/src/middleware/rateLimiters.js` to change the window duration and request limits for the general API limiter (`apiLimiter`) and the contact form limiter (`contactLimiter`).

### MongoDB Setup

1. Create a MongoDB Atlas cluster or run MongoDB locally
2. Obtain a connection string (format: `mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/`)
3. Set `MONGODB_URI` in `server/.env`
4. Restart the server — messages will now be stored in MongoDB

### Deploying

The project is designed for straightforward deployment:

- **Render / Railway / Fly.io**: Set the build command to `cd client && npm run build && cd server && npm install` and the start command to `node src/index.js`
- **Render**: Set `NODE_ENV=production` and provide `MONGODB_URI` if using database storage
- The Express server automatically serves the client `dist/` in production, so a single process handles both the SPA and the API

## Scripts

### Client (`client/package.json`)

- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build locally

### Server (`server/package.json`)

- `npm run dev` — Start with `node --watch` (nodemon-like auto-reload)
- `npm run start` — Start production server
- `npm run seed` — (Not implemented; would populate sample data if needed)

## Project Structure

```
.
├── client/          # Frontend React app
│   ├── src/
│   │   ├── App.jsx  # Main app component
│   │   ├── main.jsx # Entry point
│   │   ├── data/    # Projects, stack, site info
│   │   ├── hooks/   # Custom React hooks
│   │   ├── components/ # UI components
│   │   └── styles/  # CSS variables
│   └── index.html
├── server/          # Backend Express app
│   ├── src/
│   │   ├── app.js   # Express app creation
│   │   ├── config.js # Environment config
│   │   ├── index.js # Server entry with DB connect + listen
│   │   ├── routes/  # API routes
│   │   ├── middleware/ # Middleware (cors, rate limit, error handler)
│   │   ├── lib/     # DB connection, message store
│   │   └── models/  # Mongoose schemas
│   └── .env.example
├── package.json     # Root (scripts, engine config)
└── .gitignore
```