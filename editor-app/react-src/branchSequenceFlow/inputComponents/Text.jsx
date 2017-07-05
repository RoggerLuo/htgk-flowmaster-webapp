import React,{createClass} from 'react'

class Comp extends React.Component { 
    constructor(props) {
        super(props)
        // this.click = this.click.bind(this)
    }
    // click(event){
    // }
    render(){
        const value = this.props.value
        const oninput = this.props.oninput
        
        return (
            <div className="input-text-container">
                <input ref='myInput' type='text' className="input-text" value={value} onChange={oninput}/>
            </div>
        )
    }
}

export default Comp

