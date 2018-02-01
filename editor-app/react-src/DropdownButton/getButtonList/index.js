import './style'
import getSpecificData from './SpecificRoles/optionData'
import buttonFactory from './buttonFactory'

export default function({confirm, existCate, buttonMode, groupInd}) { //hidePrevious 
    const buttons = buttonFactory(existCate,buttonMode)
    const actions = buttons.map(el=>el(confirm)) //统一装配
    return actions.map((action, index) => {
        
        if (action.type != 'callPopup') { //特殊情况 ‘选择特定人员’ 选择窗口
            return {
                title: 'button.option3',
                click() { action() }
            }
        }
        
        return {
            title: action.title || '',
            click() {
                
                if(action.title == 'button.option6'){ // 更新特定节点审批人的数据，每次click button
                    rdx.put('temp','replace',['specificRolesData'],getSpecificData())                    
                }
                if(action.title == 'button.option7'){ //db的话
                    action.confirm = action.confirm(groupInd)
                }

                rdx.dispatch(action)
                window.callShadow()
            }
        }
    })
}


// if (action.id == 'second'){
//     return {
//         title: 'button.option8',
//         click() { action.add() }
//     }
// }




// const onConfirm = confirm
// const cate = existCate
// const options = {groupInd, buttonMode}


