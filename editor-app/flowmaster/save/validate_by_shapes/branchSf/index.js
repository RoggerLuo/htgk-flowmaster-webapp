import { validationCheck, inputFormatter, collectValuesFromDpdw, ifEmptyWithoutInit } from './basic.js'
import validate from './validate'

export default function(canvas) {
    return !rdx.getState().branch.repo.some((repo, index) => {
        const shape = fm.getNodeById(repo.id)
        if (!shape) return

        if(!validate(repo,shape)){
            return true
        }

        repo.conditions.forEach((condi) => {
            /* 取消删除状态，以免下次加载的时候，一打开就是删除状态 */
            condi.ruleMode = 'normal'
        })

        shape.setProperty('conditionsequenceflow', assembleStr(repo))
        shape.setProperty('reduxData_branch', repo)
    })
}
function assembleStr(repo){
    let str = '' 
    if (repo.radio) {            
        str = '${' + repo.text + '}'
        window.setPropertyAdvance({ key: 'oryx-name', value: repo.text }, shape)
    } else {
        // if (empty(el, shape)) canBeSaved = false
        str = '${' + traverseGroup(repo) + '}'
    }
    return str
}
function traverseGroup(el){
    let str = ''
    el.conditions.forEach((condition, i) => { //每个group
        str = traverseRule(condition,str)
        /* 是否是最后的group */
        if (i < (el.conditions.length - 1)) str += ' || '                    
    })
    return str
}

function traverseRule(condition,returnString){
    condition.data.forEach((el, index, wholeArr) => { //每个rule
        /* 下拉框的值 */
        returnString = collectValuesFromDpdw({ returnString, el })
        
        /* input框的值 */
        el = validationCheck(el) /* 根据entry2的type来确定 input的值是否合规 */
        returnString += inputFormatter(el)
        
        /* 是否是最后的rule */
        if (index < (condition.data.length - 1)) returnString += ' && '
    })
    return returnString
}