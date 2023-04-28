import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    @prop({ type: String })
    name: string
    @prop({ type: Number })
    games: number
    @prop({ type: Number })
    wins: number
    @prop({ type: Number })
    losses: number
}

export default getModelForClass(User)