export type Todo = {
    userId: number
    id: number
    title: string
    completed: boolean
}

export interface Search {

}

export interface APIResponse {
    results: Todo[]
}
