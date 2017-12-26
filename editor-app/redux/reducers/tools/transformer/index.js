import { toJS, fromJS, List, Map } from 'immutable'
import typeValidate from './typeValidate'
import updaterGenerator from './updaterGenerator'

export default function(data, ind) {
    return (op, path, item, type) => {
        //如果只是为了触发一下，新建注册一个repo
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