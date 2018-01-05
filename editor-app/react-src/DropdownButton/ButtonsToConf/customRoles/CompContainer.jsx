import React,{createClass} from 'react'
import { connect } from 'react-redux'
import Comp from './Comp'


const Component = ({dispatch,put,customRoles}) => {    
    const onclick = (id,name) => {
        customRoles.push({value:id,text:name}) 
        dispatch({type:'popup/update',data:customRoles})
    }
    const current = window.customRoles && window.customRoles.filter(el => el.orgType == 'CURRENT' ) ||false
    const inherit = window.customRoles && window.customRoles.filter(el => el.orgType == 'INHERIT' ) ||[]
    return (<Comp current={current} inherit={inherit} onclick={onclick}/>)
}

  
const mapStateToProps = (state) => {
    return {customRoles:state.popup.customRoles}
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(rdx.i18nPut(Component))

export default ComponentContainer


/*import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(Component)
*/