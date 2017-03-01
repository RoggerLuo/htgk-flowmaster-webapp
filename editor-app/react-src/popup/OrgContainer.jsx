import React,{createClass} from 'react';
import { connect } from 'react-redux'
import Dropdown from '../basicComp/Dropdown'

const Component = ({data1,data2,dispatch}) => {    
    // const data = [
    //     {text:'一',value:'1'},
    //     {text:'二',value:'2'},
    //     {text:'三',value:'3'}
    // ]

    // const data2 = [
    //     {text:'财务专员',value:'finance'},
    //     {text:'人事专员',value:'hr'},
    //     {text:'xx专员',value:'xx'}
    // ]

    const choosed = (item)=>{
        dispatch({type:'dropdown1Choose',item})
    }
    const choosed2 = (item)=>{
        dispatch({type:'dropdown2Choose',item})
    }

    return (
        <div>
            最近<Dropdown data={data1} choosed={choosed}/>级分管<Dropdown data={data2} choosed={choosed2}/>
        </div>
    )
}

  
const mapStateToProps = (state) => {
    return {data1:state.dropdown.dropdown1Data,data2:state.dropdown.dropdown2Data}
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ComponentContainer
