export default function(repoObj) {
    let returnFlag = true

    /* 针对子表单的检测 */
    const isExistSubform = repoObj.leftFields.some(el => el.type == 'sub_form')

    if (isExistSubform) {

        if (!repoObj.subRights) {
            window.showAlert('子表单尚未选择')
            returnFlag = false
            return returnFlag
        }

        const formMatchCheckNotPass = repoObj.leftFields.some((el, ind) => {
            if (el.type != 'sub_form') return false

            if (!repoObj.subRights[el.name]) { //如果选项尚未选择过
                window.showAlert('子表单"' + el.title + '"尚未匹配')
                returnFlag = false
                return true

            } else {
                
                //如果选项 已经选择过
                if (!repoObj.subRights[el.name].rightFormId) {  //但是为'请选择'(false)
                    window.showAlert('子表单"' + el.title + '"尚未匹配')
                    returnFlag = false
                    return true
                }
            }
        })
    }

    
    return returnFlag
}