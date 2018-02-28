import listCtrl from './listCtrl'
import menuList from './menuList'
export default function({ onConfirm, cate, buttonMode, groupInd }) { 
    const menuActions = listCtrl(menuList,cate,buttonMode)
    return menuActions
        .map(actionWrap => actionWrap(onConfirm)) //统一装配callback
        .map((action, index) => {
        
        if (action.type != 'callPopup') { //特殊情况 ‘选择特定人员’ 选择窗口
            return {
                title: 'button.option3',
                click() { action() }
            }
        }
        
        return {
            title: action.title || '',
            click() {
                if(action.title == 'button.option6'){ // 特定节点审批人的话，每次click button 更新数据，
                    const data = fm.common.dropdownMenu.getSpecificRolesOptions()
                    rdx.put('temp','replace',['specificRolesData'], data)
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
