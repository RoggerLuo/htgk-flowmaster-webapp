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
            <div className="section-title">说明：</div>
            <div className="section-content">
                条件与条件间是“或”的关系<br/>
                规则与规则间是“与”的关系
            </div>
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