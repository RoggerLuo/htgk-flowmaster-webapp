import React,{createClass} from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../../redux/configureStore.js'

const Component = ({active,click,put}) => {
    let save = function(){}
    let style = {backgroundColor: 'rgb(133, 217, 255)'}

    if(active){
        save = click
        style = {backgroundColor: 'rgb(0,176,255)'}
    }
    return (
        <div id="bottom-save" className="bottom-text-div" style={style} onClick={save}>
            <div className="save">{put('button.save')}</div>
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


import connectPut from 'react-put'
import zh from '../i18n/zh'
import en from '../i18n/en'
const options = {mapPropToDictionary: (props)=>en}
const ConnectedApp = connectPut(options)(Component)


const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp)


export default function(){
    render(
        <Provider store={store}>
            <ComponentContainer />
        </Provider>
        ,
        document.getElementById('bottom-save')
    )
}