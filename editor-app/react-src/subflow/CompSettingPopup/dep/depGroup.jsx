import React from 'react'

class Group extends React.Component { 
    constructor(props) {
        super(props)
        this.state = { isOpen: false }
        this.click = this.click.bind(this)
    }
    click(event){
        this.setState({isOpen:!this.state.isOpen})
        // const keyCode = event.keyCode
    }
    render(){
        let style = {cursor:'pointer',fontSize:'20px', transform: 'rotate(-90deg)'}
        if(this.state.isOpen) {
            style = {cursor:'pointer',fontSize:'20px'}
        }
        const index = this.props.index
        return (<div onClick={this.click} style={{cursor:'pointer'}}>
            <i style={style} className="icon iconfont icon-sanjiao1"></i>
            {this.props.data.title}
            {this.state.isOpen?this.props.data.data.map((el,ind) => <List key={ind} index2={ind} index={index} text={el.text}/>):null}
        </div>)
    }
}
export default Group
