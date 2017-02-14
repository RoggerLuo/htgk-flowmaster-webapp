import React,{createClass} from 'react';
import { render } from 'react-dom'


const Dropdown = createClass({
    getInitialState(){
        // let choosedOption = this.props.choosedOption
        // choosedOption = this.props.options[0]?this.props.options[0].text:''
        return {visibleStatus:'none',zIndex:'1',choosedOption:this.props.choosedOption}
    },
    toggle(e){
        // this.publicOnClick(e)
        if(this.state.visibleStatus != ''){
            this.setState({'visibleStatus':'',zIndex:'99999'})
        }else{
            this.setState({'visibleStatus':'none',zIndex:'1'})
        }
    },
    close(e){
        this.setState({'visibleStatus':'none',zIndex:'1'})
        this.publicOnClick(e)
    },
    publicOnClick(e){
        // e.stopPropagation()
        // e.preventDefault()
        // choosedOption
    },
    // <div className="drop-down-placeholder">
    //     {this.state.choosedOption}
    // </div>

    render(){
        // let hiddenFirstTr = true
        // if(this.state.visibleStatus == ''){//打开的情况下
            // hiddenFirstTr = {visibility:'hidden'}
        // }else{
        //     hiddenFirstTr = {visibility:'visible'}
        // }
        return(
            <div className="drop-down" style={{flex:'1'}}>
                <div style={{display: 'flex'}} className="drop-down-choosed" onClick={this.toggle}>
                    <div>{this.state.choosedOption}</div> <div className="inverted-triangle">▼</div>
                </div>
                <table className="drop-down-table" style={{zIndex:this.state.zIndex,width: '31.8%'}} >
                    <tbody>
                        <tr style={{display:'none'}}>
                            <td className="drop-down-choosed stop-propagation" onClick={this.toggle} style={{color:'black',display:'flex',justifyContent: 'space-between'}}>
                                <div>{this.state.choosedOption}</div> <div className="inverted-triangle">▼</div>
                            </td>
                        </tr>
                        <tr className="drop-down-options" style={{display:this.state.visibleStatus}}>
                            <td>
                                {this.props.options.map((el,index)=>{
                                    return(
                                        <div 
                                            key={index} 
                                            className="drop-down-option" 
                                            onClick={
                                                (e)=>{
                                                    el.onClick(e)
                                                    this.close(e)
                                                    this.setState({choosedOption:el.text})
                                                }
                                            }
                                        >
                                            {el.text}
                                        </div>                                                    
                                    )
                                })}
                            </td>                
                        </tr>    
                    </tbody>
                </table>
                <div className="big-cover" style={{display:this.state.visibleStatus}} onClick={this.close}></div>
            </div>
        )
    }
})

export default Dropdown
