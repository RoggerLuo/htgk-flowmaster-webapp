import rulesFactory from './rulesFactory'

export default () => {
    return !fm.getNodes().some(shape => {
        /* 返回true说明验证不通过 */
        const title = fm.getTitle(shape)
        if(rulesFactory[title] && rulesFactory[title](shape)){
            return true
        }
        return false
    })
}
