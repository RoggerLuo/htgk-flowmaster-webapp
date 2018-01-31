import HigherLevelAction from './HigherLevel'
// import OrgAction from './Org'
import pickUpPeople from './pickUpPeople'
import customRoles from './customRoles'
import FormRoles from './FormRoles'
import SpecificNodeRoles from './SpecificRoles'
import SQL from './SQL'
import externalCallback from './externalCallback'
import second from './second'
import './style'
import getSpecificData from './SpecificRoles/optionData'

export default function({confirm, existCate, groupInd, buttonMode, hidePrevious}) {
    let buttonActions = [
        HigherLevelAction(confirm),
        // OrgAction(confirm),
        pickUpPeople(confirm),
        customRoles(confirm),//添加角色
        FormRoles(confirm),
        SpecificNodeRoles(confirm),
        SQL(confirm,groupInd),
        // second(confirm),
        externalCallback(confirm)
    ]
    
    if(buttonMode == 'subflow'){
        buttonActions = [
            HigherLevelAction(confirm),
            pickUpPeople(confirm),
            customRoles(confirm)
        ]
    }
    if(existCate){
        switch(existCate){
            case 'boss':
                buttonActions = [HigherLevelAction(confirm)]
                break
            case 'form':
                buttonActions = [FormRoles(confirm)]
                break
            case 'historicTask':
                buttonActions = [SpecificNodeRoles(confirm)]
                break
            case 'fromDb':
                buttonActions = [SQL(confirm)]
                break
            // case 'EXTERNAL':
            //     buttonActions = [second(confirm)]
            //     break
            case 'externalCallback':
                buttonActions = [externalCallback(confirm)]
            default:
                buttonActions = [pickUpPeople(confirm),customRoles(confirm)]
                break
        }        
    }

    

    return buttonActions.map((action, index) => {
        if (action.id == 'second'){
            return {
                title: 'button.option8',
                click() { action.add() }
            }
        }
        if (action.type != 'callPopup') {
            return {
                title: 'button.option3',
                click() { action() }
            }
        }

        return {
            title: action.title || '',
            click() {
                // rdx.dispatch({type:'dropdown/touch'})
                // debugger
                rdx.put('temp','replace',['specificRolesData'],getSpecificData())
                
                // debugger
                // rdx.dispatch({type:'dropdown/touch'})
                rdx.dispatch(action)
                window.callShadow()
            }
        }
    })
}


