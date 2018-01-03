import React,{createClass} from 'react'
import { connect } from 'react-redux'
import configButtons from './ButtonsToConf'
import StateComp from './StateComp'

function ReduxComp({ xClass, confirm, children, put, existCate, groupInd }){
    const config = () => configButtons({confirm, existCate, groupInd}) 
    const param = { xClass, put, config} //data,
    return (<StateComp param={param}>{children}</StateComp>)
}
// const mapStateToProps = (state) => state
// const mapDispatchToProps = (dispatch) => {
//     return {dispatch}
// }
export default rdx.i18nPut(ReduxComp)
// import connectPut from 'react-put'
// const options = {mapPropToDictionary: (props)=>window.reactI18n}
// const ReduxCompPut = connectPut(options)(ReduxComp)
// export default connect(mapStateToProps,mapDispatchToProps)(rdx.i18nPut(ReduxComp))




