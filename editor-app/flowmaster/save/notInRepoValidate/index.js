import factory from './factory'
// 通过返回true 
export default () => {
    return !fm.getJson().childShapes.some(_shape => {
        const shape = fm.getShapeById(_shape.resourceId)
        
        /* 循环里面，通过返回false */
        const title = fm.getTitle(shape)
        const checker = factory[title]
        if(!checker){
            return false
        }else{
            const value = checker(shape)
            console.log(`[notInRepo] ${fm.getTitle(shape)} `,value)
            return !value
        }
    })
}
