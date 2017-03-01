import React,{createClass} from 'react';
import { render } from 'react-dom'
import './dropdown.less'
const Dropdown = createClass({
    getInitialState(){
        const choosedOption = this.props.data[0]
        // this.props.choosed(choosedOption)

        return {visibleStatus:'none',zIndex:'1',choosedOption:choosedOption}
    },
    toggle(e){
        if(this.state.visibleStatus != ''){
            this.setState({'visibleStatus':'',zIndex:'99999'})
        }else{
            this.setState({'visibleStatus':'none',zIndex:'1'})
        }
    },
    close(e){
        this.setState({'visibleStatus':'none',zIndex:'1'})
    },
    render(){
        return(
            <div className="drop-down" style={{flex:'1'}}>
                <div style={{display: 'flex',visibility:'hidden'}} className="drop-down-choosed" onClick={this.toggle}>
                    <div className="choosed-text">{this.state.choosedOption.text}</div>
                    <div className="inverted-triangle">▼</div>
                </div>

                <table className="drop-down-table" style={{zIndex:this.state.zIndex}} >
                    <tbody>
                        <tr className="title-tr" style={{}}>
                            <td className="drop-down-choosed stop-propagation" onClick={this.toggle} style={{color:'black',display:'flex',justifyContent: 'space-between'}}>
                                <div className="choosed-text">{this.state.choosedOption.text}</div> <div className="inverted-triangle">▼</div>
                            </td>
                        </tr>
                        <tr className="drop-down-options" style={{display:this.state.visibleStatus}}>
                            <td>
                                {this.props.data.map((el,index)=>{
                                    return(
                                        <div 
                                            key={index} 
                                            className="drop-down-option" 
                                            onClick={
                                                (e)=>{
                                                    this.close(e)
                                                    this.setState({choosedOption:el})
                                                    this.props.choosed(el)
                                                }
                                            }
                                        >
                                            <div className="text-wrap">{el.text}</div>
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

