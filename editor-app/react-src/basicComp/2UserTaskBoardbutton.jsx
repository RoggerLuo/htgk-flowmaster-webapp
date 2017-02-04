import React,{createClass} from 'react';
import { render } from 'react-dom'

const UserTaskBoardbutton = ({status,change,close,openDialogue,dispatch})=>{
    const changeVisibility = (e) => {
        dispatch({type:change})
        // debugger
        e.stopPropagation()
        e.preventDefault()
    }
    const closeVisbility = ()=>{dispatch({type:close})}
    const option1 = (e)=>{
        dispatch({type:openDialogue})
        closeVisbility()
        e.stopPropagation()
        e.preventDefault()
    }
    const option2 = (e)=>{
        closeVisbility()
        e.stopPropagation()
        e.preventDefault()

    }
    const option3 = (e)=>{
        closeVisbility()
        e.stopPropagation()
        e.preventDefault()

    }
    return(
        <div className="boardbutton">
            <div className="mybutton" onClick={changeVisibility}>
                添加审批人员 <span className="inverted-triangle">▼</span>
            </div>
            <div className="myoption" style={{visibility:status}}>
                <div className="option" onClick={option1}>
                    选择发起人上级
                </div>                
                <div className="option" onClick={option2}>
                    选择机构角色
                </div>                
                <div className="option" onClick={option3}>
                    选择特定人员 
                </div>                
            </div>
        </div>
    )
}

/*
const Boardbutton = createClass({
    getInitialState(){
        let data = [
          {id: 1, author: "Pete Hunt", text: "This is one comment"},
          {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
        ];
       return {data: data, optionVisibility:'hidden'}
    },
    onBtnClick(){
        console.log('onBtnClick~'+data)
        let data=this.state.data.concat({text:textarea,author:'roger',id:Date.parse( new Date()) })
        this.setState({'data':data})
    },
    changeVisibility(){
        if(this.state.optionVisibility!='visible'){
            this.setState({optionVisibility:'visible'})
        }else{
            this.setState({optionVisibility:'hidden'})
        }
    },
    render(){
        return(
        <div className="boardbutton">
            <div className="mybutton" onClick={this.changeVisibility}>
                添加审批人员 <span className="inverted-triangle">▼</span>
            </div>
            <div className="myoption" style={{visibility:this.state.optionVisibility}}>
                <div className="option">
                    选择发起人上级
                </div>                
                <div className="option">
                    选择机构角色
                </div>                
                <div className="option">
                    选择特定人员 
                </div>                
            </div>
        </div>
        )
    }
})*/

export default UserTaskBoardbutton