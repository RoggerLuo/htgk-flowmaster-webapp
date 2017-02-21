import React,{createClass} from 'react';
import store from '../../redux/configureStore.js'
import RuleContainer from './rule'

const deleteCondition = (conditionIndex) => {
    store.dispatch({type:'deleteCondition',conditionIndex:conditionIndex})
}


const ConditionGroup = createClass({ 
    getInitialState(){
        return {
            ruleControlVisible:'none',
            deleteStyle:{
                border:'1px solid white',
                display:'none'
            }
        }
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
    deleteRuleMode(){
        this.setState({deleteStyle:{
            border:'1px solid red',
            display:''
        }})      
        this.closeRuleMenu() 
    },
    closeDeleteRuleMode(){
        this.setState({deleteStyle:{
            border:'1px solid white',
            display:'none'
        }})       
        this.closeRuleMenu() 
    },
    render(){
        let dots = ''
        if( (this.state.deleteStyle.display=='') && (this.props.el.length != 0) ){
            dots = (<span style={{color:'#00b0ff',marginRight:'8px'}} onClick={this.closeDeleteRuleMode}>取消</span>)
        }else{
            dots = (<span className="the3dots" onClick={this.toggleRuleMenu}>•••</span>)
        }
        return (
            <div className="solid-container-container">
                <div className="solid-container" style={{border:this.props.conditionDeleteStyle.border}}>
                    <div className="container-header">
                        <span className="container-title">条件{this.props.index+1}</span> 
                        {dots}
                        <div className="rule-control" style={{display:this.state.ruleControlVisible}}>
                            <div className="options">
                                <div className="option" onClick={()=>{
                                    this.props.addRule(this.props.index)
                                    this.closeRuleMenu()
                                    this.closeDeleteRuleMode()
                                }}>添加规则</div>
                                <div className="option" onClick={this.deleteRuleMode}>删除规则</div>
                            </div>
                        </div>
                        <div onClick={this.closeRuleMenu} style={{display:this.state.ruleControlVisible}} className="big-cover" ></div>
                    </div>
                    
                    {this.props.el.map((el2,index2)=>{
                        let and = ''
                        if(index2>=1){
                            and = (<div className="and">并且</div>)
                        }
                        return (
                            <div className="condition-container" key={index2}>
                                {and}
                                <RuleContainer key1={key1} key2={index2} />
                            </div>
                        )
                    })}

                </div>
                <i className="icon qingicon icon-guanbi2fill icon-red-close-for-condition" onClick={()=>{deleteCondition(this.props.index)}} style={{display:this.props.conditionDeleteStyle.display}}></i>
            </div>
        )
    }
})
const Header = ({index,display,add,del,close,cancel,isDots,toggleMenu}) => {
    let dots = ''
    if(isDots){
        dots = (<span style={{color:'#00b0ff',marginRight:'8px'}} onClick={cancel}>取消</span>)
    }else{
        dots = (<span className="the3dots" onClick={toggleMenu}>•••</span>)
    }

    return (
        <div className="container-header">
            <span className="container-title">条件{index+1}</span> 
            {dots}
            <div className="rule-control" style={{display:display}}>
                <div className="options">
                    <div className="option" onClick={add}>添加规则</div>
                    <div className="option" onClick={del}>删除规则</div>
                </div>
            </div>
            <div onClick={close} style={{display:display}} className="big-cover" ></div>
        </div>
    )
}

const Condition = ({conditionMode,index,menuDisplay,ruleData}) => {
    let deleteDisplay = 'none'
    let border = '1px solid #dde4ef'
    if(conditionMode == 'delete'){
        deleteDisplay = ''
        border = '1px solid #dde4ef'
    }else{
        deleteDisplay = 'none'
        border = '1px solid white'
    }

    return (
        <div className="solid-container-container">
            <div className="solid-container" style={{border:border}}>
                <Header />
                
                {ruleData.map((el2,index2)=>{
                    let and = ''
                    if(index2>=1){
                        and = (<div className="and">并且</div>)
                    }
                    return (
                        <div className="condition-container" key={index2}>
                            {and}
                            <RuleContainer key1={key1} key2={index2} />
                        </div>
                    )
                })}

            </div>
            <i className="icon qingicon icon-guanbi2fill icon-red-close-for-condition" onClick={()=>{deleteCondition(this.props.index)}} style={{display:deleteDisplay}}></i>
        </div>
    )
}
export default ConditionGroup