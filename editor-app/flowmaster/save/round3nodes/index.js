import rulesFactory from './rulesFactory'
//  所有的通过都返回true 
export default () => {
    return !fm.getJson().childShapes.some(_shape => {
        const shape = fm.getShapeById(_shape.resourceId)
        /* 所以，循环里面，返回false 才通过 */
        const title = fm.getTitle(shape)
        return rulesFactory[title] && rulesFactory[title](shape)
    })
}
