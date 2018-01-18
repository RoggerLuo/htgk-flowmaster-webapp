import React,{createClass} from 'react';
import { connect } from 'react-redux'
import Dropdown from '../../../basicComp/Dropdown'
import ViewCompFactory from './ViewCompFactory'
import connectPut from 'react-put'

export default function (savedSqlState){
    const ViewComp = ViewCompFactory(savedSqlState)
    const Component = ({leave,dataSource,sql,checked,dispatch,put}) => {    
        const param = {
            chooseSource(item){
                dispatch({type:'sql/chooseSource',item})
                activeSave()
            },
            addEntry(){
                dispatch({type:'sql/addEntry',})
                activeSave()
            },
            textareaOnInput(e){
                dispatch({type:'sql/textareaOnInput', sql:e.target.value})
                activeSave()
            },
            checkChange(){
                dispatch({type:'sql/toggleCheck'})
                activeSave()
            },
            sql,checked,dataSource,leave
        }
        return (<ViewComp {...param}/>)
    }

    const mapStateToProps = (state) => {
        return {sql:state.sql.sql,checked:state.sql.checked,dataSource:state.sql.dataSource,leave:state.sql.leave}
    }
    const mapDispatchToProps = (dispatch) => {
        return {dispatch}
    }

    const options = {mapPropToDictionary: (props)=>window.reactI18n}
    const ConnectedApp = connectPut(options)(Component)
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(ConnectedApp)
}
