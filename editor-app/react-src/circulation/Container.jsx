import React,{createClass} from 'react';
import { render } from 'react-dom'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import Presentation from './Presentation'

const Circulation = ({ currentRepo }) => {
    if(!currentRepo) return null
    const data = currentRepo.data||[]
    return(
        <Presentation data={data}/>
    )
}
const CirculationContainer = global.connect2redux('circulation',Circulation)

export default function(){
    render(
        <Provider store={store}>
            <CirculationContainer />
        </Provider>
        ,
        document.getElementById('circulationPropertyCtrl')
    )
}


/*

// const mapStateToProps = (state) => {
//     const repo = state.service.repo
//     const id = state.service.id
//     const filteredRepo = repo.filter((el,index) => el.id == id) || false
//     const currentRepo = filteredRepo && filteredRepo[0] || false
//     return {currentRepo} 
// }
// const mapDispatchToProps = (dispatch) => {
//     return {dispatch}
// }

// const ApproveContainer = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Approve)

*/