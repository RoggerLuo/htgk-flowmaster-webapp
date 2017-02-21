import React,{createClass} from 'react';
import { render } from 'react-dom'
import './branch-dropdown.less'

const Option = ({click,text}) =>{
    return (
        <div className="drop-down-option" onClick={click||function(){}}>
            {text||'empty'}
        </div>
    )           
}

const Dropdown = ({options,choose,choosedIndex}) => {
    let display = 'none'
    const toggle = () => {
        if(display == 'none'){
            display = ''
        }else{
            display = 'none'
        }
    }
    const close = () => {
        display = 'none'
    }
    const choosedText = options[choosedIndex].text
    // const choose = (text) => {
    //     choosedText = text
    // }
    return (
        <div className="branch-dropdown" style={{flex:'1'}}>
            <div style={{display: 'flex'}} className="drop-down-choosed" onClick={toggle}>
                <div>{choosedText}</div> <div className="inverted-triangle"><i className="icon qingicon icon-sanjiao1"></i></div>
            </div>
            <table className="drop-down-table" style={{zIndex:this.state.zIndex,width: '31.8%'}} >
                <tbody>
                    <tr style={{display:'none'}}>
                        <td className="drop-down-choosed stop-propagation" onClick={toggle} style={{color:'black',display:'flex',justifyContent: 'space-between'}}>
                            <div>{choosedText}</div> <div className="inverted-triangle"><i className="icon qingicon icon-sanjiao1"></i></div>
                        </td>
                    </tr>
                    <tr className="drop-down-options" style={{display:display}}>
                        <td>
                            {options.map((el,index)=>{
                                return(<Option click={choose} text={el.text}/>)
                            })}
                        </td>                
                    </tr>    
                </tbody>
            </table>
            <div className="big-cover" style={{display:display}} onClick={close}></div>
        </div>
    )
}

export default Dropdown
