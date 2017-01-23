import React,{createClass} from 'react';
import { render } from 'react-dom'
import Dropdown from './basicComp/Dropdown'
import DialoguePopup from './basicComp/DialoguePopup'
import SoftContainer from './basicComp/SoftContainer'
// import UserTaskBoardbutton from './basicComp/UserTaskBoardbutton'
import Boardbutton from './basicComp/Boardbutton'
import CharactersList from './basicComp/CharactersList'
import store from '../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

const categoryDropdown = (props)=>{
    const publicMethod = function(){
        props.dispatch({type:'updateSuperDropDownChoosedOption','text':this.text})
    }
    const data = [{text:'字段'},{text:'发起人'},{text:'当前'}]
    const options = data.map((el)=>{
        el.onClick=publicMethod
        return el
    })
    return {
        props:{
            visibleStatus:props.superDropDownVisibilityStatus,
            choosedOption:props.superDropDownChoosedOption,
            options:options
        },
        init(){
            /* 不能放在纯函数组件里触发，就放在“模拟挂载”事件中触发 */
            if(data[0]){
                props.dispatch({type:'updateSuperDropDownChoosedOption','text':data[0].text})
            }else{
                props.dispatch({type:'updateSuperDropDownChoosedOption','text':''})
            }
        }   
    } 
}
const entryDropdown = (props)=>{
    const publicMethod = function(){
        props.dispatch({type:'updateSuperDropDownChoosedOption','text':this.text})
    }
    const data = [{text:'请选择'},{text:'二'},{text:'三'}]
    const options = data.map((el)=>{
        el.onClick=publicMethod
        return el
    })
    return {
        props:{
            visibleStatus:props.superDropDownVisibilityStatus,
            choosedOption:props.superDropDownChoosedOption,
            options:options
        },
        init(){
            /* 不能放在纯函数组件里触发，就放在“模拟挂载”事件中触发 */
            if(data[0]){
                props.dispatch({type:'updateSuperDropDownChoosedOption','text':data[0].text})
            }else{
                props.dispatch({type:'updateSuperDropDownChoosedOption','text':''})
            }
        }   
    } 
}
const symbolDropdown = (props)=>{
    const publicMethod = function(){
        props.dispatch({type:'updateSuperDropDownChoosedOption','text':this.text})
    }
    const data = [{text:'='},{text:'>'},{text:'<'},{text:'>='},{text:'<='}]
    const options = data.map((el)=>{
        el.onClick=publicMethod
        return el
    })
    return {
        props:{
            visibleStatus:props.superDropDownVisibilityStatus,
            choosedOption:props.superDropDownChoosedOption,
            options:options
        },
        init(){
            /* 不能放在纯函数组件里触发，就放在“模拟挂载”事件中触发 */
            if(data[0]){
                props.dispatch({type:'updateSuperDropDownChoosedOption','text':data[0].text})
            }else{
                props.dispatch({type:'updateSuperDropDownChoosedOption','text':''})
            }
        }   
    } 
}

const Button=(props)=>{
    return(
        <div className="boardbutton">
            <div className="mybutton" >
                添加规则
            </div>
        </div>
    )
}


const publicDropdown = (data)=>{
    const publicMethod = function(){
        // props.dispatch({type:'updateSuperDropDownChoosedOption','text':this.text})
    }
    let options = data.map((el,index)=>{
        return {text:el,onClick:publicMethod}
    })

    return {
        choosedOption:'字段',
        options:options
    }
       
}
const Condition = (props) => {
    return (
        <div className="container-row">
            <Dropdown {...publicDropdown(props.entry1)} choosedOption="字段"/>
            <Dropdown {...publicDropdown(props.entry2)} choosedOption="请选择"/>
            <Dropdown {...publicDropdown(props.entry3)} choosedOption="="/>
            <input type='text' className="input-text"/>
            <i className="icon qingicon icon-jian" style={{verticalAlign: 'middle'}}></i>
        </div>       
    )
}
// const ConditionBlock = (props) => {
//     return (
//         <SoftContainer>
//             <div className="container-header">
//                 <span className="container-title">条件1</span><Button />  
//             </div>       
//             <Condition />
//             <div className="and" style={{margin:'0px'}}>与</div>
//             <Condition />
//         </SoftContainer>
//     )
// }


const Approve = ({conditionGroups}) => {

    return(
        <div className="react-approve" >
            
            <div className="section-title">条件设置</div>
            <div className="radio-box">
                <label className="radio-lable"><input className="radio" name="condition" type="radio" value="" />手动选择 </label> 
                <label className="radio-lable"><input className="radio" name="condition" type="radio" value="" />编写公式 </label> 
            </div>
            {conditionGroups.map((el,index)=>{
                return (
                    <SoftContainer key={index}>
                        <div className="container-header">
                            <span className="container-title">条件{index}</span><Button />  
                        </div>
                        
                        
                        {el.map((el2,index2)=>{
                            let and = ''
                            if(index2>=1){
                                and = (<div className="and" style={{margin:'0px'}}>与</div>)
                            }
                            return (
                                <div key={index2}>
                                    {and}
                                    <Condition {...el2}/>
                                </div>
                            )
                        })}   

                    </SoftContainer>
                )
            })}
            

            <div className="addmoreContainer"><a className="addmore">添加多一会条件 >></a></div>
            
            <div className="section-title">说明：</div>
            <div className="content">
                条件与条件间是“或”的关系<br/>
                规则与规则间是“与”的关系
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.branch
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ApproveContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Approve)

export default function(){
    render(
        <Provider store={store}>
            <ApproveContainer />
        </Provider>
        ,
        document.getElementById('branchSequenceFlowComponent')
    );
}