import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import PopupWrap from './PopupWrap'
import store from '../../redux/configureStore'

const Component = ({width,title,confirm,content,height}) => {
    const options = {confirm,title,height,width}
    const Content = content
    if(Content == '') return (<div></div>)
    return (
        <PopupWrap {...options}>
            <Content />
        </PopupWrap>
    )
}

    
const mapStateToProps = (state) => {
    return state.popup
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
        document.getElementById('hugePopup')
    )
}