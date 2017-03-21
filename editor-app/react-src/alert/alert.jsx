import React,{createClass} from 'react';
import { render } from 'react-dom'
import {connect} from 'react-redux'
import { Provider } from 'react-redux'
import store from '../../redux/configureStore.js'

import './style'
import TimerMixin from 'react-timer-mixin'

// window.reduxStore.dispatch({type:'callAlert',alertContent:'aaa'})
// window.reduxStore.dispatch({type:'hideAlertAnimation'})
// window.reduxStore.dispatch({type:'hideAlert'})

const Component = createClass({ 
    getInitialState(){
        return {currentStep:'d'}
    },
    mixins: [TimerMixin],
    show(){
        this.setTimeout(
           () => { console.log('timeout test'); },
           500
        );
    },
    render(){
        // let dynamicClass = th
        let display = 'none'
        let theClass = ''
        if(this.props.showAlert == 'show'){
            display = ''
            theClass = 'fadeInAlert'
        }
        if(this.props.showAlert == 'hideAnimation'){
            display = ''
            theClass = 'fadeOutAlert'
            // this.setTimeout(
            //    () => { 
            //         console.log('这样我就不会导致内存泄露!'); 
            //         display = 'none'
            //     },
            //    1300
            // );

        }
        if(this.props.showAlert == 'hideAlert'){
            display = 'none'

        }

        return (
            <div className={'alertComponent '+theClass} style={{display:display}}>
                <div className="content">
                    {this.props.alertContent}
                </div>
            </div>
        )
    }
})
// 节点名称不能为空，请编辑后再继续操作

    
const mapStateToProps = (state) => {
    return state.common
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default function(){
    window.showAlert = ()=>{
        store.dispatch({type:'callAlert',alertContent:'节点名称不能为空'})
        store.dispatch({type:'hideAlertAnimation'})
        setTimeout(function(){
            store.dispatch({type:'hideAlert'})
        },1000)
    }

    render(
        <Provider store={store}>
            <ComponentContainer />
        </Provider>
        ,
        document.getElementById('custom-alert')
    )
}
