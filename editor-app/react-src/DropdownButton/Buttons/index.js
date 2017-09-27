import HigherLevelAction from './HigherLevel'
// import OrgAction from './Org'
import pickUpPeople from './pickUpPeople'

import customChar from './customChar'
import FormChar from './FormChar'
import SpecificChar from './SpecificChar'
import SQL from './SQL'
import second from './second'


export default function(confirm, dispatch) {

    const buttonActions = [
        HigherLevelAction(confirm),
        // OrgAction(confirm),
        pickUpPeople(confirm),
        customChar(confirm),
        FormChar(confirm),
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