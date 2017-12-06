import React from 'react'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import List from './List'
import Group from './Group'
import connectPut from 'react-put'
import Dropdown from '../../basicComp/Dropdown'
import './style.less'
import FirstHalf from './FirstHalf'

export default function(data){
    const AddComp = ({ put, add }) => {//data,
        const getData = () => {
            return [{text:'123',value:'456'},{text:'1235',value:'4565'}]
        }
        const choosedOption = {text:'123',value:'456'}
        const choosed = (item)=>{
            // dispatch({type:'dropdown1Choose',item})
        }

        return(
            <div className="setting-subflow" style={{width:'100%'}}>

                <FirstHalf data={data}/>

                <div style={{margin:'30px 0',height:'1px',borderTop:'0.5px solid #dcdcdc',width:'100%'}}></div>
                <div className="property-row-title"> 
                    子流程内容设置
                </div>

                <div className="property-row-title"> 
                    主表
                </div>
                <SolidFrame innerStyle={{padding:'0px'}} outerStyle={{width:'520px'}}>
                    
                    <div style={{fontSize:'13px',padding:'0px 19px',lineHeight: '30px',height:'30px',width:'518px',backgroundColor:'#f5f6f6'}}>xxx</div>
                    
                    <div style={{padding:'10px 20px'}}>
                    
                        <div style={{display:'flex',justifyContent: 'space-between'}}>
                            <div  style={{width:'102px'}}>
                                <div className="drop-down"  style={{width:'102px',height:'34px',marginTop:'10px'}}>
                                   <div className="title-tr" style={{fontSize:'13px',paddingLeft:'10px',width:'100px',lineHeight:'32px',height:'32px'}}>
                                      abc 
                                   </div>

                                </div>
                            </div>
                            
                            <div  style={{width:'342px',display: 'flex'}}>
                                <div  style={{width:'160px',marginRight: '10px'}}>
                                    <Dropdown data={getData()} width={'160px'} choosedOption={choosedOption} choosed={choosed}/>
                                </div>

                                <div style={{width:'160px'}}>
                                    <Dropdown data={getData()} width={'160px'} choosedOption={choosedOption} choosed={choosed}/>
                                </div>
                            </div>


                        </div>
                        <div style={{margin:'30px 0',height:'1px',borderTop:'0.5px solid #dcdcdc',width:'100%'}}></div>

                    </div>
                </SolidFrame>
                
                <div className="property-row-title"> 
                    子表单
                </div>

            </div>
        )
    }
    const options = {mapPropToDictionary: (props)=>window.reactI18n}
    const ConnectedApp = connectPut(options)(AddComp)
    return ConnectedApp
}
