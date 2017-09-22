import React,{createClass} from 'react'
import { connect } from 'react-redux'
import store from '../../redux/configureStore.js'
import titleAndClickLogic from './titleAndClickLogic'
import './style.less'
const BoardbuttonContainer = createClass({ 
    getInitialState(){
        return {display:'none'}
    },
    toggle(){
        if(this.state.display=='none'){
            this.setState({display:''})
        }else{
            this.setState({display:'none'})
        }
    },
    close(){this.setState({display:'none'})},
    render(){
        const xClass = this.props.xClass || {}
        const dispatch = this.props.dispatch
        const menuClass = Object.assign({}, xClass, {display: this.state.display})
        const data = titleAndClickLogic(this.props.confirm, dispatch) 
        return (
            <div className="boardbutton">
                <div onClick={this.toggle}>
                    {this.props.children}
                </div>
                <div className="myoption" style={menuClass} >
                    {data.map((el,index)=>{
                        return (
                            <div key={index} className="option-wrap">
                                <div onClick={()=>{el.click();this.close()}} className="option">
                                    {this.props.put(el.title)}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="big-cover" style={{display:this.state.display}} onClick={close}></div>
            </div>  
        )
    }
})

const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(BoardbuttonContainer)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp)

