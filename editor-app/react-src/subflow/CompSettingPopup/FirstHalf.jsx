import React from 'react'
import Radios from './Radios'
import connectPut from 'react-put'
import Dropdown from '../../basicComp/Dropdown'
import ApproveRange from './ApproveRange'

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
            <div className="property-row-title" style={{fontSize:'14px'}}> 
                子流程触发机制
            </div>



            <Radios />


            <ApproveRange data={data}/>
           

            <div style={{margin:'30px 0',height:'1px',borderTop:'0.5px solid #dcdcdc',width:'100%'}}></div>                
        </div>
    )
}

const options = {mapPropToDictionary: (props)=>window.reactI18n}
export default connectPut(options)(AddComp)


/*



<div style={{margin:'30px 0',height:'1px',borderTop:'0.5px solid #dcdcdc',width:'100%'}}></div>
<div className="property-row-title"> 
    子流程发起人设置
    <Dropdown data={getData()} choosedOption={choosedOption} choosed={choosed}/>
</div>

*/


