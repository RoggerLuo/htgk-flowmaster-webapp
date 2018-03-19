import factory from './factory'

export default () => {
    return !fm.getNodes().some(shape => {
        /* 返回true说明验证不通过 */
        const title = fm.getTitle(shape)
        if(factory[title] && factory[title](shape)){
            return true
        }
        return false
    })
}
