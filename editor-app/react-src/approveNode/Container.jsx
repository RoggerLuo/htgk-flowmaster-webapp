import React,{createClass} from 'react';
import { render } from 'react-dom'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import Presentation from './Presentation'
// import './save'

const Approve = ({repo,id}) => {
    const currentRepo = repo.filter((el,index)=>{
        return el.id == id
    })
    const data = currentRepo && currentRepo[0] && currentRepo[0].data||[]

    const chooseCallback = (e) => {
        console.log(e)
        console.log('approve')
        window.removeEventListener("message",chooseCallback, false)
        debugger
    }

    const callDialogue = () => {
        window.addEventListener('message',chooseCallback,false)
        let message = {type:"openSelectUserPanel",value:"123test",params:{pickerType:'people',title:'选择人员'}}
        window.parent.postMessage(message,'*')
    }


    return(
        <Presentation data={data} />
    )
}

const mapStateToProps = (state) => {
    return {repo:state.approve.approveListRepo,id:state.approve.id}
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
    );
}
