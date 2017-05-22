import React,{createClass} from 'react';
import { render } from 'react-dom'
import './branch-dropdown.less'

/* 单个下拉选项 */
const Option = ({click,text,put}) =>{
    return (
        <div className="drop-down-option" onClick={click}>
            <div className="inner-option">
                {put(text)}
            </div>
        </div>
    )           
}

/*
    视图只负责输出，
    技术上来说 text和value中，value都可以不需要的
    每个单个的dropdown视图需要一个container维护逻辑和数据(store in the redux store)
*/
const DropdownRaw = ({options,choose,choosedText,display,toggle,close,put,usePut}) => {
    if(!usePut){
        put = (value)=>value
    }
    return (
        <div className="branch-dropdown" style={{flex:'1'}}>
            <div style={{display: 'flex'}} className="drop-down-choosed" onClick={toggle}>
                <div style={{overflow: 'hidden'}}>{put(choosedText)}</div> <div className="inverted-triangle"><i className="icon iconfont icon-sanjiao1"></i></div>
            </div>
            <table className="drop-down-table" style={{zIndex:'9999',width: '32.3%'}} >
                <tbody>
                    <tr style={{display:'none'}}>
                        <td className="drop-down-choosed stop-propagation" onClick={toggle} style={{color:'black',display:'flex',justifyContent: 'space-between'}}>
                            <div>{put(choosedText)}</div> 
                            <div className="inverted-triangle">
                                <i className="icon iconfont icon-sanjiao1"></i>
                            </div>
                        </td>
                    </tr>
                    <tr className="drop-down-options" style={{display:display}}>
                        <td>
                            <div className="scrollbar" style={{overflow:'auto',maxHeight:'200px'}}>
                                {options.map((el,index)=>{
                                    el.index = index
                                    return(<Option click={()=>{close();choose(el)}} text={el.text} key={index} put={put}/>)
                                })}
                            </div>
                        </td>                
                    </tr>    
                </tbody>
            </table>
            <div className="big-cover" style={{display:display}} onClick={close}></div>
        </div>
    )
}

import connectPut from 'react-put'
const putOptions = {mapPropToDictionary: (props)=>window.reactI18n}
const Dropdown = connectPut(putOptions)(DropdownRaw)

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
            <Dropdown {...{usePut:this.props.usePut,options:this.props.options,choose:this.props.choose,choosedText:this.props.choosedText,display:this.state.display,toggle:this.toggle,close:this.close}}/>
        )
    }
})

export default DropdownContainer
