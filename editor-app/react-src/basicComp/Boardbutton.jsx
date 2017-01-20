import React,{createClass} from 'react';
import { render } from 'react-dom'

const jsonTpl={
    switch(){},
    visibilityStatus:'',
    title:'',
    options:[
        {
            onClick(){},
            text:''
        }
    ]
}

const Boardbutton = createClass({
    getInitialState(){
        return {visibleStatus:'hidden'}
    },
    toggle(){
        if(this.state.visibleStatus!=''){
            this.setState({visibleStatus:''})            
        }else{
            this.setState({visibleStatus:'hidden'})            
        }
    },
    close(){
        this.setState({visibleStatus:'hidden'})                    
    },
    render(){
        let myOptionStyle = {visibility:this.state.visibleStatus}
        if(this.props.position == "below"){
            myOptionStyle.display = 'block'
        }

        return(
            <div className="boardbutton">
                <div className="mybutton" onClick={this.toggle}>
                    {this.props.title} <span className="inverted-triangle">▼</span>
                </div>
                <div className="myoption" style={myOptionStyle} >
                    {this.props.options.map((el,index)=>{
                        return (
                            <div key={index} className="option" 
                                onClick={()=>{
                                    el.onClick()
                                    this.close()
                                }}
                            >
                                {el.text}
                            </div>                
                        )
                    })}
                </div>
                <div className="big-cover" style={myOptionStyle} onClick={this.close}></div>
            </div>
        )
    }
})
 // ({close,options,title,visibilityStatus,toggle,position})=>{

export default Boardbutton
