import React,{createClass} from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../../redux/configureStore.js'
import Popup from './component/component'

const Component = ({title,confirm,content,display,dispatch,height}) => {
    const options = {
        cancel(){
            dispatch({type:'hidePopup'})
        },
        confirm,
        display,
        title,
        height
    }
    return (
        <Popup {...options}>{content}</Popup>
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
    );
}