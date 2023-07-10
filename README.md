<p align="center">
  <img src="./assets/logo.svg" alt="globe" width="150">
</p>

<h1 align="center">CountryStateCity GraphQL API</h1>

A 🆓free GraphQL API for information about countries🇭🇲, states🌐 and cities🏙. This project uses data obtained from the [countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database) by 👨‍💻[Darshan Gada](https://github.com/dr5hn) and personally gathered data🖋.

- Get a list of `countries` with `iso2`, `iso3`, `phone_code`, `capital`, `currency`, `emoji` etc.
- Get a list of `countries` by Regions or SubRegions
- Get a list `States` with `name`, `longitude`, `latitude`, `cities`, etc

## 🚩 Table of Contents

- [📦 Packages](#-packages)
- [📙 Documents](#-documents)
- [Collect statistics on the use of open source](#collect-statistics-on-the-use-of-open-source)
- [📦 Queries](#-queries)
  - [Get All Countries](#-get-all-countries)
  - [Get Country Details](#-get-country-details)
  - [Get Countries By Region](#-get-countries-by-region)
  - [Get Countries By SubRegion](#-get-countries-by-subregion)
  - [Get All States](#-get-all-states)
  - [Get States By Country](#-get-states-by-country)
  - [Get State Details](#-get-state-details)
  - [Get City By Country](#-get-city-by-country)
  - [Get City By State](#-get-city-by-state)
  - [Get City Details](#-get-city-details)
- [🎨 Examples](#-examples)
- [💬 Contributing](#-contributing)
- [🚀 Used By](#-used-by)
- [📜 License](#-license)

## Docs

Read about all of the fields available and view example queries in [the docs](http://localhost:4000/). You can also check out [the playground](http://localhost:4000/) to explore the schema and test out some queries.

## 📦 Queries

### Get a list of states by country

```graphql
{
  StatesByCountry(country_name: "Nigeria") {
    id
    name
    latitude
    longitude
  }
}
```

The above GraphQL query will produce the following JSON response:

```json
{
  "data": {
    "StatesByCountry": [
      {
        "id": 53,
        "name": "Ahafo",
        "latitude": 7.5821372,
        "longitude": -2.5497463
      },
      {
        "id": 48,
        "name": "Ashanti",
        "latitude": 6.7470436,
        "longitude": -1.5208624
      },
      {
        "id": 4959,
        "name": "Bono",
        "latitude": 7.65,
        "longitude": -2.5
      },
      {
        "id": 4958,
        "name": "Bono East",
        "latitude": 7.75,
        "longitude": -1.05
      },
      {
        "id": 52,
        "name": "Central",
        "latitude": 5.5,
        "longitude": -1
      },
      {
        "id": 50,
        "name": "Eastern",
        "latitude": 6.5,
        "longitude": -0.5
      },
      {
        "id": 54,
        "name": "Greater Accra",
        "latitude": 5.8142836,
        "longitude": 0.0746767
      },
      {
        "id": 4960,
        "name": "North East",
        "latitude": 10.516667,
        "longitude": -0.366667
      },
      {
        "id": 51,
        "name": "Northern",
        "latitude": 9.5,
        "longitude": -1
      },
      {
        "id": 4961,
        "name": "Oti",
        "latitude": 7.9,
        "longitude": 0.3
      },
      {
        "id": 4962,
        "name": "Savannah",
        "latitude": 9.083333,
        "longitude": -1.816667
      },
      {
        "id": 55,
        "name": "Upper East",
        "latitude": 10.7082499,
        "longitude": -0.9820668
      },
      {
        "id": 57,
        "name": "Upper West",
        "latitude": 10.2529757,
        "longitude": -2.1450245
      },
      {
        "id": 56,
        "name": "Volta",
        "latitude": 6.5781373,
        "longitude": 0.4502368
      },
      {
        "id": 49,
        "name": "Western",
        "latitude": 5.5,
        "longitude": -2.5
      },
      {
        "id": 4963,
        "name": "Western North",
        "latitude": 6.3,
        "longitude": -2.8
      }
    ]
  }
}
```

---

### Get a list of countries by region

```graphql
{
  CountriesByRegion(region: "Oceania") {
    id
    iso2
    name
    emoji
    numeric_code
    phone_code
    capital
    currency
    currency_name
    currency_symbol
    tld
    native
    region
    longitude
    latitude
  }
}
```

The above GraphQL query will produce the following JSON response:

```json
{
  "data": {
    "CountriesByRegion": [
      {
        "id": 5,
        "iso2": "AS",
        "name": "American Samoa",
        "emoji": "🇦🇸",
        "numeric_code": "016",
        "phone_code": "+1-684",
        "capital": "Pago Pago",
        "currency": "USD",
        "currency_name": "US Dollar",
        "currency_symbol": "$",
        "tld": ".as",
        "native": "American Samoa",
        "region": "Oceania",
        "longitude": -170,
        "latitude": -14.33333333
      },
      {
        "id": 14,
        "iso2": "AU",
        "name": "Australia",
        "emoji": "🇦🇺",
        "numeric_code": "036",
        "phone_code": "61",
        "capital": "Canberra",
        "currency": "AUD",
        "currency_name": "Australian dollar",
        "currency_symbol": "$",
        "tld": ".au",
        "native": "Australia",
        "region": "Oceania",
        "longitude": 133,
        "latitude": -27
      },
      {
        "id": 46,
        "iso2": "CX",
        "name": "Christmas Island",
        "emoji": "🇨🇽",
        "numeric_code": "162",
        "phone_code": "61",
        "capital": "Flying Fish Cove",
        "currency": "AUD",
        "currency_name": "Australian dollar",
        "currency_symbol": "$",
        "tld": ".cx",
        "native": "Christmas Island",
        "region": "Oceania",
        "longitude": 105.66666666,
        "latitude": -10.5
      },
      {
        "id": 47,
        "iso2": "CC",
        "name": "Cocos (Keeling) Islands",
        "emoji": "🇨🇨",
        "numeric_code": "166",
        "phone_code": "61",
        "capital": "West Island",
        "currency": "AUD",
        "currency_name": "Australian dollar",
        "currency_symbol": "$",
        "tld": ".cc",
        "native": "Cocos (Keeling) Islands",
        "region": "Oceania",
        "longitude": 96.83333333,
        "latitude": -12.5
      },
      {
        "id": 52,
        "iso2": "CK",
        "name": "Cook Islands",
        "emoji": "🇨🇰",
        "numeric_code": "184",
        "phone_code": "682",
        "capital": "Avarua",
        "currency": "NZD",
        "currency_name": "Cook Islands dollar",
        "currency_symbol": "$",
        "tld": ".ck",
        "native": "Cook Islands",
        "region": "Oceania",
        "longitude": -159.76666666,
        "latitude": -21.23333333
      },
      {
        "id": 73,
        "iso2": "FJ",
        "name": "Fiji Islands",
        "emoji": "🇫🇯",
        "numeric_code": "242",
        "phone_code": "679",
        "capital": "Suva",
        "currency": "FJD",
        "currency_name": "Fijian dollar",
        "currency_symbol": "FJ$",
        "tld": ".fj",
        "native": "Fiji",
        "region": "Oceania",
        "longitude": 175,
        "latitude": -18
      },
      {
        "id": 77,
        "iso2": "PF",
        "name": "French Polynesia",
        "emoji": "🇵🇫",
        "numeric_code": "258",
        "phone_code": "689",
        "capital": "Papeete",
        "currency": "XPF",
        "currency_name": "CFP franc",
        "currency_symbol": "₣",
        "tld": ".pf",
        "native": "Polynésie française",
        "region": "Oceania",
        "longitude": -140,
        "latitude": -15
      },
      {
        "id": 89,
        "iso2": "GU",
        "name": "Guam",
        "emoji": "🇬🇺",
        "numeric_code": "316",
        "phone_code": "+1-671",
        "capital": "Hagatna",
        "currency": "USD",
        "currency_name": "US Dollar",
        "currency_symbol": "$",
        "tld": ".gu",
        "native": "Guam",
        "region": "Oceania",
        "longitude": 144.78333333,
        "latitude": 13.46666666
      },
      {
        "id": 114,
        "iso2": "KI",
        "name": "Kiribati",
        "emoji": "🇰🇮",
        "numeric_code": "296",
        "phone_code": "686",
        "capital": "Tarawa",
        "currency": "AUD",
        "currency_name": "Australian dollar",
        "currency_symbol": "$",
        "tld": ".ki",
        "native": "Kiribati",
        "region": "Oceania",
        "longitude": 173,
        "latitude": 1.41666666
      },
      {
        "id": 137,
        "iso2": "MH",
        "name": "Marshall Islands",
        "emoji": "🇲🇭",
        "numeric_code": "584",
        "phone_code": "692",
        "capital": "Majuro",
        "currency": "USD",
        "currency_name": "United States dollar",
        "currency_symbol": "$",
        "tld": ".mh",
        "native": "M̧ajeļ",
        "region": "Oceania",
        "longitude": 168,
        "latitude": 9
      },
      {
        "id": 143,
        "iso2": "FM",
        "name": "Micronesia",
        "emoji": "🇫🇲",
        "numeric_code": "583",
        "phone_code": "691",
        "capital": "Palikir",
        "currency": "USD",
        "currency_name": "United States dollar",
        "currency_symbol": "$",
        "tld": ".fm",
        "native": "Micronesia",
        "region": "Oceania",
        "longitude": 158.25,
        "latitude": 6.91666666
      },
      {
        "id": 153,
        "iso2": "NR",
        "name": "Nauru",
        "emoji": "🇳🇷",
        "numeric_code": "520",
        "phone_code": "674",
        "capital": "Yaren",
        "currency": "AUD",
        "currency_name": "Australian dollar",
        "currency_symbol": "$",
        "tld": ".nr",
        "native": "Nauru",
        "region": "Oceania",
        "longitude": 166.91666666,
        "latitude": -0.53333333
      },
      {
        "id": 157,
        "iso2": "NC",
        "name": "New Caledonia",
        "emoji": "🇳🇨",
        "numeric_code": "540",
        "phone_code": "687",
        "capital": "Noumea",
        "currency": "XPF",
        "currency_name": "CFP franc",
        "currency_symbol": "₣",
        "tld": ".nc",
        "native": "Nouvelle-Calédonie",
        "region": "Oceania",
        "longitude": 165.5,
        "latitude": -21.5
      },
      {
        "id": 158,
        "iso2": "NZ",
        "name": "New Zealand",
        "emoji": "🇳🇿",
        "numeric_code": "554",
        "phone_code": "64",
        "capital": "Wellington",
        "currency": "NZD",
        "currency_name": "New Zealand dollar",
        "currency_symbol": "$",
        "tld": ".nz",
        "native": "New Zealand",
        "region": "Oceania",
        "longitude": 174,
        "latitude": -41
      },
      {
        "id": 162,
        "iso2": "NU",
        "name": "Niue",
        "emoji": "🇳🇺",
        "numeric_code": "570",
        "phone_code": "683",
        "capital": "Alofi",
        "currency": "NZD",
        "currency_name": "New Zealand dollar",
        "currency_symbol": "$",
        "tld": ".nu",
        "native": "Niuē",
        "region": "Oceania",
        "longitude": -169.86666666,
        "latitude": -19.03333333
      },
      {
        "id": 163,
        "iso2": "NF",
        "name": "Norfolk Island",
        "emoji": "🇳🇫",
        "numeric_code": "574",
        "phone_code": "672",
        "capital": "Kingston",
        "currency": "AUD",
        "currency_name": "Australian dollar",
        "currency_symbol": "$",
        "tld": ".nf",
        "native": "Norfolk Island",
        "region": "Oceania",
        "longitude": 167.95,
        "latitude": -29.03333333
      },
      {
        "id": 164,
        "iso2": "MP",
        "name": "Northern Mariana Islands",
        "emoji": "🇲🇵",
        "numeric_code": "580",
        "phone_code": "+1-670",
        "capital": "Saipan",
        "currency": "USD",
        "currency_name": "United States dollar",
        "currency_symbol": "$",
        "tld": ".mp",
        "native": "Northern Mariana Islands",
        "region": "Oceania",
        "longitude": 145.75,
        "latitude": 15.2
      },
      {
        "id": 168,
        "iso2": "PW",
        "name": "Palau",
        "emoji": "🇵🇼",
        "numeric_code": "585",
        "phone_code": "680",
        "capital": "Melekeok",
        "currency": "USD",
        "currency_name": "United States dollar",
        "currency_symbol": "$",
        "tld": ".pw",
        "native": "Palau",
        "region": "Oceania",
        "longitude": 134.5,
        "latitude": 7.5
      },
      {
        "id": 171,
        "iso2": "PG",
        "name": "Papua new Guinea",
        "emoji": "🇵🇬",
        "numeric_code": "598",
        "phone_code": "675",
        "capital": "Port Moresby",
        "currency": "PGK",
        "currency_name": "Papua New Guinean kina",
        "currency_symbol": "K",
        "tld": ".pg",
        "native": "Papua Niugini",
        "region": "Oceania",
        "longitude": 147,
        "latitude": -6
      },
      {
        "id": 175,
        "iso2": "PN",
        "name": "Pitcairn Island",
        "emoji": "🇵🇳",
        "numeric_code": "612",
        "phone_code": "870",
        "capital": "Adamstown",
        "currency": "NZD",
        "currency_name": "New Zealand dollar",
        "currency_symbol": "$",
        "tld": ".pn",
        "native": "Pitcairn Islands",
        "region": "Oceania",
        "longitude": -130.1,
        "latitude": -25.06666666
      },
      {
        "id": 191,
        "iso2": "WS",
        "name": "Samoa",
        "emoji": "🇼🇸",
        "numeric_code": "882",
        "phone_code": "685",
        "capital": "Apia",
        "currency": "WST",
        "currency_name": "Samoan tālā",
        "currency_symbol": "SAT",
        "tld": ".ws",
        "native": "Samoa",
        "region": "Oceania",
        "longitude": -172.33333333,
        "latitude": -13.58333333
      },
      {
        "id": 202,
        "iso2": "SB",
        "name": "Solomon Islands",
        "emoji": "🇸🇧",
        "numeric_code": "090",
        "phone_code": "677",
        "capital": "Honiara",
        "currency": "SBD",
        "currency_name": "Solomon Islands dollar",
        "currency_symbol": "Si$",
        "tld": ".sb",
        "native": "Solomon Islands",
        "region": "Oceania",
        "longitude": 159,
        "latitude": -8
      },
      {
        "id": 221,
        "iso2": "TK",
        "name": "Tokelau",
        "emoji": "🇹🇰",
        "numeric_code": "772",
        "phone_code": "690",
        "capital": "",
        "currency": "NZD",
        "currency_name": "New Zealand dollar",
        "currency_symbol": "$",
        "tld": ".tk",
        "native": "Tokelau",
        "region": "Oceania",
        "longitude": -172,
        "latitude": -9
      },
      {
        "id": 222,
        "iso2": "TO",
        "name": "Tonga",
        "emoji": "🇹🇴",
        "numeric_code": "776",
        "phone_code": "676",
        "capital": "Nuku'alofa",
        "currency": "TOP",
        "currency_name": "Tongan paʻanga",
        "currency_symbol": "$",
        "tld": ".to",
        "native": "Tonga",
        "region": "Oceania",
        "longitude": -175,
        "latitude": -20
      },
      {
        "id": 228,
        "iso2": "TV",
        "name": "Tuvalu",
        "emoji": "🇹🇻",
        "numeric_code": "798",
        "phone_code": "688",
        "capital": "Funafuti",
        "currency": "AUD",
        "currency_name": "Australian dollar",
        "currency_symbol": "$",
        "tld": ".tv",
        "native": "Tuvalu",
        "region": "Oceania",
        "longitude": 178,
        "latitude": -8
      },
      {
        "id": 237,
        "iso2": "VU",
        "name": "Vanuatu",
        "emoji": "🇻🇺",
        "numeric_code": "548",
        "phone_code": "678",
        "capital": "Port Vila",
        "currency": "VUV",
        "currency_name": "Vanuatu vatu",
        "currency_symbol": "VT",
        "tld": ".vu",
        "native": "Vanuatu",
        "region": "Oceania",
        "longitude": 167,
        "latitude": -16
      },
      {
        "id": 243,
        "iso2": "WF",
        "name": "Wallis And Futuna Islands",
        "emoji": "🇼🇫",
        "numeric_code": "876",
        "phone_code": "681",
        "capital": "Mata Utu",
        "currency": "XPF",
        "currency_name": "CFP franc",
        "currency_symbol": "₣",
        "tld": ".wf",
        "native": "Wallis et Futuna",
        "region": "Oceania",
        "longitude": -176.2,
        "latitude": -13.3
      }
    ]
  }
}
```

## 🎨 Examples

## 💬 Contributing

- [Code of Conduct](/CODE_OF_CONDUCT.md)
- [Contributing Guidelines](/CONTRIBUTING.md)
- [Commit Message Convention](/docs/COMMIT_MESSAGE_CONVENTION.md)
- [Issue Guidelines](/docs/ISSUE_TEMPLATE.md)

## 🚀 Used By

- [NHN Dooray! - Collaboration Service (Project, Messenger, Mail, Calendar, Drive, Wiki, Contacts)](https://dooray.com)
- [NCP - Commerce Platform](https://www.e-ncp.com/)

## 📜 License

This software is licensed under the [MIT](/LICENSE) © [NHN Cloud](https://github.com/nhn).
