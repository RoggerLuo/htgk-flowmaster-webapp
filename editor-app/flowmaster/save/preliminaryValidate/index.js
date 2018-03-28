import switcher from './switcher'

export default () => {
    /* 返回true通过 */
    return !fm.getJson().childShapes.some(_shape => {
        /* 循环内部返回false通过 */
        const shape = fm.getShapeById(_shape.resourceId)
        const title = fm.getTitle(shape)
        const checker = switcher[title]
        
        if(!checker){
            return false
        }
        const value = checker(shape)
        console.log(`[round1] ${fm.getTitle(shape)} `,value)
        return !value
    })
}
