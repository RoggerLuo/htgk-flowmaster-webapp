import { toJS, fromJS, List, Map } from 'immutable'

export default (op, item) => {
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
            return (a) => a.delete(item)
        default:
            throw new  Error('你传的是什么鬼operation参数？？')
    }
}
