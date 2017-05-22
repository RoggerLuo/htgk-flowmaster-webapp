import {toJS,fromJS,List, Map} from 'immutable';

/*
    entry2template 是
*/
let initial = {
    environmentVariable:[{value:'date',text:'date'}],
    formProperties:[],
    userProperties:[],
    id:'',
    radio:'dropdown',
    conditionMode:'normal',
    dataRepo:[
        /*
        {
            id:'test',
            radio:false,
            text:'',
            conditions:[
                {
                    data:[
                       {entry1:{},entry2:{},entry3:{},input:''},
                    ],
                    ruleMode:'normal'
                },
            ]
        }
        */
    ],
    template:{
        entry1:{
            options:[
                {
                    value:'initial',
                    text:'pleaseChoose'
                },

                {
                    value:'',
                    text:'form.properties'
                },
                {
                    value:'',
                    text:'user.properties'
                },
                {
                    value:'',
                    text:'e.properties'
                }

            ],
            click(){},
            defaultText:'pleaseChoose'
        },
        entry2:{
            options:[
                {text:'请选择',value:'initial'}
                // {
                //     value:'',
                //     text:'请假天数'
                // },
                // {
                //     value:'',
                //     text:'职级'
                // },
                // {
                //     value:'',
                //     text:'条件'
                // }
            ],
            click(){},
            defaultText:'请选择'
        },
        entry3:{
            options:[
                {
                    value:'initial',
                    text:'请选择'
                },
                {
                    value:'==',
                    text:'=='
                },
                {
                    value:'>',
                    text:'>'
                },
                {
                    value:'<',
                    text:'<'
                },
                {
                    value:'>=',
                    text:'>='
                },
                {
                    value:'<=',
                    text:'<='
                },
                {
                    value:'!=',
                    text:'!='
                },
            ],
            click(){},
            defaultText:'请选择'
        }
    }
}

// const environmentVariable =[{value:'date',text:'date'}]


const newOption = () => {
    return {text:'请选择',value:'initial',index:'initial'}
}
const newRule = () => {
    /* 
        创建的时候就指定了默认值 
    */

    return {
        entry1:{text:'pleaseChoose',value:'initial',index:'initial'},
        entry2:{text:'请选择',value:'initial',index:'initial'},
        entry3:{text:'请选择',index:'initial',value:"initial"},
        input:''
    }
}
const newCreate = (state) => {
    return { 
        id: state.id, 
        conditions: [
            {
                data:[
                    newRule()
                ],
                ruleMode:'normal'
            }
        ]
    }
}


