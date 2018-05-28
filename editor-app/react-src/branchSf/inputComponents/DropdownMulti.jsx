import React,{createClass} from 'react'
import Dropdown from './dpdwMultiPre.jsx'

function Comp({ inputData, oninput, inputCtrlInfoData }){
    if(inputData.text ==''){
        inputData = {text:'请选择',value:'initial',data:[]}
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
        if(inputData.data.some(el=>el.name == item.name)){
            inputData.data = inputData.data.filter(el=>el.name!=item.name)
        }else{
            inputData.data.push(item)            
        }
        const valueArr = inputData.data.sort((a,b)=>a.index - b.index) //.map(el=>'"'+el.value+'"')
        let value = ''
        for (var i = 0; i < valueArr.length; i++) {
            value += valueArr[i].name
            if(i+1 != valueArr.length){
                value += ','
            }
        }
        value = '"'+value+'"'
        oninput({
            data:inputData.data,
            text: inputData.data.map(el=>el.text).join('，'),
            value//: .join(',')//'"'+item.value+'"'  JSON.stringify()
        })
    } 
    return (
        <div className="input-text-container" style={{height:'30px',display:'flex'}}>
            <Dropdown options={options} choose={choose} choosedOption={inputData}/>
        </div>
    )
}
export default Comp

