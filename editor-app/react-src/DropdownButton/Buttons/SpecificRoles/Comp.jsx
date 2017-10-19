import React from 'react'
import { connect } from 'react-redux'
import Dropdown from '../../../basicComp/Dropdown'
import optionData from './optionData'

const Component = ({data,dispatch,put,choosedOption2}) => {    
    let choosed2 = (item)=>dispatch({type:'dropdown2Choose',item})
    //获取选项数据
    const approveArr = optionData()    
    //设定默认值
    if( !choosedOption2.value || (choosedOption2.value == 'initial')) choosedOption2 = approveArr[0]
    return (
        <div style={{textAlign:'center'}}>
            <div style={{height:"25px",width:'1px'}}></div>

            选择特定节点审批人<Dropdown data={approveArr} choosedOption={choosedOption2} choosed={choosed2}/>
            <div style={{color: '#999999',fontSize:'13px',width:'390px',paddingTop:'26px'}}>            
                {'注：此处获取的是特定节点的实际审批人，如果获取的节点未流转，将因为无法获取审批人导致审批异常，请谨慎操作'}
            </div>
        </div>
    )
}
 
const mapStateToProps = (state) => {
    return {choosedOption2:state.dropdown.dropdown2}
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

