const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    savedLocations: [Location]
  }

  type Location {
    cityId: ID
    name: String
    latitude: Number
    longitude: Number

  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User  
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveLocation(): User
    removeLocation(): User
  }

`;

module.exports = typeDefs;