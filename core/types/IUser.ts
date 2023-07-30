import { IArticleUser, IArticleCommentsUser } from "./IArticle"

export interface IUser {
    // '@id': number
    email: string
    username: string
    avatarUrl?: string
    bio?: string
    role: []
    description?: string | null

    articles: IArticleUser[] | undefined
    comments: IArticleCommentsUser[] | undefined

    createdAtAgo: string
    updatedAtAgo?: string 
}
