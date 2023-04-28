import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    @prop({ type: String })
    word: string
    @prop({ type: Number })
    readywitted: number
}

export default getModelForClass(User)