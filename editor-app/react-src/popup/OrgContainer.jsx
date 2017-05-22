import React,{createClass} from 'react';
import { connect } from 'react-redux'
import Dropdown from '../basicComp/Dropdown'

const Component = ({data1,data2,dispatch,put}) => {    
    
    const choosed = (item)=>{
        dispatch({type:'dropdown1Choose',item})
    }
    const choosed2 = (item)=>{
        dispatch({type:'dropdown2Choose',item})
    }
    
    return (
        <div>
            {put('popup.org1')}<Dropdown data={data1} choosed={choosed}/>{put('popup.org2')}<Dropdown data={data2} choosed={choosed2}/>
        </div>
    )
}

  
const mapStateToProps = (state) => {
    return {data1:state.dropdown.dropdown1Data,data2:state.dropdown.dropdown2Data}
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
