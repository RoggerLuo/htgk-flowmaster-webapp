import React,{createClass} from 'react';
import { render } from 'react-dom'
import Dropdown from '../basicComp/Dropdown'
import DialoguePopup from '../basicComp/DialoguePopup'
// import SoftContainer from '../basicComp/SoftContainer'
import Boardbutton from '../basicComp/Boardbutton'
import CharactersList from '../basicComp/CharactersList'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import './style'

const superDropdown = (props)=>{
    const publicMethod = function(){
        props.dispatch({type:'updateSuperDropDownChoosedOption','text':this.text})
    }
    const data = [{text:'一'},{text:'二'},{text:'三'}]
    const options = data.map((el)=>{
        el.onClick=publicMethod
        return el
    })
    return {
        props:{
            visibleStatus:props.superDropDownVisibilityStatus,
            choosedOption:props.superDropDownChoosedOption,
            options:options
        },
        init(){
            /* 不能放在纯函数组件里触发，就放在“模拟挂载”事件中触发 */
            if(data[0]){
                props.dispatch({type:'updateSuperDropDownChoosedOption','text':data[0].text})
            }else{
                props.dispatch({type:'updateSuperDropDownChoosedOption','text':''})
            }
        }   
    } 
}
const superDialogue = (props)=>{
    const close = () => {
        props.dispatch({type:'closeSuperDialogue'})
    }
    const add = () => {
        props.dispatch({type:'pushApproveList',item:{text:'上'+props.superDropDownChoosedOption+'级领导'}})   
        updatePropertyInModel({key:'approveStaff',value:props.approveList})
    }
    const open = () => {
        props.dispatch({type:'openSuperDialogue'})   
    }

    return {
        props:{
            visibleStatus:props.superDialogueVisibilityStatus,
            close:close,
            confirm(){
                add()
                close()
            }
        },
        open:open
    }
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
        props.dispatch({type:'pushApproveList',item:{text:'上'+props.orgDropDownChoosedOption+'级分管的角色类型'}})
        updatePropertyInModel({key:'approveStaff',value:props.approveList})
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

const boardbutton=(props)=>{
    const close = ()=>{
        props.dispatch({type:'closeUserTaskBoardbuttonVisibility'})
    }
    return {
        visibilityStatus:props.UserBoardbuttonVisibilityStatus,
        dispatch:props.dispatch,
        close:close,
        toggle(e){
            props.dispatch({type:'changeUserTaskBoardbuttonVisibility'})
            e.stopPropagation()
            e.preventDefault()
        },
        title:'添加审批人员',
        options:[
            {
                onClick(e){
                    superDropdown(props).init()
                    superDialogue(props).open()
                    close()
                },
                text:'选择发起人上级'
            },
            {
                onClick(e){
                    close()
                    orgDropdown(props).init()
                    orgDialogue(props).open()
                },
                text:'选择机构角色'
            },
            {
                onClick(e){
                    props.dispatch({type:'openBigPopupOfChooseStaff'})
                    close()
                },
                text:'选择特定人员'
            },
        ]
    }
}

const SoftContainer = ({children}) => {
    return(
        <div className="soft-container-container" >
            <div className="soft-container" style={{border:"1px solid red"}}>
                {children}
            </div>
            <i className="icon qingicon icon-guanbi2fill" style={{margin: '-8px'}}></i>
        </div>
    )
}

const charactersList = (props)=>{
    return {
        data:props.approveListRepo[0]||[],
        clickCross(e){
            props.dispatch({type:'removeApproveList',index:e.target.getAttribute('data-index')})
            updatePropertyInModel({key:'approveStaff',value:props.approveList})
        }
    }
}
// <Boardbutton {...boardbutton(props)} position="below"/>  
const Frame = ({children}) =>{
    return (
        <SoftContainer>
            {children}
        </SoftContainer>
    )
}
const Group = (props) => {
    return (
        <SoftContainer>
            
            <div className="container-header">
                <span className="container-title">会签组</span>
            </div>       
            <div className="container-header">
                <CharactersList {...charactersList(props)} />
            </div>       
        </SoftContainer>
    )
}
const addGroup = ()=>{}
const showDelete = ()=>{}

const SectionTitle = ({text,widgetDisplay,cancel,add,del}) => {
    let widget=''
    if(widgetDisplay){
        widget = (<span style={{color:'#00B1FD'}} onClick={cancel}>取消</span>)
    }else{
        widget = (
            <span>
                <i className="icon qingicon icon-add" onClick={add}></i>
                <i className="icon qingicon icon-delete" onClick={del}></i>
            </span>
        )
    }
    return (
        <div className="section-title">
            <span>{text}</span>
            {widget}
        </div>
    )
}
const Character = ({text,index}) => {
    return (
        <div className="character">
            <span className="name">{text}</span>
            <span className="cross" data-index={index} onClick={function(){}}>
            <i className="icon qingicon icon-guanbi2fill"></i></span>
        </div>
    )
}

const Component = (props) => {

    return(
        <div className="react-approve" >
            <SectionTitle text={'会签范围'}/>
            <Frame>

                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div>会签组1</div>
                        <div><i className="icon qingicon icon-jiahao2fill"></i></div>
                    </div>
                    <div style={{flex:'3.5',whiteSpace:'normal'}}>
                        <Character index={1} text={'text'} />
                        <Character index={1} text={'text'} />
                        <Character index={1} text={'text'} />
                        <Character index={1} text={'text'} />
                    </div>
                </div>
                
            </Frame>
            <Frame> 
                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div>会签组2</div>
                        <div></div>
                    </div>
                    <div style={{flex:'3.5'}}>
                        <div>添加审批人员</div>
                    </div>
                </div>
            </Frame>            
            <div className="section-title">审批规则</div>
            <div className="content">需每个会签范围内至少一名代表审批通过方可会签通过</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.approve
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default function(){
    render(
        <Provider store={store}>
            <ComponentContainer />
        </Provider>
        ,
        document.getElementById('parallelApprovePropertyCtrl')
    );
}