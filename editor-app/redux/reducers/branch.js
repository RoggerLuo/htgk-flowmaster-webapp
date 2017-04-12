import {toJS,fromJS,List, Map} from 'immutable';

const newRule = () => {
    return {entry1:'字段',entry2:'请选择',entry3:'=',input:''}
}

let initial = {
    id:'',
    radio:'dropdown',
    conditionMode:'normal',
    dataRepo:[
        {
            id:'test',
            conditions:[
                [
                    {entry1:0,entry2:1,entry3:2,input:''},
                    {entry1:0,entry2:1,entry3:2,input:'',entry2template:[]},
                ],
                [
                    {entry1:0,entry2:1,entry3:2,input:''},
                ]
            ]
        }
    ],
    template:{
        entry1:{
            options:[
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
                {
                    value:'',
                    text:'请假天数'
                },
                {
                    value:'',
                    text:'职级'
                },
                {
                    value:'',
                    text:'条件'
                }
            ],
            click(){},
            defaultText:'请选择'
        },
        entry3:{
            options:[
                {
                    value:'=',
                    text:'='
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
            defaultText:'='
        }
    }
}

const environmentVariable =[{value:'date',text:'date'}]

const Reducer = (state = initial, action) => {
    const data = fromJS(state)
    switch (action.type) {
        case 'ruleOnInput':
            let repoIndex4 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            
            return data.updateIn(['dataRepo',repoIndex4,'conditions',action.key1,action.key2],'inital',(el)=>{
                return el.set('input',action.content)
            }).toJS()

        case 'branchUpdate':
            let repoIndex3 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            
            let dataRaw = data.updateIn(['dataRepo',repoIndex3,'conditions',action.groupIndex,action.ruleIndex],'inital',(el)=>{
                return el.set(action.entryIndex,action.value)
            })

            if(action.entryIndex == 'entry1'){
                switch(action.value.index){
                    case 0:
                        return dataRaw.updateIn(['dataRepo',repoIndex3,'conditions',action.groupIndex,action.ruleIndex],'inital',(el)=>{
                            return el.set('entry2template',fromJS(window.formProperties)).set('entry2',fromJS({index:'initial'}))
                        }).toJS()
                    break

                    case 1:
                        return dataRaw.updateIn(['dataRepo',repoIndex3,'conditions',action.groupIndex,action.ruleIndex],'inital',(el)=>{
                            return el.set('entry2template',fromJS(window.userProperties)).set('entry2',fromJS({index:'initial'}))
                        }).toJS()
                    case 2:
                        return dataRaw.updateIn(['dataRepo',repoIndex3,'conditions',action.groupIndex,action.ruleIndex],'inital',(el)=>{
                            return el.set('entry2template',fromJS(environmentVariable)).set('entry2',fromJS({index:'initial'}))
                        }).toJS()
                }
            }
            return dataRaw.toJS()

        case 'linkage':
            return data.updateIn(['template','entry2','options'], 'initial', (el) => {
                return action.options
            }).toJS()

        case 'initCondition':
            let initIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            if (!initIndex && (initIndex != 0) ) { //如果nextRepoIndex不存在
                const newCreate = fromJS({ id: state.id, conditions: [[{entry1:{index:'initial'},entry2:{index:'initial'},entry3:{index:'initial',value:"="},input:''}]] })
                return data.updateIn(['dataRepo'], 'initial', (el) => {
                    return el.push(newCreate)
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
            let repoIndex = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            if (!repoIndex && (repoIndex != 0) ) { //如果nextRepoIndex不存在
                const newCreate = fromJS({ id: state.id, conditions: [[{entry1:{index:'initial'},entry2:{index:'initial'},entry3:{index:'initial',value:"="},input:''}]] })
                return data.updateIn(['dataRepo'], 'initial', (el) => {
                    return el.push(newCreate)
                }).toJS()
            }
            return data.updateIn(['dataRepo',repoIndex],'initial',(el)=>{
                return el.set('conditions',el.get('conditions').push(fromJS([{entry1:{index:'initial'},entry2:{index:'initial'},entry3:{index:'initial',value:"="},input:''}])))
            }).toJS()

        case 'addRule':
            let repoIndex2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndex2,'conditions',action.index],'initial',(el)=>{
                return el.push( fromJS({entry1:{index:'initial'},entry2:{index:'initial'},entry3:{index:'initial',value:"="},input:''}) )
            }).toJS()

        case 'deleteCondition':
            let repoIndexDelete = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndexDelete,'conditions'],'inital',(el)=>{
                return el.delete(action.conditionIndex)
            }).toJS()

        case 'deleteRule':
            let repoIndexDelete2 = data.get('dataRepo').findKey((el, index, iter) => el.get('id') == state.id) //如果这里找不到会怎么样
            return data.updateIn(['dataRepo',repoIndexDelete2,'conditions',action.groupIndex],'inital',(el)=>{
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
