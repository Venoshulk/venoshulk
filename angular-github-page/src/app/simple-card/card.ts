export class Card {
    public title: string
    public description: string
    public imgSrc: string
    public hyperlink: string | null
    public isMarked: boolean
    public routerlink: string | null

    constructor(title: string, description: string, imgSrc: string, hyperlink: string | null = null, isMarked: boolean = false, routerlink: string | null = null) {
        this.title = title
        this.description = description
        this.imgSrc = imgSrc
        this.hyperlink = hyperlink
        this.isMarked = isMarked
        this.routerlink = routerlink
    }
}