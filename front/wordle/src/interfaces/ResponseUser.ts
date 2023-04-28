import { User } from "./User"

export interface ResponseUser {
    status: number
    message: string
    token: string
    user: User
}