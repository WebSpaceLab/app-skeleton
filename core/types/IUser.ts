import { IArticle } from "./IArticle"

export interface IUser {
    '@id': number
    email: string
    username: string
    avatar_url: string
    role: []
    description?: string | null

    articles?: IArticle[] | undefined
    
    created_at: string
    updated_at: string 
}
