import React,{createClass} from 'react';
import { render } from 'react-dom'
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import SectionTitleContainer from './SectionTitleContainer'
import Radios from './Radios'
import ContentBody from './ContentBody'
import './style'

const Component = ({put}) => {
    const unfold = () => {
        try {
            fm.closeCurrDpdw && fm.closeCurrDpdw()
        } catch (error) {

        }
    }
    return(
        <div className="react-approve" onClick={unfold}>
            <SectionTitleContainer text={put('branch.sectionTitle')}/>   
            <Radios />
            <ContentBody />
            <div style={{height:'100px',width:'100%'}}></div>
        </div>
    )
}
import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(Component)

export default function(){
    render(
        <Provider store={store}>
            <ConnectedApp />
        </Provider>
        ,
        document.getElementById('branchSequenceFlowComponent')
    );
}