const Reducer = (state = initial, action) => {
    const data = fromJS(state)
    switch (action.type) {
        /* 清空某个sequenceflow */
        case 'clearSFData':
            let clearIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == action.id) 
            return data.updateIn(['dataRepo',clearIndex,'conditions'],'initial',(el)=>{
                return fromJS([
                    {
                        data:[
                            newRule()
                        ],
                        ruleMode:'normal'
                    }
                ])
            }).toJS()

        /* 清空某个sequenceflow */

        /* 加载 表单字段 和 用户字段 时 */
        case 'updateFormProperties':
            return data.updateIn(['formProperties'], 'initial', (el) => {
                return action.data
            }).toJS()

        case 'updateUserProperties':
            return data.updateIn(['userProperties'], 'initial', (el) => {
                return action.data
            }).toJS()
        /* 加载 表单字段 和 用户字段 时 */

        /* 改变每个condition的rule删除模式 */
        case 'allRuleModeEQdelete':
            let allRuleModeEQdeleteIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            return data.updateIn(['dataRepo',allRuleModeEQdeleteIndex,'conditions',action.index],'initial',(el)=>{ 
                return el.set('ruleMode','delete')
            }).toJS()
        case 'allRuleModeEQnormal':
            let allRuleModeEQdeleteIndex2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            return data.updateIn(['dataRepo',allRuleModeEQdeleteIndex2,'conditions',action.index],'initial',(el)=>{ 
                return el.set('ruleMode','normal')
            }).toJS()
        /* 改变每个condition的rule删除模式 */


        case 'radioTextChange':
            let repoIndexRadio2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            
            return data.updateIn(['dataRepo',repoIndexRadio2],'initial',(el)=>{
                return el.set('text',action.text)//false or true
            }).toJS()
        case 'radioChange':
            let repoIndexRadio = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            return data.updateIn(['dataRepo',repoIndexRadio],'initial',(el)=>{
                return el.set('radio',action.radio)
            }).toJS()

        case 'switchElement':
            return data.updateIn(['id'], 'initial', (el) => {
                return action.nextId
            }).toJS()

        case 'sequenceDataInit':
            return data.updateIn(['dataRepo'], 'initial', (el) => {
                return el.push(fromJS(action.data))
            }).toJS()

        case 'ruleOnInput':
            let repoIndex4 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            
            return data.updateIn(['dataRepo',repoIndex4,'conditions',action.key1,'data',action.key2],'initial',(el)=>{
                return el.set('input',action.content)
            }).toJS()


        /* 下拉框选择触发事件 */
        case 'branchUpdate':
            let repoIndex3 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            let dataRaw = data.updateIn(['dataRepo',repoIndex3,'conditions',action.groupIndex,'data',action.ruleIndex],'initial',(el)=>{
                return el.set(action.entryIndex,action.value)
            })

            if(action.entryIndex == 'entry1'){
                /*
                    第一个下拉选了之后动态改变第二个下拉
                    !!同时设置第二个下拉的默认值!!
                */
                switch(action.value.index){
                    case 0:
                        return dataRaw.updateIn(['dataRepo',repoIndex3,'conditions',action.groupIndex,'data',action.ruleIndex],'initial',(el)=>{
                            /*
                                这里更新了默认值
                                更新默认选项的逻辑比较散，如何优化
                            */
                            return el.set('entry2template','0' ).set('entry2',fromJS(newOption()))
                        }).toJS()
                    case 1:
                        return dataRaw.updateIn(['dataRepo',repoIndex3,'conditions',action.groupIndex,'data',action.ruleIndex],'initial',(el)=>{
                            return el.set('entry2template','1' ).set('entry2',fromJS(newOption()))
                        }).toJS()
                    break

                    case 2:
                        return dataRaw.updateIn(['dataRepo',repoIndex3,'conditions',action.groupIndex,'data',action.ruleIndex],'initial',(el)=>{
                            return el.set('entry2template','2').set('entry2',fromJS(newOption()))
                        }).toJS()

                    case 3:
                        return dataRaw.updateIn(['dataRepo',repoIndex3,'conditions',action.groupIndex,'data',action.ruleIndex],'initial',(el)=>{
                            return el.set('entry2template','3').set('entry2',fromJS(newOption()))
                        }).toJS()
                }
            }
            return dataRaw.toJS()


        case 'linkage':
            return data.updateIn(['template','entry2','options'], 'initial', (el) => {
                return action.options
            }).toJS()

        case 'initCondition':
            let initIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            
            if (!initIndex && (initIndex != 0) ) { //如果nextRepoIndex不存在
                
                return data.updateIn(['dataRepo'], 'initial', (el) => {
                    return el.push(fromJS(newCreate(state)))
                }).toJS()
            }
            return state

        case 'switchRadio':
            return Object.assign({}, state, {
                radio:action.value
            })

        case 'switchApproveData':
            return data.updateIn(['id'], 'initial', (el) => {
                return action.nextId
            }).toJS()

        case 'conditionDeleteMode':
            return Object.assign({}, state, {
                conditionMode:'delete'
            })

        case 'closeConditionDeleteMode':
            return Object.assign({}, state, {
                conditionMode:'normal'
            })

        case 'addCondition':
            let repoIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            if (!repoIndex && (repoIndex != 0) ) { //如果nextRepoIndex不存在
                return data.updateIn(['dataRepo'], 'initial', (el) => {
                    return el.push(fromJS(newCreate(state)))
                }).toJS()
            }
            return data.updateIn(['dataRepo',repoIndex],'initial',(el)=>{
                
                return el.set('conditions',el.get('conditions').push(fromJS({
                        data:[
                            newRule()
                            // {entry1:newOption(),entry2:newOption(),entry3:{index:'initial',value:"=="},input:''}
                        ],
                        ruleMode:'normal'
                    }
                )))

            }).toJS()

        case 'addRule':
            let repoIndex2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            return data.updateIn(['dataRepo',repoIndex2,'conditions',action.index,'data'],'initial',(el)=>{
                return el.push( fromJS(newRule()) )
            }).toJS()

        case 'deleteCondition':
            let repoIndexDelete = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            return data.updateIn(['dataRepo',repoIndexDelete,'conditions'],'initial',(el)=>{
                return el.delete(action.conditionIndex)
            }).toJS()

        case 'deleteRule':
            let repoIndexDelete2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) 
            return data.updateIn(['dataRepo',repoIndexDelete2,'conditions',action.groupIndex,'data'],'initial',(el)=>{
                return el.delete(action.ruleIndex)
            }).toJS()

        case 'modeChange':
            return Object.assign({}, state, {
                mode: action.value
            })
        default:
            return state
    }
}

export default Reducer
