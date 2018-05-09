import React from 'react'
import Sf from './p'

class SfState extends React.Component { 
    constructor(props) {
        super(props)
    }
    componentWillMount(){
        this.props.selected(this.props.selectedOption)        
    }
    render(){
        const props = this.props
        return (<Sf {...props}/>)
    }
}
export default SfState