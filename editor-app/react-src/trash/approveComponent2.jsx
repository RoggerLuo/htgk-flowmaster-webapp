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
import chooseStaffPopup from './chooseStaffPopup'



const dropdownSuper = {
    params:{

    },
    
}
const dropdownOrg
const broadbutton


const Approve = (props) => {
    
    const orgDialogueParams={
        visibleStatus:props.orgDialogueVisibilityStatus,
        close(){
            props.dispatch({type:'closeOrgDialogue'})
        },
        confirm(){
            props.dispatch({type:'pushApproveList',item:{text:'上'+props.orgDropDownChoosedOption+'级分管的角色类型'}})
            props.dispatch({type:'closeOrgDialogue'})

        }
    }


    /* org dropdown */
    const orgPublicFunc = function(){
        props.dispatch({type:'updateOrgDropDownChoosedOption','text':this.text})
    }
    let orgDropdownParams={
        visibleStatus:props.orgDropDownVisibilityStatus,
        choosedOption:props.orgDropDownChoosedOption,
        options:[
            {
               text:'一',
               onClick:orgPublicFunc
            },
            {
               text:'二',
               onClick:orgPublicFunc
            },
            {
               text:'三',
               onClick:orgPublicFunc
            }
        ]
    }
    /* org dropdown end */



    /* start of the superDropdown */
    const publicOnClick = function(){
        props.dispatch({type:'updateSuperDropDownChoosedOption','text':this.text})
    }
    let superDropdownParams={
        visibleStatus:props.superDropDownVisibilityStatus,
        toggle(e){
            props.dispatch({type:'toggleSuperDropDownVisibility'})
            e.stopPropagation()
            e.preventDefault()
        },
        choosedOption:props.superDropDownChoosedOption,
        options:[
            {
                text:'一',
                onClick:publicOnClick
            },
            {
                text:'二',
                onClick:publicOnClick
            },
            {
                text:'三',
                onClick:publicOnClick
            }
        ]
    }

    /* end of the superDropdown */

    const superDialogueParams={
        visibleStatus:props.superDialogueVisibilityStatus,
        close(){
            props.dispatch({type:'closeSuperDialogue'})
        },
        confirm(){
            props.dispatch({type:'pushApproveList',item:{text:'上'+props.superDropDownChoosedOption+'级领导'}})
            props.dispatch({type:'closeSuperDialogue'})
        }
    }

    

    const boardbuttonParams={
        visibilityStatus:props.UserBoardbuttonVisibilityStatus,
        dispatch:props.dispatch,
        close(e){
            props.dispatch({type:'closeUserTaskBoardbuttonVisibility'})
            e.stopPropagation()
            e.preventDefault()
        },
        toggle(e){
            props.dispatch({type:'changeUserTaskBoardbuttonVisibility'})
            e.stopPropagation()
            e.preventDefault()
        },
        title:'添加审批人员',
        options:[
            {
                onClick(e){
                    props.dispatch({type:'openSuperDialogue'})
                    props.dispatch({type:'closeUserTaskBoardbuttonVisibility'})
                    e.stopPropagation()
                    e.preventDefault()

                    /* 不能放在纯函数组件里触发，就放在“模拟挂载”事件中触发 */
                    if(superDropdownParams.options[0]){
                        props.dispatch({type:'updateSuperDropDownChoosedOption','text':superDropdownParams.options[0].text})
                    }else{
                        props.dispatch({type:'updateSuperDropDownChoosedOption','text':''})
                    }
                },
                text:'选择发起人上级'
            },
            {
                onClick(e){
                    props.dispatch({type:'openOrgDialogue'})
                    props.dispatch({type:'closeUserTaskBoardbuttonVisibility'})
                    e.stopPropagation()
                    e.preventDefault()

                    if(orgDropdownParams.options[0]){
                        props.dispatch({type:'updateOrgDropDownChoosedOption','text':orgDropdownParams.options[0].text})
                    }else{
                        props.dispatch({type:'updateOrgDropDownChoosedOption','text':''})
                    }

                },
                text:'选择机构角色'
            },
            {
                onClick(e){
                    props.dispatch({type:'openBigPopupOfChooseStaff'})
                    props.dispatch({type:'closeUserTaskBoardbuttonVisibility'})
                    e.stopPropagation()
                    e.preventDefault()
                },
                text:'选择特定人员'
            },
        ]
    }
    
    const charactersList = {
        data:props.approveList,
        clickCross(e){
            props.dispatch({type:'removeApproveList',index:e.target.getAttribute('data-index')})
        }
    }
    return(
        <div className="react-approve">
            
            <div className="section-title">审批人员</div>
            
            <Boardbutton {...boardbuttonParams}/>        
            <CharactersList {...charactersList}/>


            <div className="section-title">审批规则</div>
            <div className="content">只需节点上任意一人审批即可通过</div>
            
            <DialoguePopup {...superDialogueParams}>
                申请的上<Dropdown {...superDropdownParams}/>级领导
            </DialoguePopup>

            <DialoguePopup {...orgDialogueParams}>
                最近<Dropdown {...orgDropdownParams}/>级分管 <input type="text" style={{width:'100px'}} placeholder="请选择角色类型"/>

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
    // store.dispatch({type:'closeBoardbuttonVisibility'})
    chooseStaffPopup()
    store.dispatch({type:'closeBigPopupOfChooseStaff'})

    render(
        <Provider store={store}>
            <ApproveContainer />
        </Provider>
        ,
        document.getElementById('approvePropertyCtrl')
    );
}