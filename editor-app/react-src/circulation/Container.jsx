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
const CirculationContainer = rdx.connect('circulation',Circulation)

export default function(){
    render(
        <Provider store={store}>
            <CirculationContainer />
        </Provider>
        ,
        document.getElementById('circulationPropertyCtrl')
    )
}

