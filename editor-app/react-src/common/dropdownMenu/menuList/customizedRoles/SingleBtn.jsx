import React,{createClass} from 'react'

export default class SingleBtn extends React.Component { 
    constructor(props) {
        super(props)
        this.toggleView = this.toggleView.bind(this)
        this.state = {choosed:false}
    }
    toggleView(id,name,selected){
        // this.setState({choosed:!this.state.choosed})
        this.props.onclick(id,name,!selected) //this.state.choosed
    }
    render(){
        let className = "customRoleSingleBtn"
        const selected = this.props.selectedRoles.some(role=>{
            return role.value == this.props.id
        })

        if(selected) className = 'customRoleSingleBtnActive' //this.state.choosed

        return (
            <div 
                className={className} 
                onClick={()=>this.toggleView(this.props.id,this.props.name,selected)}
            >
                <div style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        maxWidth: '100px',
                        display:'inline-block'
                    }}
                >
                    {this.props.name}
                </div>
            </div>
        )
    }
}
