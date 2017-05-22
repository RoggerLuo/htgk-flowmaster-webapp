import React,{createClass} from 'react';
import RuleContainer from '../rule/RuleContainer'
import Header from './Header'
/*
RuleContainer需要的参数
    key1 条件在 当前组件中 的序数
    key2 规则在 当前条件中 的序数
    ruleMode 当前显示状态(删除or正常)
    cancelDeleteRuleStatus 取消当前规则的删除状态
*/

/* 当前组件字典
    
    状态类：
        ruleMode RuleContainer需要的参数 当前显示状态(删除or正常) [每个condition独立own and maintain一个ruleMode变量]
        conditionMode 条件是否是删除状态 所有的条件共用一个全局变量

    ruleData 组件保存的主要信息
    headerProps 传递给header组件的
    deleteCondition 执行条件删除

*/
const Condition = ({ruleData,conditionMode,headerProps,deleteCondition,index1,ruleMode}) => {
    let deleteDisplay = 'none'
    let border = '1px solid #dde4ef'
    
    if(conditionMode == 'delete'){
        deleteDisplay = ''
        border = '1px solid red'
    }else{
        deleteDisplay = 'none'
        border = '1px solid #dde4ef'
    }
    return (
        <div className="solid-container-container">
            <div className="solid-container" style={{border:border}}>
                
                <div style={{display:deleteDisplay,height: '115px',
                    background: 'rgba(255, 255, 255, 0.63)',
                    position: 'absolute',
                    zIndex: '999',
                    left: '14px',
                    right: '14px',
                }}></div>

                <Header {...headerProps}/>
                {ruleData.map((el2,index2)=>{
                    let and = ''
                    if(index2>=1){
                        and = (<div className="and">并且</div>)
                    }

                    return (
                        <div className="condition-container" key={index2}>
                            {and}
                            <RuleContainer key1={index1} key2={index2} ruleMode={ruleMode} cancelRuleDeleteStatus={headerProps.cancelRuleDeleteStatus}/>
                        </div>
                    )
                })}
            </div>
            <i className="icon iconfont icon-guanbi2fill icon-red-close-for-condition" 
                onClick={()=>{
                    deleteCondition(index1)
                }} 
                style={{display:deleteDisplay}}>
            </i>
        </div>
    )
}
export default Condition