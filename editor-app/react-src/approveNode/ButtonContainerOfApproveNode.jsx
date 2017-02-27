import React,{createClass} from 'react'
import BoardbuttonContainer from '../containers/BoardbuttonContainer'
import save from './save'
import {connect} from 'react-redux'


const ButtonContainer = ({dispatch,children}) => { //parallel 个性化版本  button
    const confirm = (item) => { 
        dispatch({
            type:'pushApproveList',
            item
        })   
        save()
    }

    return ( 
        <BoardbuttonContainer popupConfirm={confirm}>
            {children}
        </BoardbuttonContainer>
    )
}


const mapStateToProps = (state) => {
    return {state}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonContainer)

