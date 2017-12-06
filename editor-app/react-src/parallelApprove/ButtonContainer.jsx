import React,{createClass} from 'react'
import Button from '../DropdownButton'
import {connect} from 'react-redux'
import confirmGenerator from '../confirmGenerator'

const ButtonContainer = ({currentRepo,dispatch,children,index,xClass}) => { 
    const add = (item) => {
        dispatch({type:'parallel/addChar',item,index}) //index是group index
        window.activeSave() 
    }
    const clear = () => dispatch({type:'parallel/clear',index}) //index是group index
    const reduxCate = ( //reduxCate是从现有的第一个item上获取的
        currentRepo.data 
        && currentRepo.data[index]
        && currentRepo.data[index][0]
        && currentRepo.data[index][0].cate || false)
    const confirmFunction = confirmGenerator({reduxCate,add,clear})
    return ( 
        <Button xClass={xClass} confirm={confirmFunction} existCate={reduxCate} groupInd={index}>
            {children}
        </Button>
    )
}

const mapStateToProps = (state) => {
    const filteredRepo = state.parallel.repo.filter((el,index)=>el.id == state.parallel.id)
    const currentRepo = filteredRepo[0] && filteredRepo[0] || false
    return { currentRepo }
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(mapStateToProps,mapDispatchToProps)(ButtonContainer)

