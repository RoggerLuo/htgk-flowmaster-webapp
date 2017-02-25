import React,{createClass} from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../../redux/configureStore.js'
import PopupWrap from '../presentations/PopupWrap/PopupWrap'

const Component = ({width,title,confirm,content,display,dispatch,height}) => {
    const options = {
        cancel(){
            dispatch({type:'hidePopup'})
        },
        confirm,
        display,
        title,
        height,width
    }
    const Content = content

    if(Content != ''){
        return (
            <PopupWrap {...options}>
                <Content />
            </PopupWrap>
        )
    }else{
        return (
            <PopupWrap {...options}></PopupWrap>
        )
    }
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
    );
}