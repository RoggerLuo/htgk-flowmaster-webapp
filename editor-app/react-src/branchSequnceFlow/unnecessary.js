
// const categoryDropdown = (props)=>{
//     const publicMethod = function(){
//         props.dispatch({type:'updateSuperDropDownChoosedOption','text':this.text})
//     }
//     const data = [{text:'字段'},{text:'发起人'},{text:'当前'}]
//     const options = data.map((el)=>{
//         el.onClick=publicMethod
//         return el
//     })
//     return {
//         props:{
//             visibleStatus:props.superDropDownVisibilityStatus,
//             choosedOption:props.superDropDownChoosedOption,
//             options:options
//         },
//         init(){
//             /* 不能放在纯函数组件里触发，就放在“模拟挂载”事件中触发 */
//             if(data[0]){
//                 props.dispatch({type:'updateSuperDropDownChoosedOption','text':data[0].text})
//             }else{
//                 props.dispatch({type:'updateSuperDropDownChoosedOption','text':''})
//             }
//         }   
//     } 
// }
// const entryDropdown = (props)=>{
//     const publicMethod = function(){
//         props.dispatch({type:'updateSuperDropDownChoosedOption','text':this.text})
//     }
//     const data = [{text:'请选择'},{text:'二'},{text:'三'}]
//     const options = data.map((el)=>{
//         el.onClick=publicMethod
//         return el
//     })
//     return {
//         props:{
//             visibleStatus:props.superDropDownVisibilityStatus,
//             choosedOption:props.superDropDownChoosedOption,
//             options:options
//         },
//         init(){
//             /* 不能放在纯函数组件里触发，就放在“模拟挂载”事件中触发 */
//             if(data[0]){
//                 props.dispatch({type:'updateSuperDropDownChoosedOption','text':data[0].text})
//             }else{
//                 props.dispatch({type:'updateSuperDropDownChoosedOption','text':''})
//             }
//         }   
//     } 
// }
// const symbolDropdown = (props)=>{
//     const publicMethod = function(){
//         props.dispatch({type:'updateSuperDropDownChoosedOption','text':this.text})
//     }
//     const data = [{text:'='},{text:'>'},{text:'<'},{text:'>='},{text:'<='}]
//     const options = data.map((el)=>{
//         el.onClick=publicMethod
//         return el
//     })
//     return {
//         props:{
//             visibleStatus:props.superDropDownVisibilityStatus,
//             choosedOption:props.superDropDownChoosedOption,
//             options:options
//         },
//         init(){
//             /* 不能放在纯函数组件里触发，就放在“模拟挂载”事件中触发 */
//             if(data[0]){
//                 props.dispatch({type:'updateSuperDropDownChoosedOption','text':data[0].text})
//             }else{
//                 props.dispatch({type:'updateSuperDropDownChoosedOption','text':''})
//             }
//         }   
//     } 
// }
