
export default function(repoObj) {
    let returnFlag = true 
    
    repoObj.leftFields.some((el, ind) => {
        if (el.type != "sub_form") { //对于不是子表单的字段

            if (el.require) { //如果是require
                
                if(!repoObj.mainRight){
                    window.showAlert('必填项"' + el.title + '"尚未选择匹配字段')
                    returnFlag = false
                    return true 
                }
                if (!repoObj.mainRight[el.name]) {
                    window.showAlert('必填项"' + el.title + '"尚未选择匹配字段')
                    returnFlag = false
                    return true
                }
                if (!repoObj.mainRight[el.name].name) {
                    window.showAlert('必填项"' + el.title + '"尚未选择匹配字段')
                    returnFlag = false
                    return true
                }
            }

        }
    })


    return returnFlag

}