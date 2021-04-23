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
    getBattle(fighter1: String!, fighter2: String!, arena: String!): Battle! 
}`)

const fighters = [
    { name: 'Godzilla', power: 89 },
    { name: 'Mothra', power: 78 },
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
    getBattle: ({fighter1=fighters[0],fighter2=fighters[1],arena=cities[0]}) => {
        const kaijus = fighters.filter(obj => obj.name === fighter1 || obj.name === fighter2)
        const arenas = cities.filter(obj => obj.name === arena)
        
        return { 
            fighter1: { name: fighter1, power: kaijus[0].power}, 
            fighter2: { name: fighter2, power: kaijus[1].power }, 
            arena: { name: arena, population: arenas[0].population }
        }
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
