import React,{createClass} from 'react'
import Dropdown from '../../../basicComp/Dropdown'
class SingleBtn extends React.Component { 
    constructor(props) {
        super(props)
        this.toggleView = this.toggleView.bind(this)
        this.state = {choosed:false}
    }
    toggleView(id,name){
        this.setState({choosed:!this.state.choosed})
        this.props.onclick(id,name)
    }
    render(){
        let className = "customRoleSingleBtn"
        if(this.state.choosed) className = 'customRoleSingleBtnActive'
        return (<div className={className} onClick={()=>this.toggleView(this.props.id,this.props.name)}>{this.props.name}</div>)
    }
}
export default ({current,inherit,onclick}) => {   
    const OrgGroup = ({name,roles}) => {
        return (
            <div>
                <div className="customRoleOrgName">{name}</div>
                <div>    
                    {roles.map((el,index)=><SingleBtn {...el} key={index} onclick={onclick}/>)}
                </div>
            </div>
        )
    }
    if(!current) return (<div className="customRoleTitle">暂未获取到数据</div>)
    return (
        <div style={{textAlign:'left',width:'548px'}}>

            <div style={{height:"25px",width:'1px'}}></div>
            <div className="customRoleTitle">本级管理员创建的角色</div>
            <OrgGroup {...current[0]} name={''}/>

            <div style={{height:"25px",width:'1px'}}></div>
            {inherit.length!=0?(<div className="customRoleTitle">上级管理员设定的角色</div>):null}
            {inherit.map((el,index)=><OrgGroup {...el} key={index}/>)}

            <div style={{height:"25px",width:'1px'}}></div>
        </div>
    )
}
