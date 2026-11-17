<p align="center">
  <img src="./assets/logo.svg" alt="globe" width="250">
</p>

<h1 align="center">CountriesQL API</h1>

<p align="center">
  <strong>A free, production-ready GraphQL API for global geographic data</strong>
</p>

<p align="center">
  <a href="#">
    <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Apollo%20Server-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white" alt="Apollo Server">
  </a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#api-documentation">API Documentation</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 📋 Overview

CountriesQL API provides seamless access to comprehensive geographic data including countries, states, and cities worldwide. Built with Apollo Server and MongoDB, this API offers high performance, scalability, and ease of integration for your applications.

**Data Source**: [countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database) by [Darshan Gada](https://github.com/dr5hn)

## ✨ Features

- **Countries** - Access detailed country information including ISO codes, capital, currency, emoji, and more
- **States/Provinces** - Query states with geographic coordinates (latitude/longitude)
- **Cities** - Retrieve cities with regional relationships
- **Flexible Queries** - Filter by region, subregion, country name, state name, and more
- **Case-Insensitive Search** - Natural querying without worrying about case sensitivity
- **Production Ready** - MongoDB backend with optimized indexes for lightning-fast queries
- **Optional Redis caching** - Upstash Redis REST cache for GraphQL query results, with automatic MongoDB fallback whenever Redis is unavailable

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- MongoDB Atlas account (free tier available)
- npm or yarn

### Installation

````bash
# Clone the repository
git clone https://github.com/latifiss/countries-states-cities-graphql.git

# Navigate to project directory
cd countries-states-cities-graphql

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

### Configuration

Create your local `.env` file in the project root. The real `.env` file is ignored by Git and must never be committed. Start from the committed template:

```bash
cp .env.example .env
```

Then edit `.env` locally with your own MongoDB connection string and port. Never paste real credentials into source files, README examples, screenshots, or commits.

### Production notes

- Set `NODE_ENV=production` in deployment to disable GraphQL Playground and introspection and suppress debug details.
- Set `MONGO_DB_URI`, optionally `MONGO_DB_NAME`, and `PORT` in your deployment environment.
- The server connects to MongoDB and verifies it with a ping before accepting traffic.
- MongoDB indexes are ensured during startup. The migration command is idempotent and upserts records in batches.
- The API applies a 1 MB request-body limit and a maximum GraphQL field depth of 10.
- `npm start` runs the production server; `npm run dev` starts the development watcher; `npm run check` checks JavaScript syntax.

### Optional Upstash Redis Cache

Caching is optional. Create a Redis database in [Upstash](https://upstash.com/), then add its **REST URL** and **REST token** to your deployment environment (or local `.env`):

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

When both values are configured, GraphQL query results are cached for one hour. If either value is missing, Redis is unreachable, a request times out, or a cache response cannot be parsed, the API transparently runs the normal MongoDB resolver. Redis is never required for the API to start or answer requests. Cache entries expire automatically; after changing geographic data, wait for the one-hour TTL or delete the relevant keys in Upstash.

### Database Migration

Migrate the geographic data to MongoDB:

```bash
npm run migrate
```

### Start the Server

```bash
npm run dev
```

Your API will be available at `http://localhost:4000`

## 📖 API Documentation

### Available Queries

| Query                  | Description                     | Required Parameters |
| ---------------------- | ------------------------------- | ------------------- |
| `Countries`            | Get all countries               | None                |
| `Country`              | Get country by ISO2 code        | `iso2`              |
| `CountriesByRegion`    | Get countries by region         | `region`            |
| `CountriesBySubregion` | Get countries by subregion      | `subregion`         |
| `States`               | Get all states                  | None                |
| `StatesByCountry`      | Get states by country name      | `country_name`      |
| `State`                | Get state details by name       | `name`              |
| `Cities`               | Get all cities (limited to 100) | None                |
| `CitiesByState`        | Get cities by state name        | `state_name`        |
| `CitiesByCountry`      | Get cities by country name      | `country_name`      |
| `City`                 | Get city details by name        | `name`              |

### Example Queries

#### Get Countries by Region

```graphql
{
  CountriesByRegion(region: "Africa") {
    name
    iso2
    capital
    emoji
    currency
  }
}
```

#### Get States in a Country

```graphql
{
  StatesByCountry(country_name: "Canada") {
    name
    latitude
    longitude
  }
}
```

#### Get Cities in a State

```graphql
{
  CitiesByState(state_name: "California") {
    name
    country_name
    latitude
    longitude
  }
}
```

#### Complete Country Information

```graphql
{
  Country(iso2: "US") {
    name
    iso2
    iso3
    phone_code
    capital
    currency
    currency_name
    currency_symbol
    emoji
    region
    subregion
    latitude
    longitude
  }
}
```

## 🚢 Deployment

### Deploy to Render

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Add `MONGO_DB_URI` and `NODE_ENV=production` environment variables. Add Upstash credentials if you want caching.
6. Add your custom domain in Render settings
7. Configure your domain's DNS with a CNAME record

### Deploy to Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway add mongodb
railway up
```

## 🛠️ Tech Stack

- **GraphQL Server**: Apollo Server
- **Database**: MongoDB Atlas
- **Cache**: Upstash Redis (optional, REST API with graceful fallback)
- **Runtime**: Node.js 20+
- **Operations**: graceful shutdown, MongoDB connection pooling, query depth limit, bounded request bodies, production-safe GraphQL settings
- **ODM**: MongoDB Native Driver

## 📁 Project Structure

```
├── lib/\n│   └── cache.js            # Optional Upstash cache with fallback\n├── database/
│   └── db.js              # Database connection management
├── data/                  # JSON data files (for migration)
├── index.js               # Application entry point
├── schema.js              # GraphQL type definitions & resolvers
├── schema.graphqls        # GraphQL schema definition
├── migrate.js             # Database migration script
├── .env.example           # Safe environment variable template
├── .env                   # Local-only secrets (gitignored)
└── package.json           # Dependencies and scripts
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Latif Issaka**

- GitHub: [@latifiss](https://github.com/latifiss)

## 🙏 Acknowledgments

- [Darshan Gada](https://github.com/dr5hn) for the comprehensive countries-states-cities database
- NHN Cloud for the initial project inspiration

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/latifiss">Latif Issaka</a>
</p>
```
