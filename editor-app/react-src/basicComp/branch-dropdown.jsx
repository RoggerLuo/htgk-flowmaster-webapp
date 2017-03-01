import React,{createClass} from 'react';
import { render } from 'react-dom'
import './branch-dropdown.less'

const Option = ({click,text}) =>{
    return (
        <div className="drop-down-option" onClick={click}>
            {text||'empty'}
        </div>
    )           
}

const Dropdown = ({options,choose,choosedText,display,toggle,close}) => {
    return (
        <div className="branch-dropdown" style={{flex:'1'}}>
            <div style={{display: 'flex'}} className="drop-down-choosed" onClick={toggle}>
                <div>{choosedText}</div> <div className="inverted-triangle"><i className="icon qingicon icon-sanjiao1"></i></div>
            </div>
            <table className="drop-down-table" style={{zIndex:'9999',width: '31.8%'}} >
                <tbody>
                    <tr style={{display:'none'}}>
                        <td className="drop-down-choosed stop-propagation" onClick={toggle} style={{color:'black',display:'flex',justifyContent: 'space-between'}}>
                            <div>{choosedText}</div> 
                            <div className="inverted-triangle">
                                <i className="icon qingicon icon-sanjiao1"></i>
                            </div>
                        </td>
                    </tr>
                    <tr className="drop-down-options" style={{display:display}}>
                        <td>
                            {options.map((el,index)=>{
                                return(<Option click={()=>{close();choose(index)}} text={el.text} key={index}/>)
                            })}
                        </td>                
                    </tr>    
                </tbody>
            </table>
            <div className="big-cover" style={{display:display}} onClick={close}></div>
        </div>
    )
}


const DropdownContainer = createClass({ 
    getInitialState(){
        return {
            display:'none',
        }
    },
    toggle(){
        if(this.state.display == 'none'){
            this.setState({display:''})
        }else{
            this.setState({display:'none'})
        }
    },
    close(){
        this.setState({display:'none'})
    },
    render(){        
        return (
            <Dropdown {...{options:this.props.options,choose:this.props.choose,choosedText:this.props.choosedText,display:this.state.display,toggle:this.toggle,close:this.close}}/>
        )
    }
})

export default DropdownContainer
