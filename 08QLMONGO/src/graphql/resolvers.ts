import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo"
import { IResolvers} from "@graphql-tools/utils"
import { userVideoGames } from "../types.ts/Users";
import { createUser, validateUser } from "../collections/usersVideoGames";
import { signToken } from "../auth";



export const resolvers:IResolvers= {
    Query:{
        videoGames: async () => {
            const db =  getDB();
            const games = await db.collection("games").find().toArray();
            return games.map(game => ({
                id: game._id.toString(),
                name: game.name,
                platform: game.platform,
                date: game.date
            }));
        },

        videoGame: async (_, {id})=> {
            const db =  getDB();
            const game = await db.collection("games").findOne({_id: new ObjectId(id)});
            return {
                id: game!._id.toString(),
                name: game!.name,
                platform: game!.platform,
                date: game!.date
            }
        },

        me: async (_, __, context)=>{
            const user: userVideoGames = context.user;
            if(!user)return null
            return{
                id: user._id.toString(),
                email: user.email
            }
        }
    },

    Mutation: {
        addVideoGame: async (_, {name, platform, date}) => {
            const db =  getDB();
            const result = await db.collection("games").insertOne({
                name,
                platform,
                date
            })
            return {
                id: result.insertedId,
                name,
                platform,
                date
            }
        },

        register: async (_, { email, password } : {email:string, password: string}) => {
            const userId = await createUser(email, password)
            return signToken(userId)
        },

        login: async (_, { email, password } : {email:string, password: string}) =>{
            const user = await validateUser(email, password)
            if(!user) throw new Error("Invalid credentials")
            return signToken(user._id.toString())
        }
    }
}