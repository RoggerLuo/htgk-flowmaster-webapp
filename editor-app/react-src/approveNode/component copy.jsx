import React,{createClass} from 'react';
import { render } from 'react-dom'
import DialoguePopup from '../basicComp/DialoguePopup'
import SoftContainer from '../basicComp/SoftContainer'
import Boardbutton from '../basicComp/Boardbutton'
import CharactersList from '../basicComp/CharactersList'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import certainPersonContent from '../popup/certainPerson/content'
import superContent from '../popup/super/content'
import organContent from '../popup/organ/content'
import  './style'

const saveHandler = () => {
    let data = store.getState().approve.approveListRepo.filter((el,index)=>{
        return el.id == store.getState().approve.id
    })[0].data
    let string = ''
    data && data.forEach((el,index)=>{
        switch(el.cate){
            case 'boss':
                string += 'boss' + '('+ el.value +')'
                break
            case 'role':
                string += 'role' + '('+ el.value2 +':'+ el.value +')'
                break
            case 'user':
                break
        }
    })
    let value = {
        "items" : 
            [ 
                {
                    "assignment_type" : "candidate",
                    "resourceassignmentexpr" : string
                } 
            ],
        "totalCount" : 1
    }
    window.updatePropertyInModel({key:'usertaskassignment',value:value})
    console.log(JSON.stringify(getJson()))
}


const orgDropdown = (props)=>{
    const publicMethod = function(){
        props.dispatch({type:'updateOrgDropDownChoosedOption','text':this.text})
    }
    const data = [{text:'一'},{text:'二'},{text:'三'}]
    const options = data.map((el)=>{
        el.onClick=publicMethod
        return el
    })
    return  {   
        props:{
            visibleStatus:props.orgDropDownVisibilityStatus,
            choosedOption:props.orgDropDownChoosedOption,
            options:options
        },
        init(){
            if(data[0]){
                props.dispatch({type:'updateOrgDropDownChoosedOption','text':data[0].text})
            }else{
                props.dispatch({type:'updateOrgDropDownChoosedOption','text':''})
            }
        }
    }
}
const orgDialogue = (props)=>{
    const add = () => {
        props.dispatch({type:'pushApproveList',item:{cate:'role',value:props.orgDropDownChoosedOption,text:'上'+props.orgDropDownChoosedOption+'级分管的角色类型'}})
        saveHandler()
    }
    const close = () => {
        props.dispatch({type:'closeOrgDialogue'})
    }
    const open = () => {
        props.dispatch({type:'openOrgDialogue'})
    }
    return {
        props:{
            visibleStatus:props.orgDialogueVisibilityStatus,
            close:close,
            confirm(){
                add()
                close()
            }
        },
        open:open
    }
}


const add = (category) => {
    let text=''
    switch(category){
        case 'boss':
            text = '上'+store.getState().dropdown.dropdown1.text+'级领导'
        break
        case 'role':
            text = '最近'+store.getState().dropdown.dropdown1.text+'级分管，' + store.getState().dropdown.dropdown2.text
        break
        case 'user':
            text = '上'+store.getState().dropdown.dropdown1.text+'级领导'
        break
    }
    store.dispatch({
        type:'pushApproveList',
        item:{
            cate:category,
            value:store.getState().dropdown.dropdown1.value,
            value2:store.getState().dropdown.dropdown2.value,
            text
        }
    })   
    saveHandler()
}
const action1 = {
    type:'callPopup',
    confirm:()=>{add('boss')},
    content:superContent,
    title:'添加发起人上级',
    height:'45%',
    width:'44%'
}
const action2 = {
    type:'callPopup',
    height:'45%',
    confirm:()=>{add('role')},
    content:organContent,
    title:'添加机构角色',
    width:'44%'
}
const action3 = {
    height:'66%',
    type:'callPopup',
    confirm:()=>{add('user')},
    content:certainPersonContent,
    title:'添加特定人员'
}
const buttonOptions = {
    title:'添加审批人员',
    buttons:[
        action1,
        action2,
        action3
    ]
}
const charactersList = ()=>{
    const list = store.getState().approve.approveListRepo.filter((el,index)=>{
        return el.id == store.getState().approve.id
    })
    return {
        data:list && list[0] && list.data||[],
        clickCross(e){
            props.dispatch({type:'removeApproveList',index:e.target.getAttribute('data-index')})
            saveHandler()
        }
    }
}
const Approve = ({approveListRepo,id,dispatch}) => {
    
    const list = approveListRepo.filter((el,index)=>{
        return el.id == id
    })
    const charactersData = {
        data:list && list[0] && list[0].data||[],
        clickCross(e){
            dispatch({type:'removeApproveList',index:e.target.getAttribute('data-index')})
            saveHandler()
        }
    }
    return(
        <div className="react-approve">
            <div className="property-row-title">审批人员</div>            
            <Boardbutton options={buttonOptions}/>        
            
            <div className="character-container">
                <CharactersList {...charactersData}/>
            </div>

            <div className="property-row-title">审批规则</div>
            <div className="the-content">只需节点上任意一人审批即可通过</div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return state.approve
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
        document.getElementById('approvePropertyCtrl')
    );
}