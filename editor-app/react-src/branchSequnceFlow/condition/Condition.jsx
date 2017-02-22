import React,{createClass} from 'react';
import RuleContainer from '../RuleContainer'
import Header from './Header'

const Condition = ({conditionMode,deleteCondition,menuDisplay,ruleData,headerProps,index1,ruleMode}) => {
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
                <Header {...headerProps}/>
                {ruleData.map((el2,index2)=>{
                    let and = ''
                    if(index2>=1){
                        and = (<div className="and">并且</div>)
                    }
                    return (
                        <div className="condition-container" key={index2}>
                            {and}
                            <RuleContainer key1={index1} key2={index2} ruleMode={ruleMode}/>
                        </div>
                    )
                })}
            </div>
            <i className="icon qingicon icon-guanbi2fill icon-red-close-for-condition" 
                onClick={()=>{deleteCondition(index1)}} 
                style={{display:deleteDisplay}}>
            </i>
        </div>
    )
}
export default Condition