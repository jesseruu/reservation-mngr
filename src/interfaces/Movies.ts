export interface Movies {
    title: string,
    releaseDate: number,
    genres: string[],
    duration: number,
    imageUrl: string,
    classification?: string,
    description: string
}