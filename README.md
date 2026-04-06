# URL Shortener

A lightweight Node.js + Express + TypeScript service for shortening URLs and redirecting to the original destination.

## Features

- Create shortened URLs via REST API
- Redirect from shortened URL to original URL
- Input validation with Joi
- MySQL-backed persistence
- Environment-driven configuration

## Project Structure

- `src/app.ts` - Express app setup
- `src/server.ts` - Server entry point
- `src/config/` - Environment and database configuration
- `src/database/` - Database connection and pool setup
- `src/middleware/` - Custom middleware for validation and error handling
- `src/modules/urlShortner/` - URL shortening module with controller, service, repository, route, validation, and types
- `src/utils/base64.ts` - Utility helper for encoding/decoding

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL database

### Install dependencies

```bash
npm install
```

### Environment

Create a `.env` file in the project root with your database credentials and any environment settings required by `src/config/env.config.ts`.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=url_shortener
PORT=3000
```

### Run in development

```bash
npm run dev
```

### Build and run production

```bash
npm run build
npm start
```

## API Endpoints

The project exposes URL-shortening endpoints defined in `src/modules/urlShortner/urlShortner.route.ts`.

Typical endpoints include:

- `POST /shorten` - Create a shortened URL
- `GET /:code` - Redirect to the original URL

> Check the module route file for the exact endpoint paths and request payload requirements.

## Notes

- The service uses `tsx` for TypeScript execution in development.
- Build artifacts are emitted to `dist/` by `tsc`.

## License

ISC
