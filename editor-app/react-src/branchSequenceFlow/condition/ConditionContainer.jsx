import React,{createClass} from 'react';
import Condition from './ConditionRepresentaion'
import { connect } from 'react-redux'

/*
ConditionRepresentation需要的参数
    状态类：
        ruleMode RuleContainer需要的参数 当前显示状态(删除or正常) [每个condition独立own and maintain一个ruleMode变量]
        conditionMode 条件是否是删除状态 所有的条件共用一个全局变量
    ruleData 组件保存的主要信息
    headerProps 传递给header组件的
    deleteCondition 执行条件删除
*/

/*
header menu组件需要的参数
    startRuleDeleteStatus   跟ruleMode有关
    cancelRuleDeleteStatus  跟ruleMode有关
    isDots  跟ruleMode有关

    display 来自ConditionContainer.state.menuDisplay
    toggleMenu 来自ConditionContainer.state.menuDisplay
    close 来自ConditionContainer.state.menuDisplay

    index
    addRule
*/


const ConditionContainer = createClass({ 
    getInitialState(){
        return {
            menuDisplay:'none'
        }
    },
    render(){

        const deleteCondition = (index) => { //这是删除条件
            if(this.props.conditions.length <=1){
                window.showAlert('至少保留一组条件')
                this.props.dispatch({type:'closeConditionDeleteMode'})
                return 
            }
            activeSave()
            this.props.dispatch({type:'deleteCondition',conditionIndex:index})        
        }
        const ruleData = this.props.conditions[this.props.index] && this.props.conditions[this.props.index].data||[]
        const conditionMode = this.props.conditionMode

       

        /* 考虑到condition删除状态的影响,每次进行判断 */

        const ruleMode = this.props.conditionMode == 'delete'?'normal': this.props.conditions[this.props.index] && this.props.conditions[this.props.index].ruleMode || 'normal'

        /* 准备header的数据 */
        const closeMenu = () => {
            this.setState({menuDisplay:'none'})        
        }
        const toggleMenu = () => {
            if(this.state.menuDisplay=='none'){
                this.setState({menuDisplay:''})
            }else{
                this.setState({menuDisplay:'none'})
            }
        }

        

        /* ruleMode */

        const deleteStart = ()=>{
            this.props.dispatch({type:'allRuleModeEQdelete',index:this.props.index})
            closeMenu()
        }
        const deleteCancel = ()=>{
            this.props.dispatch({type:'allRuleModeEQnormal',index:this.props.index})
            closeMenu()
        }

        const index1 = this.props.index
        const addRule = () => {
            this.props.dispatch({type:'addRule',index:this.props.index})
            closeMenu()
            activeSave()
        }


        const headerProps = {
            close:closeMenu,
            toggleMenu:toggleMenu,
            display:this.state.menuDisplay,

            startRuleDeleteStatus:deleteStart,
            cancelRuleDeleteStatus:deleteCancel,
            isDots:!((ruleMode=='delete') && (ruleData.length != 0)),
            
            addRule,
            index:this.props.index
        }
        return (
            <Condition {...{ruleData,headerProps,index1,ruleMode,conditionMode,deleteCondition}}/>
        )
    }
})

const mapStateToProps = (state) => {
    const elementFound = state.branch.dataRepo.filter((el,index)=>{
        return el.id == state.branch.id
    })
    const conditions = elementFound[0] && elementFound[0].conditions || []
    const conditionMode = state.branch.conditionMode
    return {conditions,conditionMode}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
const ConditionContainer2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConditionContainer)

export default ConditionContainer2