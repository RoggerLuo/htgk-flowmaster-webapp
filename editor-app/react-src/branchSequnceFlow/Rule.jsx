import React,{createClass} from 'react';
import SolidContainer from '../basicComp/SolidContainer'
import store from '../../redux/configureStore.js'
import Condition from './condition'

const Rule = createClass({ 
    getInitialState(){
        return {ruleControlVisible:'none'}
    },
    toggleRuleMenu(){
        if(this.state.ruleControlVisible=='none'){
            this.setState({ruleControlVisible:''})

        }else{
            this.setState({ruleControlVisible:'none'})
        }
    },
    closeRuleMenu(){
        this.setState({ruleControlVisible:'none'})        
    },
    render(){
        return (
            <SolidContainer>
                <div className="container-header">
                    <span className="container-title">条件{this.props.index+1}</span> 
                    <span className="the3dots" onClick={this.toggleRuleMenu}>•••</span>
                    <div className="rule-control" style={{display:this.state.ruleControlVisible}}>
                        <div className="options">
                            <div className="option">添加规则</div>
                            <div className="option">删除规则</div>
                        </div>
                    </div>
                    <div style={{display:this.state.ruleControlVisible}} className="big-cover"  onClick={this.closeRuleMenu}></div>
                </div>
                {this.props.el.map((el2,index2)=>{
                    let and = ''
                    if(index2>=1){
                        and = (<div className="and">并且</div>)
                    }
                    return (
                        <div className="condition-container" key={index2}>
                            {and}
                            <Condition {...el2} prototype={this.props.prototype} key1={this.props.index} key2={index2}/>
                        </div>
                    )
                })}   
            </SolidContainer>
        )
    }
})
export default Rule