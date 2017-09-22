import React,{createClass} from 'react';
import { render } from 'react-dom'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import Presentation from './Presentation'

const Approve = ({repo,id}) => {
    const currentRepo = repo.filter((el,index)=>{
        return el.id == id
    })
    const data = currentRepo && currentRepo[0] && currentRepo[0].data||[]
    const chooseCallback = (e) => {
        window.removeEventListener("message",chooseCallback, false)
    }
    const callDialogue = () => {
        window.addEventListener('message',chooseCallback,false)
        let message = {type:"openSelectUserPanel",value:"test",params:{pickerType:'people',title:'选择人员'}}
        window.parent.postMessage(message,'*')
    }
    return(
        <Presentation data={data} />
    )
}

const mapStateToProps = (state) => {
    return {repo:state.approve.repo,id:state.approve.id}
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
