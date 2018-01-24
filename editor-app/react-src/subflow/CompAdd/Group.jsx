import React from 'react'
import List from './List'

export default class Group extends React.Component { 
    constructor(props) {
        super(props)
        this.state = { isOpen: false }
        this.click = this.click.bind(this)
    }
    click(event){
        this.setState({isOpen:!this.state.isOpen})
    }
    render(){
        let basicStyle = {position: 'relative', top:'-1px',cursor:'pointer',fontSize:'20px'}
        let style = Object.assign({},basicStyle,{transform: 'rotate(-90deg)'})
        if(this.state.isOpen) style = basicStyle            
        const index = this.props.index
        return (
            <div style={{margin:'5px 0'}}>                
                <div style={{lineHeight:'20px'}} onClick={this.click} >
                    <i style={style} className="icon iconfont icon-sanjiao1"></i> &nbsp;
                    <span style={{fontSize:'14px',cursor:'pointer'}}>{this.props.data.groupTitle}</span>
                </div>
                <div style={{height:'4px',width:'1px'}}></div>                
                {this.state.isOpen?this.props.data.data.map((el,ind) => 
                    (<List key={ind} index2={ind} index={index} {...el}/>)
                ):null}
            </div>)
    }
}
