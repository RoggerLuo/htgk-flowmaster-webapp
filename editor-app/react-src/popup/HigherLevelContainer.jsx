import React,{createClass} from 'react';
import { connect } from 'react-redux'
import Dropdown from '../basicComp/Dropdown'

const Component = ({dispatch}) => {    
    const data = [
        {text:'一',value:'1'},
        {text:'二',value:'2'},
        {text:'三',value:'3'}
    ]
    const choosed = (item)=>{
        dispatch({type:'dropdown1Choose',item})
    }
    return (
        <div>
            发起人的上<Dropdown data={data} choosed={choosed}/>级领导
        </div>
    )
}

  
const mapStateToProps = (state) => {
    return state.dropdown
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ComponentContainer

