import React,{createClass} from 'react'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import MainComp from './presentations/MainComp.jsx'

const mapStateToProps = (state) => {
    return {data:state.parallel.data}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
const MainCompContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainComp)

export default function(){
    render(
        <Provider store={store}>
            <MainCompContainer />
        </Provider>
        ,
        document.getElementById('parallelApprovePropertyCtrl')
    );
}
