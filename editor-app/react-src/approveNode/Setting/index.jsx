import React from 'react'
import { connect } from 'react-redux'
import Pre from './Pre'
const ApproveNode = ({ put, currentRepo, dispatch }) => {
    if(!currentRepo[0]) return null
    const rdx = currentRepo[0]
    const oncheckFactory = (key) => {
        return ()=>{
            dispatch({type:'approve/change',key,value:!!!currentRepo[0][key]})
            activeSave()             
        }
    }

    const data = [
        {
            title:'允许退回发起人',
            oncheck:oncheckFactory('backToStarter'),
            checked:rdx.backToStarter||false,
            defaultValue:'退回发起人',
            inputValue:'',
            onchange(){}
        },
        {
            title:'允许退回上一节点审批人',
            oncheck:oncheckFactory('backToLast'),
            checked:rdx.backToLast||false,
            defaultValue:'退回上一节点审批人',
            inputValue:'',
            onchange(){}
        },
        {
            title:'允许强制结束流程',
            oncheck:oncheckFactory('allowForceEnd'),
            checked:rdx.allowForceEnd||false,
            defaultValue:'强制结束流程',
            inputValue:'',
            onchange(){}
        }
    ]
    return(
        <div>
            {data.map((el,index)=>{
                return (<Pre {...el} index={index} key={index} />) 
            })}
        </div>)
}

const mapStateToProps = (state) => {
    const repo = state.approve.repo
    const id = state.approve.id
    const currentRepo = repo.filter((el,index)=>el.id == id) || false
    return {currentRepo} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApproveNode)
