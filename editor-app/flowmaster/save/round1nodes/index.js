import factory from './factory'

export default () => {
    /* 返回true通过 */
    return !fm.getJson().childShapes.some(_shape => {
        /* 循环内部返回false通过 */
        const shape = fm.getShapeById(_shape.resourceId)
        const title = fm.getTitle(shape)
        if(!factory[title]){
            return false
        }
        const value = factory[title](shape)
        console.log(`[round1] ${fm.getTitle(shape)} `,value)
        return !value
    })
}
