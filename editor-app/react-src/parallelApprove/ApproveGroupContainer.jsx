import React,{createClass} from 'react';
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ApproveGroup from './presentations/ApproveGroup.jsx'
// import save from './save'

const ApproveGroupContainer = ({el,index,deleteMode,dispatch,repoData}) => { //el是会签组group, index 是会签组所在的index
    const data = el.map((el)=>{  //data 是 会签组 //for Character
        el.groupIndex = index //把grounIndex传给Character Container, 在group层级能做的就这么多了
        return el
    })
    
    let mode = 'initial'
    if(data.length == 0){
        mode = 'initial'
    }else{
        mode = 'stuffed'
    }

    const solidFrame = { /* for solid */
        mode:deleteMode,
        del(){
            if(repoData.length <=1){

                window.showAlert('至少保留一组审批人员')
                dispatch({type:'modeChange',value:'normal'})

                return 
            }
            dispatch({type:'deleteGroup',groupIndex:index})
            activeSave()
        }
    }

    return (
        <ApproveGroup {...{index,data,mode,solidFrame}} />
    )
}

const mapStateToProps = (state) => {
    let currentRepo =  state.parallel.repo.filter((el,index)=>{
        return el.id == state.parallel.id
    })[0]
    const repoData = currentRepo && currentRepo.data || []
    const deleteMode = state.parallel.mode
    return {deleteMode,repoData}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(ApproveGroupContainer)


