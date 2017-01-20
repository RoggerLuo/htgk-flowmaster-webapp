import React,{createClass} from 'react';
import { render } from 'react-dom'
import Dropdown from './basicComp/Dropdown'
import DialoguePopup from './basicComp/DialoguePopup'
import SoftContainer from './basicComp/SoftContainer'
import Boardbutton from './basicComp/Boardbutton'
import CharactersList from './basicComp/CharactersList'
import store from '../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

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
const charactersList = (props)=>{
    return {
        data:props.approveList,
        clickCross(e){
            props.dispatch({type:'removeApproveList',index:e.target.getAttribute('data-index')})
            updatePropertyInModel({key:'approveStaff',value:props.approveList})
        }
    }
}

const Approve = (props) => {
    return(
        <div className="react-approve">
            
            <div className="section-title">审批人员</div>
            
            <Boardbutton {...boardbutton(props)}/>        
            <div className="character-container"><CharactersList {...charactersList(props)}/></div>

            <div className="section-title">审批规则</div>
            <div className="content">只需节点上任意一人审批即可通过</div>
            
            <DialoguePopup {...superDialogue(props).props}>
                申请的上<Dropdown {...superDropdown(props).props}/>级领导
            </DialoguePopup>

            <DialoguePopup {...orgDialogue(props).props}>
                最近<Dropdown {...orgDropdown(props).props}/>级分管 <input type="text" style={{width:'100px'}} placeholder="请选择角色类型"/>
            </DialoguePopup>
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