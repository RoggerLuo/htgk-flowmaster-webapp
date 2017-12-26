import React,{createClass} from 'react';
import { render } from 'react-dom'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import Dropdown from '../basicComp/Dropdown'


const Sf = ({put,currentRepo}) => {
    if(!currentRepo) return null
    const options = window.processStatus.map(el=>{
        return {
            text:el.name,
            value:el.id
        }
    })
    const selected = (item) => rdx.put('sf','replace',['businessStatus'],item,'object')
        
    const selectedOption = currentRepo.businessStatus

    return(
        <div className="react-approve" >
            <div style={{height:'15px',width:'100%'}}></div>
            <div style={{fontWeight:'600'}}>连线状态</div>
            <div style={{height:'0px',width:'100%'}}></div>

            <Dropdown width={'160px'} margin={'0 0'}data={options||[]} choosedOption={selectedOption} choosed={selected} />
            <div style={{height:'100px',width:'100%'}}></div>
        </div>
    )
}


import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(Sf)

const App = global.connect2redux('sf',ConnectedApp)

export default function(){
    render(
        <Provider store={store}>
            <App />
        </Provider>
        ,
        document.getElementById('sequencePropertyCtrl')
    );
}