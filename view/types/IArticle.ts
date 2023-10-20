export interface IArticleUser {
    iri: string
    title: string
}

export interface IArticleCommentsUser {
    name: string
    content: string
    article: IArticleUser[]
}