export default function(repo) {
    let returnFlag = true 
    if(repo.data.length ==0 ){
        window.showAlert('子流程<span style="color:orange">第一个节点的审批人</span>未选择')
        return false
    }
    if( !fm.subflow.checkMainform(repo) || !fm.subflow.checkSubform(repo)){
        returnFlag = false
    }

    // repo.leftFields.some((el, ind) => {
    //     if (el.type != "sub_form") { //对于不是子表单的字段
    //         if (el.required) { //如果是require
    //             if(!repo.mainRight){
    //                 window.showAlert('必填项"' + el.title + '"尚未选择匹配字段')
    //                 returnFlag = false
    //                 return true 
    //             }
    //             if (!repo.mainRight[el.name]) {
    //                 window.showAlert('必填项"' + el.title + '"尚未选择匹配字段')
    //                 returnFlag = false
    //                 return true
    //             }
    //             if (!repo.mainRight[el.name].name) {
    //                 window.showAlert('必填项"' + el.title + '"尚未选择匹配字段')
    //                 returnFlag = false
    //                 return true
    //             }
    //         }

    //     }
    // })





    return returnFlag
}