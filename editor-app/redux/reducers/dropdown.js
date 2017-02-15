import { toJS, fromJS, List, Map } from 'immutable';

const initial = {
    dropdown1:{text:'initial',value:'initial'},
    dropdown2:{text:'initial',value:'initial'}
}

const Reducer = (state = initial, action) => {
    let data = fromJS(state)
    switch (action.type) {
        case 'dropdown1Choose':
            return data.updateIn(['dropdown1'],'initial',(el)=>{
                return action.item 
            }).toJS()
        case 'dropdown2Choose':
            return data.updateIn(['dropdown2'],'initial',(el)=>{
                return action.item 
            }).toJS()
            
    
        // case 'switchApproveData':            
        //     let nextRepoIndex = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == action.nextId) //如果这里找不到会怎么样
        //     if (!nextRepoIndex && (nextRepoIndex!=0) ) { //如果nextRepoIndex不存在

        //         data = data.updateIn(['approveListRepo'], 'inital', (el) => {
        //             return el.push(replace)
        //         })
        //         //更新index
        //         nextRepoIndex = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == action.nextId) //如果这里找不到会怎么样
        //     }
                       
        //     if(action.prevId){//如果是最开始,没有选择元素，prevId为false，那就不用保存

        //         // 判断repo中prevId存不存在
        //         let prevRepoIndex = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == action.prevId) //如果这里找不到会怎么样
        //         if (!prevRepoIndex && (nextRepoIndex!=0)) { //不存在 就创建一个
        //             data = data.updateIn(['approveListRepo'], 'inital', (el) => {
        //                 const newone = Map().set('id',action.prevId).set('data',List())
        //                 return el.push(newone)
        //             })
        //             // 更新值
        //             prevRepoIndex = data.get('approveListRepo').findKey((el, index, iter) => el.get('id') == action.prevId) //如果这里找不到会怎么样
        //         }

        //         // 保存
        //         //直接用index找到那个元素，并替换来保存
        //         data = data.updateIn(['approveListRepo', prevRepoIndex], 'inital', (el) => {
        //             return el.set('data',(data.getIn(['approveList','data'])))
        //         })
        //     }
            
        //     // 更新
        //     return data.set('approveList',data.getIn(['approveListRepo',nextRepoIndex])).toJS()

        // case 'pushApproveList':
        //     let flag = state.approveList.data.some((el, index) => {
        //         if (el.text == action.item.text) {
        //             alert('已经存在"' + action.item.text + '"的选项')
        //             return true
        //         }
        //     })
        //     if (flag) {
        //         return state 
        //     }
                        
        //     return Object.assign({}, state, {
        //         approveList: {id:state.approveList.id,data:state.approveList.data.concat([action.item])}
        //     })
        default:
            return state
    }
}

export default Reducer
