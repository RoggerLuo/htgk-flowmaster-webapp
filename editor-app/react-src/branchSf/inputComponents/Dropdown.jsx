import React,{createClass} from 'react'
import Dropdown from './dpdwPre.jsx'

function Comp({ inputData, oninput, inputCtrlInfoData }){
    if(inputData.text ==''){
        if(inputData.value ==''){
            inputData = {text:'请选择',value:'initial'}
        }
    }
    const options = inputCtrlInfoData.options.map(el=>{
        // 1.我自己写的 text value的option，2.还有表单传来的name value组件
        if(!el.name) { 
            el.name = el.value
            el.value = el.text
        }else{
            el.text = el.value || el.name             
        }
        return el
    })
    const choose = (item) =>{
        oninput({
            text: item.text,
            value: '"'+(item.name||item.value)+'"'
        })
    } 
    return (
        <div className="input-text-container" style={{height:'30px',display:'flex'}}>
            <Dropdown options={options} choose={choose} choosedOption={inputData}/>
        </div>
    )
}
export default Comp

