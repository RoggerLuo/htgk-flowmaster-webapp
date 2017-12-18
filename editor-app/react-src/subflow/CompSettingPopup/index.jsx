import React from 'react'
import { connect } from 'react-redux'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import connectPut from 'react-put'
import Dropdown from '../../basicComp/Dropdown'
import './style.less'
import MainForm from './MainForm'
import SubForm from './SubForm' 
import ApproveRange from './ApproveRange'

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
                <div className="property-row-title" style={{fontSize:'14px'}}> 子流程内容设置 </div>
                <div className="property-row-title" style={{fontSize:'14px',paddingTop:'10px'}}> 主表 </div>
                <MainForm />
                {SubFormComp}
            </div>
        )
    }
    const options = {mapPropToDictionary: (props)=>window.reactI18n}
    const ConnectedApp = connectPut(options)(SettingPopup)
    return global.connect2redux('subflow',ConnectedApp)
}

/*
const mapStateToProps = (state) => {
    const repo = state.subflow.repo
    const id = state.subflow.id
    const currentRepos = repo.filter((el,index)=>el.id == id)
    if(!currentRepos[0]) return false
    const currentRepo = currentRepos[0]
    return {currentRepo} 
}
const mapDispatchToProps = (dispatch) => ({dispatch})
return connect(mapStateToProps,mapDispatchToProps)(ConnectedApp)

*/