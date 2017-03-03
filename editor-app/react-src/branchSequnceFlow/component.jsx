import React,{createClass} from 'react';
import { render } from 'react-dom'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import SectionTitleContainer from './SectionTitleContainer'
import Radios from './Radios'
import Options from './Options'
import './style'


const Component = () => {
    return(
        <div className="react-approve" >
            <SectionTitleContainer text='条件设置'/>            
            <Radios />
            <div className="section-content">满足以下条件则分支流向节点“{window.nextElementIs}”</div>
            <Options />
            
        </div>
    )
}
export default function(){
    render(
        <Provider store={store}>
            <Component />
        </Provider>
        ,
        document.getElementById('branchSequenceFlowComponent')
    );
}