import HigherLevelAction from '../popup/HigherLevel'
import OrgAction from '../popup/Org'
import pickUpPeople from '../popup/pickUpPeople'

export default function(confirm, dispatch) {
    const buttonActions = [
        HigherLevelAction(confirm),
        OrgAction(confirm),
        pickUpPeople(confirm)
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