import React,{createClass} from 'react';
import { connect } from 'react-redux'
import Dropdown from '../../../basicComp/Dropdown'
import ViewCompFactory from './ViewCompFactory'
import connectPut from 'react-put'

export default function (dataSourceRefSTD){
    const ViewComp = ViewCompFactory(dataSourceRefSTD)
    const Component = ({dataSource,sql,checked,dispatch,put}) => {    
        const param = {
            chooseSource(item){
                dispatch({type:'sql/chooseSource',item})
            },
            addEntry(){
                dispatch({type:'sql/addEntry',})
            },
            textareaOnInput(e){
                dispatch({type:'sql/textareaOnInput', sql:e.target.value})
            },
            checkChange(){
                dispatch({type:'sql/toggleCheck'})
            },
            sql,checked,dataSource
        }
        return (<ViewComp {...param}/>)
    }

    const mapStateToProps = (state) => {
        return {sql:state.sql.sql,checked:state.sql.checked,dataSource:state.sql.dataSource}
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
