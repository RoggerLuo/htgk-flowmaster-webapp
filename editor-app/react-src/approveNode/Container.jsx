import React,{createClass} from 'react';
import { render } from 'react-dom'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import Presentation from './Presentation'

const Approve = ({ currentRepo }) => {
    if(!currentRepo[0]) return null

    return(
        <Presentation data={data} cate={cate} />
    )
}

const mapStateToProps = (state) => {
    const repo = state.approve.repo
    const id = state.approve.id
    const currentRepo = repo.filter((el,index)=>el.id == id) || false

    return {currentRepo} 


}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ApproveContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Approve)

export default function(){
    render(
        <Provider store={store}>
                <ApproveContainer />
        </Provider>
        ,
        document.getElementById('approvePropertyCtrl')
    )
}
