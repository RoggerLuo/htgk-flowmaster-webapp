import React,{createClass} from 'react'

class Comp extends React.Component { 
    constructor(props) {
        super(props)
        this.click = this.click.bind(this)
    }
    click(event){
    }
    render(){
        return (
            <div className="input-text-container">
                <input onClick={this.click} ref='myInput' type='text' className="input-text" value={this.props.value} onChange={this.props.oninput}/>
            </div>
        )
    }
}

export default Comp

