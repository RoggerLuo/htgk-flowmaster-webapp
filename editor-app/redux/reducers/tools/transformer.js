import { toJS, fromJS, List, Map } from 'immutable'

const replaceFunction = (op) => {
    switch (op) {
        case 'replace':
            return (el) => item
        case 'add':
            return (el) => {
                if (!List.isList(el)) throw new  Error('不是数组 不能使用add operation')
                el.push(item)
            }
        case 'delete':
            return (el) => el.push(item)
        default:
            throw new  Error('你传的是什么鬼operation参数？？')
    }
}
const checkType = (type) => {
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
export default function(data) {
    return (op, path, item, type) => {
        if (!(path instanceof Array)) throw new  Error('Whoops! 输入的path不是数组，脑子秀逗了吧')
        checkType(type)
        item = fromJS(item)
        const dataPath = ['repo']
        dataPath.push(...path)
        return data.updateIn(dataPath, '', replaceFunction(op)).toJS() //fromJS(initialValue)
    }
}