import React,{createClass} from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../../redux/configureStore.js'

const Component = ({active,click}) => {
    let style ={}

    if(!active){
        style = {backgroundColor: 'rgb(133, 217, 255)'}
        click = function(){}
    }
    return (
        <div id="bottom-save" className="bottom-text-div" style={style} onClick={click}>
            <div className="save">保存</div>
        </div>
    )
}
    
const mapStateToProps = (state) => {
    return {active:state.common.active}
}

const mapDispatchToProps = (dispatch) => {
    const click = () => {
        dispatch({type:'saveDeactive'})
        console.log('save save save save')
    }
    return {click}
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
        document.getElementById('bottom-save')
    )
}