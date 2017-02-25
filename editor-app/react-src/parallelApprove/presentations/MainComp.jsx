import React,{createClass} from 'react'
import ApproveGroupContainer from '../ApproveGroupContainer'
import SectionTitle from '../../presentations/SectionTitle/SectionTitle'
import './MainComp.less'

const Component = ({data,sectionTitle}) => {
    
    return(
        <div className="react-approve" >
            <SectionTitle {...sectionTitle} text={'会签范围'} /> 
            {data.map((el,index)=>{ //data是state.parallel.data， el是会签组group
                return (
                    <ApproveGroupContainer el={el} index={index} key={index}/>
                )
            })}
            <div className="section-title">审批规则</div>
            <div className="content">需每个会签范围内至少一名代表审批通过方可会签通过</div>
        </div>
    )
}

export default Component
