import validate from './validate'
import Trim from './trim.js'

export default function() {
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

        shape.setProperty('conditionsequenceflow', assembleStr(shape,repo))
        shape.setProperty('reduxData_branch', repo)
    })
}

function assembleStr(shape,repo){
    let str = '' 
    if (repo.radio) {            
        str = '${' + repo.text + '}'
        fm.setProperty_and_updateView({ key: 'oryx-name', value: repo.text }, shape)
    } else {
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
        returnString += Trim(el.input.value)
        
        /* 是否是最后的rule */
        if (index < (condition.data.length - 1)) returnString += ' && '
    })
    return returnString
}

function collectValuesFromDpdw({ returnString, el }){
    const dropdown1Ind = el.entry1.index
    switch (dropdown1Ind) {
        case 1:
            returnString += ' f.'
            break
        case 2:
            returnString += ' u.'
            break
        case 3:
            returnString += ' e.'
            break
    }
    returnString += el.entry2.value
    returnString += ' '
    returnString += el.entry3.value
    returnString += ' '
    return returnString
}

