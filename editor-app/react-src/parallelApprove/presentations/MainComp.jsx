import React,{createClass} from 'react';
import './style'

const Component = ({data}) => {
    return(
        <div className="react-approve" >
            <SectionTitle text={'会签范围'}/>
            data.map((el,index)=>{
                return (
                    <ApproveGroupContainer el={el} index={index}/>
                )
            })
            <div className="section-title">审批规则</div>
            <div className="content">需每个会签范围内至少一名代表审批通过方可会签通过</div>
        </div>
    )
}

export default Component
