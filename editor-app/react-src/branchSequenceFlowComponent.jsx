import React,{createClass} from 'react';
import { render } from 'react-dom'
import Dropdown from './basicComp/Dropdown'
import DialoguePopup from './basicComp/DialoguePopup'
import SolidContainer from './basicComp/SolidContainer'
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

const optionMaker = (prototype,key1,key2,entryIndex)=>{
    const publicMethod = function(){
        const action = {
            type:'branchUpdate',
            groupIndex : key1,
            ruleIndex : key2,
            entryIndex
        }
        store.dispatch(action)
    }
    let options = prototype[entryIndex].map((el,index)=>{
        return {text:el.text,onClick:publicMethod}
    })
    return options
}

const Condition = ({prototype,entry1,entry2,entry3,input,key1,key2}) => {
    return (
        <div style={{border: '1px solid red',margin:'8px'}}>
            <div className="container-row">
                <Dropdown options={optionMaker(prototype,key1,key2,'entry1')} choosedOption={entry1}/>
                <Dropdown options={optionMaker(prototype,key1,key2,'entry2')} choosedOption={entry2}/>
                <Dropdown options={optionMaker(prototype,key1,key2,'entry3')} choosedOption={entry3}/>
            </div>    
            <div className="container-row-placeholder"></div>
            <div className="input-text-container">
                <input type='text' className="input-text" defaultValue={input} />
            </div>
        </div>
    )
}
const dropdownMode = () => {
    store.dispatch({type:'modeChange',value:'dropdown'})
}
const textMode = () => {
    store.dispatch({type:'modeChange',value:'text'})
}

const Component = ({conditionGroups,prototype,mode}) => {
    let content = ''
    if(mode == 'text'){
        content = (<div><textarea /></div>)
    }else{
        content = conditionGroups.map((el,index)=>{
                return (
                    <SolidContainer key={index}>
                        <div className="container-header">
                            <span className="container-title">条件{index+1}</span> <span>...</span>
                        </div>
                        {el.map((el2,index2)=>{
                            let and = ''
                            if(index2>=1){
                                and = (<div className="and">并且</div>)
                            }
                            return (
                                <div key={index2}>
                                    {and}
                                    <Condition {...el2} prototype={prototype} key1={index} key2={index2}/>
                                </div>
                            )
                        })}   
                    </SolidContainer>
                )
            })
    }
    return(
        <div className="react-approve" >
            <div className="section-title">条件设置</div>
            <div className="radio-box">
                <label className="radio-lable"><input onClick={dropdownMode} className="radio" name="condition" type="radio" value="" />手动选择 </label> 
                <label className="radio-lable"><input onClick={textMode} className="radio" name="condition" type="radio" value="" />编写公式 </label> 
            </div>
            满足以下条件则分支流向节点“#节点名称需要设置#”
            {content}
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

const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default function(){
    render(
        <Provider store={store}>
            <ComponentContainer />
        </Provider>
        ,
        document.getElementById('branchSequenceFlowComponent')
    );
}