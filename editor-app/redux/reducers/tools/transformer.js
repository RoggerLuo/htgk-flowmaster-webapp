import { toJS, fromJS, List, Map } from 'immutable'

const updaterGenerator = (op, item) => {
    item = fromJS(item)
    switch (op) {
        case 'replace':
            return (el) => item
        case 'add':
            return (el) => {
                if (!List.isList(el)) throw new  Error('不是数组 不能使用add operation')
                return el.push(item)
            }
        case 'delete':
            Error('delete未实现')
            return (el) => el.push(item)
        default:
            throw new  Error('你传的是什么鬼operation参数？？')
    }
}
const typeValidate = (type, item) => {
    if (type) { // 传入type的话，就自动校验, 针对数据结构复杂的情况
        switch (type) {
            case 'array':
                if (!(item instanceof Array)) {
                    throw new  Error(`传入reduce数据类型错误，应该是${type}，却不是${type}`)
                }
                break

            case 'string':
            case 'object':
            case 'boolean':
                if (typeof(item) != type) {
                    throw new  Error(`传入reduce数据类型错误，应该是${type}，却不是${type}`)
                }
                break
        }
    }
}

export default function(data, ind) {
    return (op, path, item, type) => {
        if(op == 'touch') return data.toJS()
        typeValidate(type, item)

        const updater = updaterGenerator(op, item)

        const dataPath = ['repo', ind]
        if (!(path instanceof Array)) throw new  Error('Whoops! 输入的path不是数组，脑子秀逗了吧')
        dataPath.push(...path)

        if(op == 'add') return data.updateIn(dataPath, List(), updater).toJS()            
        return data.updateIn(dataPath, '', updater).toJS()
    }
}