import React,{createClass} from 'react'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import MainComp from './presentations/MainComp.jsx'
import { render } from 'react-dom'

const MainCompContainer = ({data,mode,dispatch}) => {
    mode = (mode == 'delete')? 'notIcon':'icon'
    const sectionTitle = {
        mode:mode,
        cancel(){
            dispatch({type:'modeChange',value:'normal'})
        },
        add(){
            dispatch({type:'addGroup'})            
            activeSave()
        },
        del(){
            dispatch({type:'modeChange',value:'delete'})            
            activeSave()
        }
    }
    return (
        <MainComp data={data} sectionTitle={sectionTitle} />
    )
}

const mapStateToProps = (state) => {
    let currentRepo =  state.parallel.repo.filter((el,index)=>{
        return el.id == state.parallel.id
    })[0]
    const data = currentRepo && currentRepo.data || []
    return {data,mode:state.parallel.mode}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}


const MainCompContainer2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainCompContainer)

export default function(){
    render(
        <Provider store={store}>
            <MainCompContainer2 />
        </Provider>
        ,
        document.getElementById('parallelApprovePropertyCtrl')
    );
}

