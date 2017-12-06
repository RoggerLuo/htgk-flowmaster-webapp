import React from 'react'
// import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import RolesFrame from '../RolesFrameConf'
import Button from './ButtonConf'
import Radios from './Radios'
import connectPut from 'react-put'
import Dropdown from '../../basicComp/Dropdown'

const AddComp = ({ data ,put }) => {//data,

    const choosed = (item)=>{
        // dispatch({type:'dropdown1Choose',item})
    }
    const getData = () => {
        return [{text:'123',value:'456'},{text:'1235',value:'4565'}]
    }
    const choosedOption = {text:'123',value:'456'}

    return(
        <div>
            <div className="property-row-title"> 
                子流程触发机制
            </div>
            <Radios />


            <div className="property-row-title"> 
                设置子流程发起后第一个节点的审批人范围
            </div>
            <div style={{display:'flex'}}>
                <div style={{width:'230px',height:'34px'}}>
                    <RolesFrame data = {data}/>
                </div>
                <Button >
                    <i style={{paddingLeft: '1px'}} className="icon iconfont icon-tianjia"></i>
                </Button>
            </div>
            <div style={{margin:'30px 0',height:'1px',borderTop:'0.5px solid #dcdcdc',width:'100%'}}></div>
            

            <div className="property-row-title"> 
                子流程发起人设置
                <Dropdown data={getData()} choosedOption={choosedOption} choosed={choosed}/>
            </div>

            <div style={{margin:'30px 0',height:'1px',borderTop:'0.5px solid #dcdcdc',width:'100%'}}></div>                
        </div>
    )
}
const options = {mapPropToDictionary: (props)=>window.reactI18n}
export default connectPut(options)(AddComp)
