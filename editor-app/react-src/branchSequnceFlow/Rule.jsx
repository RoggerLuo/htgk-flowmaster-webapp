import React,{createClass} from 'react';
import Dropdown from '../basicComp/Dropdown'
import store from '../../redux/configureStore.js'


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
const deleteRule = (groupIndex,ruleIndex) =>{
    const action = {
        type:'deleteCondition',
        groupIndex,
        ruleIndex
    }
    store.dispatch(action)
}

const Rule = ({prototype,entry1,entry2,entry3,input,key1,key2}) => {
    return (
        <div className="delete-frame">
            <div className="close-wrap">
                <i className="icon qingicon icon-guanbi2fill icon-red-close-for-rule" onClick={()=>{deleteRule(key1,key2)}}></i>
            </div>
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
export default Rule