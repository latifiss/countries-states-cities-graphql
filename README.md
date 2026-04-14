<p align="center">
  <img src="./assets/logo.svg" alt="globe" width="150">
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

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
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

Create a `.env` file in the root directory:

```env
MONGO_DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/data
PORT=4000
````

### Database Migration

Migrate the geographic data to MongoDB:

```bash
npm run migrate
```

### Start the Server

```bash
npm start
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
5. Add environment variable: `MONGO_DB_URI`
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
- **Runtime**: Node.js
- **ODM**: MongoDB Native Driver

## 📁 Project Structure

```
├── database/
│   └── db.js              # Database connection management
├── data/                  # JSON data files (for migration)
├── index.js               # Application entry point
├── schema.js              # GraphQL type definitions & resolvers
├── schema.graphqls        # GraphQL schema definition
├── migrate.js             # Database migration script
├── .env                   # Environment variables
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
