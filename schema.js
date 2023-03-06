import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { gql } from "apollo-server";
import _ from 'lodash';

import cities from "./data/cities.json" assert { type: "json" };
import states from "./data/states.json" assert { type: "json" };
import data from "./data/countriesstatescities.json" assert { type: "json" };
import statescities from "./data/statescities.json" assert { type: "json" };


const schema = fs.readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "./schema.graphqls"),
  "utf8"
);

export const typeDefs = gql(schema);

export const resolvers = {
  Query: {
    Countries: () => {
      return data
    },
    Country: (parent, args) => {
      const iso2 = args.iso2;
      const Country = _.find(data, { iso2: String(iso2) });
      return Country;
    },
    CountriesByRegion: (parent, args) => {
      const region = args.region;
      const CountriesByRegion = _.filter(data, { region: String(region) });
      return CountriesByRegion;
    },
    CountriesBySubregion: (parent, args) => {
      const subregion = args.subregion;
      const CountriesBySubregion = _.filter(data, { subregion: String(subregion) });
      return CountriesBySubregion;
    },
    States: () => {
      return states
    },
    StatesByCountry: (parent, args) => {
      const country_name = args.country_name;
      const StatesByCountry = _.filter(states,{ country_name: String(country_name) });
      return StatesByCountry;
    },
    State: (parent, args) => {
      const name = args.name;
      const State = _.find(statescities,{ name: String(name) });
      return State;
    },
    Cities: () => {
      return cities
    },
    CitiesByState: (parent, args) => {
      const state_name = args.state_name;
      const CitiesByState = _.filter(cities,{ state_name: String(state_name) });
      return CitiesByState;
    },
    CitiesByCountry: (parent, args) => {
      const country_name = args.country_name;
      const CitiesByCountry = _.filter(cities,{ country_name: String(country_name) });
      return CitiesByCountry;
    },
    City: (parent, args) => {
      const name = args.name;
      const City = _.find(cities,{ name: String(name) });
      return City;
    },
  }
};
