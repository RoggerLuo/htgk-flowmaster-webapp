import React,{createClass} from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Presentation from './Presentation'
import CompAdd from './CompAdd'
import CompSettingPopup from './CompSettingPopup'
import fetch_leftFields from './fetch_leftFields'
import isMainformOk from './isMainformOk'

const SubflowContainer = ({ currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const data = currentRepo.data || []
    
    fm.subflowCurrentRepo = currentRepo
    const setting = () => {
        if(fm.versionModel) return
        if(currentRepo.subProcess.subProcDefKey){
            // 拉去最新的数据 and required
            fetch_leftFields(currentRepo.subProcess)
        }
        dispatch({
            content:CompSettingPopup(data),
            confirm(){

                if(isMainformOk(fm.subflowCurrentRepo)){
                    return true                    
                }else{
                    return false
                }


            },
            onCancel(){
                rdx.put('subflow','replace',[],fm.subflowTempData)
            },
            type:'callPopupX',
            height:'auto',
            title:'子流程设置',
            width:'988px',
            style:{margin:'10px 40px',width:'100%'}
        })
        fm.subflowTempData = JSON.parse( JSON.stringify(currentRepo) )
    }

    const add = () => {
        if(fm.versionModel) return
        dispatch({
            content:CompAdd,
            confirm:()=>{
                setting()
                return true
            },
            type:'callPopup',
            height:'75%',
            title:'button.option9',
            width:'640px',
            style:{margin:'10px 60px'},
            outerStyle:{overflow:'auto'},
            onCancel(){
                rdx.put('subflow','replace',['subProcess'],{},'object')
            }
        })
        rdx.save() 
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
