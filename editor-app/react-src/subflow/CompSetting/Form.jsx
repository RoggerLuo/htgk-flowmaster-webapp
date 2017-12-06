import React from 'react'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import connectPut from 'react-put'
import Dropdown from '../../basicComp/Dropdown'
import './style.less'
const choosedOption = {text:'123',value:'456'}
const choosed = (item)=>{
    // dispatch({type:'dropdown1Choose',item})
}
const Header = () => {
    return (
        <div style={{display:'flex',justifyContent: 'space-between',fontSize:'13px',padding:'0px 19px',lineHeight: '30px',height:'30px',width:'518px',backgroundColor:'#f5f6f6'}}>
            <div  style={{width:'102px'}}>子流程字段</div>
            <div  style={{width:'160px',display: 'flex'}}>父流程字段</div>
        </div>
        )
}
const PartLeft = () => {
    return (
        <div  style={{width:'102px'}}>
            <div className="drop-down"  style={{width:'102px',height:'34px',marginTop:'10px'}}>
               <div className="title-tr" style={{fontSize:'13px',paddingLeft:'10px',width:'100px',lineHeight:'32px',height:'32px'}}>
                  abc div
               </div>
               <div> * </div>
            </div>
        </div>
        )
}
const TwoPartsRight = ({data1,data2}) => {
    return ( <div  style={{width:'342px',display: 'flex'}}>
        <div  style={{width:'160px',marginRight: '10px'}}>
            <Dropdown data={data1} width={'160px'} choosedOption={choosedOption} choosed={choosed}/>
        </div>
        <div style={{width:'160px'}}>
            <Dropdown data={data2} width={'160px'} choosedOption={choosedOption} choosed={choosed}/>
        </div>
    </div>
    )
}
const Group = ({}) => {
    const getData = () => {
        return [{text:'123',value:'456'},{text:'1235',value:'4565'}]
    }
    return (    
        <div style={{display:'flex',justifyContent: 'space-between'}}>
            <PartLeft />
            <TwoPartsRight data1={getData()} data2={getData()}/>
        </div>
        )
}

const AddComp = ({ put, add }) => {
    return(
        <SolidFrame innerStyle={{padding:'0px'}} outerStyle={{width:'520px'}}>
            <Header />
            <div style={{padding:'10px 20px'}}>
                <Group />
                <div style={{margin:'30px 0',height:'1px',borderTop:'0.5px solid #dcdcdc',width:'100%'}}></div>
                <Group />
            </div>
        </SolidFrame>
    )
}
const options = {mapPropToDictionary: (props)=>window.reactI18n}
export default connectPut(options)(AddComp)
