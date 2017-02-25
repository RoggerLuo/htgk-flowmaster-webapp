import React,{createClass} from 'react';
import { render } from 'react-dom'
import DialoguePopup from '../basicComp/DialoguePopup'
import SoftContainer from '../basicComp/SoftContainer'
import BoardbuttonContainer from '../BoardbuttonContainer'
import CharactersList from '../basicComp/CharactersList'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import saveHandler from './save'
import  './style'

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

const CharactersList2 = ({data,clickCross}) => {
    
    return(
       <div className="characters">
           {
                data.map((el,index)=>{
                   let or = ''
                   
                   if( index >= 1 ){
                       or = <span className="or">或</span>
                   }
                   
                   return (
                       <div key={index} className="single-container">
                           {or}
                           <div className="character">
                               <span className="name">{el.text}</span><span className="cross" data-index={index} onClick={clickCross}>X</span>
                           </div>
                       </div>
                   )
               })
            }
       </div>
    )
}

import save from './save'
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
    const confirm = (item) => {
        dispatch({
            type:'pushApproveList',
            item
        })   
    }
    return(
        <div className="react-approve">
            <div className="property-row-title">审批人员</div>            
            <BoardbuttonContainer save={save} confirm={confirm}>
                <div className="mybutton" >
                    <span className="inverted-triangle">
                        <i className="icon qingicon icon-add"></i>
                    </span>
                    添加审批人员
                </div>
            </BoardbuttonContainer>        
            
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



// const orgDropdown = (props)=>{
//     const publicMethod = function(){
//         props.dispatch({type:'updateOrgDropDownChoosedOption','text':this.text})
//     }
//     const data = [{text:'一'},{text:'二'},{text:'三'}]
//     const options = data.map((el)=>{
//         el.onClick=publicMethod
//         return el
//     })
//     return  {   
//         props:{
//             visibleStatus:props.orgDropDownVisibilityStatus,
//             choosedOption:props.orgDropDownChoosedOption,
//             options:options
//         },
//         init(){
//             if(data[0]){
//                 props.dispatch({type:'updateOrgDropDownChoosedOption','text':data[0].text})
//             }else{
//                 props.dispatch({type:'updateOrgDropDownChoosedOption','text':''})
//             }
//         }
//     }
// }
// const orgDialogue = (props)=>{
//     const add = () => {
//         props.dispatch({type:'pushApproveList',item:{cate:'role',value:props.orgDropDownChoosedOption,text:'上'+props.orgDropDownChoosedOption+'级分管的角色类型'}})
//         saveHandler()
//     }
//     const close = () => {
//         props.dispatch({type:'closeOrgDialogue'})
//     }
//     const open = () => {
//         props.dispatch({type:'openOrgDialogue'})
//     }
//     return {
//         props:{
//             visibleStatus:props.orgDialogueVisibilityStatus,
//             close:close,
//             confirm(){
//                 add()
//                 close()
//             }
//         },
//         open:open
//     }
// }

