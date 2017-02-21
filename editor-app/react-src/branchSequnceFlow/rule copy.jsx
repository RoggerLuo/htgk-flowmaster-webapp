import React,{createClass} from 'react';
import Dropdown from '../basicComp/branch-dropdown'
import store from '../../redux/configureStore.js'


// const optionMaker = (prototype,key1,key2,entryIndex)=>{
//     const publicMethod = function(){
//         const action = {
//             type:'branchUpdate',
//             groupIndex : key1,
//             ruleIndex : key2,
//             entryIndex
//         }
//         store.dispatch(action)
//     }
//     let options = prototype[entryIndex].map((el,index)=>{
//         return {text:el.text,onClick:publicMethod}
//     })
//     return options
// }
// const deleteRule = (groupIndex,ruleIndex) =>{
//     const action = {
//         type:'deleteRule',
//         groupIndex,
//         ruleIndex
//     }
//     store.dispatch(action)
// }

dropdown:[
    {
        options:[],
        text:''
    }
]
const Rule = ({dropdown,ruleMode,del}) => { //,key1,key2
    let border = '1px solid white'
    let display = 'none'
    if(ruleMode=='delete'){
        border = '1px solid #dde4ef'
        display = ''
    }else{
        border = '1px solid white'
        display = 'none'
    }
    return (
        <div className="delete-frame" style={{border:border}}>
            <div className="container-row">
                {dropdown.map((el,index)=>{
                    return (<Dropdown options={el.options} choosedText={el.text}/>)
                })}
                <i className="icon qingicon icon-guanbi2fill icon-red-close-for-rule" 
                    onClick={del}
                    style={{display:display}}>
                </i>
            </div>    
            <div className="container-row-placeholder"></div>
            <div className="input-text-container">
                <input type='text' className="input-text" defaultValue={input} />
            </div>
        </div>
    )
}

/* 相当于两层container */
/* 这一层的目的是为了 放置del函数的逻辑 */
const RuleContainer = ({key1,key2,dispatch,ruleMode,dropdown}) =>{
    const del = () => {dispatch({type:'deleteRule',groupIndex:key1,ruleIndex:key2})}
    return (<Rule {...{dropdown,ruleMode,del}} />)
}

const mapStateToProps = (state) => {
    const ruleMode = state.branch.ruleMode
    const dropdown = ''
    return {ruleMode,dropdown}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
const RuleContainer2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(RuleContainer)

export default RuleContainer2


