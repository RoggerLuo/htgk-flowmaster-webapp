import React,{createClass} from 'react';
import { connect } from 'react-redux'
import Dropdown from '../basicComp/Dropdown'

const Component = ({data,dispatch,put}) => {    
    // const data = [
    //     {text:'一',value:'1'},
    //     {text:'二',value:'2'},
    //     {text:'三',value:'3'}
    // ]
    const choosed = (item)=>{
        dispatch({type:'dropdown1Choose',item})
    }
    return (
        <div>
            {put('popup.higherLevel1')}<Dropdown data={data} choosed={choosed}/>{put('popup.higherLevel2')}
        </div>
    )
}

  
const mapStateToProps = (state) => {
    return {data:state.dropdown.dropdown1Data}
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}


import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(Component)


const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp)

export default ComponentContainer

