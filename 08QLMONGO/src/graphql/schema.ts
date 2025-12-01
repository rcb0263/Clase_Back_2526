import {gql} from "apollo-server"

export const typeDefs =gql`
    type VideoGame {
        id: ID!,
        name: String,
        date: String,
        platform: String
    }

    type User {
        id: ID!,
        email: String
    }
    type Query {
        me: User!
        videoGames: [VideoGame]!,
        videoGame(id: ID!): VideoGame
    }

    type Mutation {
        addVideoGame(name:String!, platform: String!, date: String!): VideoGame!
        register(email: String!, password: String!): String!
        login(email: String!, password: String!): String!
    }

`