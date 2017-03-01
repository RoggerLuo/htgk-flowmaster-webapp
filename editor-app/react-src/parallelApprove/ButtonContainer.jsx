import React,{createClass} from 'react'
import BoardbuttonContainer from '../containers/BoardbuttonContainer'
import save from './save'
import {connect} from 'react-redux'


const ButtonContainer = ({dispatch,children,index}) => { //parallel 个性化版本  button
    const add = (item) => { 
        dispatch({type:'addCharacter',item,index}) //点击popup的确定按钮时返回 popup选择的item
        save()
        window.activeSave() 
    }

    return ( 
        <BoardbuttonContainer popupConfirm={add}>
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

