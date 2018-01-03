import React,{createClass} from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Presentation from './Presentation'
import CompAdd from './CompAdd'
import CompSettingPopup from './CompSettingPopup'

const SubflowContainer = ({ currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const data = currentRepo.data || []
    const add = () => {
        if(fm.versionModel) return
        dispatch({
            content:CompAdd,
            confirm:()=>{},
            type:'callPopup',
            height:'75%',
            title:'button.option9',
            width:'640px',
            style:{margin:'10px 60px'}
        })
        activeSave() 

    }
    const setting = () => {
        if(fm.versionModel) return
        window.requestFormData(currentRepo.subProcess.subProcDefKey,function(dataObj){
            if(!dataObj) return
            dispatch({type:'subflow/leftFields',leftFields:dataObj.components})
        })
        dispatch({
            content:CompSettingPopup(data),
            confirm:()=>{},
            type:'callPopupX',
            height:'auto',
            title:'子流程设置',
            width:'988px',
            isSubflow:true,
            style:{margin:'10px 40px',width:'100%'}
        })
    }
    const del = () => {
        if(fm.versionModel) return
        dispatch({type:'subflow/clear'})
    }
    return(
        <Presentation currentRepo={currentRepo} add={add} setting={setting} del={del}/>
    )
}
const SubflowContainerConnected = rdx.connect('subflow',SubflowContainer)

export default function(){
    render(
        <Provider store={rdx.store}>
                <SubflowContainerConnected />
        </Provider>
        ,
        document.getElementById('subflowPropertyCtrl')
    )
}
