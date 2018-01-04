import React from 'react'
import { connect } from 'react-redux'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import connectPut from 'react-put'
import Dropdown from '../../basicComp/Dropdown'
import './style.less'
import MainForm from './MainForm'
import SubForm from './SubForm' 
import ApproveRange from './ApproveRange'
import Radios from './Radios' 

export default function(){ //data是 currentRepo的data //data
    const SettingPopup = ({ currentRepo, put, add }) => {//data,
        if(!currentRepo) return null
        const data = currentRepo.data || []

        const leftFields = currentRepo.leftFields || []
        const filtered = leftFields.filter(el=>el.type == 'sub_form')
        let SubFormComp = null
        if(filtered.length != 0){
            SubFormComp = (<div>
                <div className="property-row-title" style={{fontSize:'14px'}}> 子表单</div>
                <SubForm />
            </div>)
        }
        return(
            <div className="setting-subflow" style={{width:'100%'}}>
                <ApproveRange data={data}/>
                <div style={{height:'10px',width:'100%'}}></div>
                <Radios />
                <div className="property-row-title" style={{fontSize:'14px'}}> 子流程内容设置 </div>
                <div className="property-row-title" style={{fontSize:'14px',paddingTop:'10px'}}> 主表 </div>
                <MainForm />
                {SubFormComp}
                <div style={{height:'100px',width:'100%'}}></div>
            </div>
        )
    }
    const options = {mapPropToDictionary: (props)=>window.reactI18n}
    const ConnectedApp = connectPut(options)(SettingPopup)
    return global.connect2redux('subflow',ConnectedApp)
}
