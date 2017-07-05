/*
    dropdown的默认值无法直接手动添加
    实现方式是:
        在mutate dropdown options数据的时候[通过一个redux action]
        同时更新 选中值(默认值)
*/
import React,{createClass} from 'react'
import { render } from 'react-dom'
import './dropdown.less'
const Dropdown = createClass({
    getInitialState(){
        const choosedOption = this.props.data[0]
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
        let color={}
        if(this.state.visibleStatus!='none'){
            color={color:'#00b0ff'}
        }
        
        return(
            <div className="drop-down" style={{flex:'1'}}>
                <div style={{width: this.props.width||'152px',display: 'flex',visibility:'hidden'}} className="drop-down-choosed" onClick={this.toggle}>
                    <div className="choosed-text">{this.props.choosedOption && this.props.choosedOption.text}</div>
                    <div className="inverted-triangle" style={color}></div>
                </div>

                <table className="drop-down-table" style={{zIndex:this.state.zIndex}} >
                    <tbody>
                        <tr className="title-tr" style={{}}>
                            <td className="drop-down-choosed stop-propagation" onClick={this.toggle} style={{width: this.props.width||'152px',color:'black',display:'flex',justifyContent: 'space-between'}}>
                                <div className="choosed-text">{this.props.choosedOption && this.props.choosedOption.text}</div> <div className="inverted-triangle"></div>
                            </td>
                        </tr>
                        <tr className="drop-down-options" style={{display:this.state.visibleStatus}}>
                            <td><div style={{maxHeight: '192px',overflow: 'auto'}} className="scrollbar">
                                {this.props.data.map((el,index)=>{
                                    
                                    let className="text-wrap "
                                    if(el.value == (this.props.choosedOption && this.props.choosedOption.value)){
                                        className="text-wrap checkok"
                                    }

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
                                            <div className={className}>{el.text}</div>
                                        </div>                                                    
                                    )
                                })}
                            </div></td>                
                        </tr>    
                    </tbody>
                </table>
                <div className="big-cover" style={{display:this.state.visibleStatus}} onClick={this.close}></div>
            </div>
        )
    }
})
export default Dropdown

