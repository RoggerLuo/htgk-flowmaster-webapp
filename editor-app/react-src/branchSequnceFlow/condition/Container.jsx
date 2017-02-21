import React,{createClass} from 'react';
// import store from '../../redux/configureStore.js'
import Condition from './condition'
import { connect } from 'react-redux'

const deleteCondition = (conditionIndex) => {
    store.dispatch({type:'deleteCondition',conditionIndex:conditionIndex})
}

const ConditionContainer = createClass({ 
    getInitialState(){
        return {
            menuDisplay:'none',
            ruleMode:'normal',
            
            ruleControlVisible:'none',
            deleteStyle:{
                border:'1px solid white',
                display:'none'
            }
        }
    },
    closeMenu(){
        this.setState({menuDisplay:'none'})        
    },

    toggleMenu(){
        if(this.state.menuDisplay=='none'){
            this.setState({menuDisplay:''})

        }else{
            this.setState({menuDisplay:'none'})
        }
    },
    deleteStart(){
        this.setState({ruleMode:'delete'})
        this.closeMenu() 
    },
    deleteCancel(){
        this.setState({ruleMode:'normal'})
        this.closeMenu() 
    },
    addRule(){
        this.props.addRule(this.props.index)
        this.closeMenu()
    },
    render(){
        const ruleData = this.props.conditions[this.props.index]
        const headerProps = {
            close:this.closeMenu,
            display:this.state.menuDisplay,
            toggleMenu:this.toggleMenu,
            del:this.deleteStart,
            cancel:this.deleteCancel,
            isDots:!((this.state.conditionMode=='delete') && (ruleData.length != 0)),
            add:this.addRule
        }
        const index1 = this.props.index
        const ruleMode = this.state.ruleMode
        return (
            <Condition {...{ruleData,headerProps,index1,ruleMode}}/>
        )
    }
})
// ruleData
/*
{
    border:'1px solid white',
    display:'none'
}})       

*/

const mapStateToProps = (state) => {
    const elementFound = state.branch.dataRepo.filter((el,index)=>{
        return el.id == state.branch.id
    })
    const conditions = elementFound[0] && elementFound[0].conditions || []
    const conditionMode = state.branch.conditionMode
    return {conditions,conditionMode}
}
const mapDispatchToProps = (dispatch) => {
    const addRule = (index) => {
        dispatch({type:'addRule',index})        
    }

    return {addRule}
}
const ConditionContainer2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConditionContainer)

export default ConditionContainer2