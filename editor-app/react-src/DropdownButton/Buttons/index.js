import HigherLevelAction from './HigherLevel'
// import OrgAction from './Org'
import pickUpPeople from './pickUpPeople'
import customRoles from './customRoles'
import FormRoles from './FormRoles'
import SpecificChar from './SpecificRoles'
import SQL from './SQL'
import second from './second'
import './style'
export default function(confirm, dispatch) {
    const buttonActions = [
        HigherLevelAction(confirm),
        // OrgAction(confirm),
        pickUpPeople(confirm),
        customRoles(confirm),
        FormRoles(confirm),
        SpecificChar(confirm),
        SQL(confirm),
        second(confirm)
    ]
    return buttonActions.map((action, index) => {
        if (action.type != 'callPopup') {
            return {
                title: 'button.option3',
                click() { action() }
            }
        }
        return {
            title: action.title || '',
            click() {
                dispatch(action)
                window.callShadow()
            }
        }
    })
}