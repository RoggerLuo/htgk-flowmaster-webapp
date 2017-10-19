import React from 'react'
import Button from '../DropdownButton'
import {connect} from 'react-redux'
// import Confirm from '../DropdownButton/Buttons/Confirm'
const isSingleSelect = (cate) => {
    switch(cate){
        case 'boss':
        case 'fromDb':
        case 'EXTERNAL':
        case 'form':
        case 'customizeRole':
        return true
    }
    return false
}
const isTheSameCate = (cate1,cate2) => {
    return isSingleSelect(cate1) == isSingleSelect(cate2)
}
const ButtonContainer = ({reduxCate,dispatch,children}) => { 
    const confirmFunction = (item) => {
        //&& (reduxCate == false)
        if(
            (isTheSameCate(reduxCate,item.cate)||reduxCate==false) //两个都是同一个，不用清空
        ||
            (!isSingleSelect(item.cate) && !isSingleSelect(reduxCate)) //两个都不是单选，也不用清空              
        ){}else{
            //清空
            const r=confirm("修改节点审批人类型，可能会导致之前已维护的内容被清空");
            if(r==true){
                dispatch({type:'approve/clearPool'})
            }else{
                return 
            }
        }
        dispatch({type:'approve/add2pool',item})   
        activeSave() 
    }
    const xClass = {marginTop:'5px',right:'12px'}
    return ( 
        <Button xClass={xClass} confirm={confirmFunction}>
            {children}
        </Button>
    )
}

const mapStateToProps = (state) => {
    const currentRepo = state.approve.repo.filter((el,index)=>el.id == state.approve.id)
    const reduxCate = currentRepo && currentRepo[0] && currentRepo[0].cate||false
    return {reduxCate}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonContainer)

