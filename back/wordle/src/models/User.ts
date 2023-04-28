import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    @prop()
    name: string
    @prop()
    games: number
    @prop()
    wins: number
    @prop()
    losses: number
}

export default getModelForClass(User)