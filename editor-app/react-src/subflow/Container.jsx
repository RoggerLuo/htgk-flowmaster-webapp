import React,{createClass} from 'react';
import { render } from 'react-dom'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import Presentation from './Presentation'
import CompAdd from './CompAdd'
import CompSettingPopup from './CompSettingPopup'

const Approve = ({ currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const data = currentRepo.data || []
    const add = () => {
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
        dispatch({type:'subflow/clear'})
    }
    return(
        <Presentation currentRepo={currentRepo} add={add} setting={setting} del={del}/>
    )
}

const mapStateToProps = (state) => {
    const repo = state.subflow.repo
    const id = state.subflow.id
    const filteredRepo = repo.filter((el,index)=>el.id == id) || false
    const currentRepo = filteredRepo && filteredRepo[0] || false
    return {currentRepo} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ApproveContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Approve)

export default function(){
    render(
        <Provider store={store}>
                <ApproveContainer />
        </Provider>
        ,
        document.getElementById('subflowPropertyCtrl')
    )
}
