import React from 'react'
import Dropdown from '../../../basicComp/Dropdown'
import Group from './GroupContainer'

const SubGroup = ({data,currentRepo,dispatch}) => {
    const leftFormId = data.name
    const optionsData = window.formPropertiesTotal || []
    const newOptions = optionsData.filter(el=>el.cate == 'sub_form').map(el=>({text:el.title,value:el.value}))
    newOptions.unshift({text:'请选择',value:false})
    let subOptions = [{text:'请选择',value:false}]

    let selectedOption = {text:'请选择',value:false}

    const subRight = currentRepo.subRights && currentRepo.subRights[data.name] || false
    if(subRight){
        const rightFormId = subRight.rightFormId
        const foundSelectedOption = newOptions.filter(el=>el.value == rightFormId )
        if( foundSelectedOption.length != 0 ){
            selectedOption = foundSelectedOption[0]
            subOptions = foundSelectedOption
            subOptions.unshift({text:'请选择',value:false})
            // debugger
        }
    }

    const select = (item) => {
        dispatch({type:'subflow/subRights/rightFormId',leftFormId,rightFormId:item.value})
        activeSave()
    }


    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',width:'400px',height:'16px'}}>
                <div style={{color: '#999999', fontSize: '13px'}}>{data.title}</div>
                <div style={{width:'210px',position:'relative',top:'16px'}}>
                    <Dropdown data={newOptions} width={'185px'} choosedOption={selectedOption} choosed={select} />
                </div>
            </div>
            <div>
                {data.children.map((el2,ind2)=>(
                    <Group leftData={el2} key={ind2} leftFormId={leftFormId} subOptions={subOptions} />
                    ) 
                )}
            </div>
            <div style={{margin:'20px 0',height:'1px',borderTop:'0.5px solid #dcdcdc',width:'100%'}}></div>
        </div>
    )
}
export default global.connect2redux('subflow', SubGroup)