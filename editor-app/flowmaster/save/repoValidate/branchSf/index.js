import validate from './validate'
/* 不通过返回true */
export default function(repo, shape) {
    if (!shape) return true

    if (validate(repo, shape)) {
        repo.conditions.forEach((condi) => {
            /* 取消删除状态，以免下次加载的时候，一打开就是删除状态 */
            condi.ruleMode = 'normal'
        })
        return true
    }else{
        return false
    }
}