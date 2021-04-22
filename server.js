const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Create a schema
const schema = buildSchema(`

type Kaiju {
    name: String!
    power: Int!
}

type City {
    name: String!
    population: Int!
}

type Battle {
    fighter1: Kaiju!
    fighter2: Kaiju!
	arena: City!
}

type Query {
    getKaiju(id: Int!): Kaiju!
    allKaiju: [Kaiju!]!
    getCity(id: Int!): City!
    allCities: [City!]!
    getBattle: Battle! 
}`)

const fighters = [
    { name: 'Godzilla', power: 72 },
    { name: 'Mothra', power: 89 },
    { name: 'Kong', power: 68 },
    { name: 'Predator', power: 98 }
]

const cities = [
    { name: 'Tokyo', population: 37260000 },
    { name: 'Shanghai', population: 234800000 },
    { name: 'Såo Paulo', population: 208800000 },
    { name: 'New York City', population: 18650000 } 
]

// Define a resolver
const root = {
    getKaiju: ({id}) => {
        return fighters[id]
    },
    allKaiju: () => {
        return fighters 
    },
    getCity:  ({id}) => {
        return cities[id]
    },
    allCities: () => {
        return cities
    },
    fighter1: () => {
        return fighters[0]
    },
    fighter2: () => {
        return fighters[1]
    },
    arena: () => {
        return cities[0]
    },
    getBattle: () => {
        return {fighter1,fighter2,arena}
  }
}
// Create an express app
const app = express()

// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }))
  
  // Start this app
const port = 4000
app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})
