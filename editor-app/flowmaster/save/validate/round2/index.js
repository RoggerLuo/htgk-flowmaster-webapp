import sf_name from './sf_name'
import sf_in_parallel from './sf_in_parallel'
import exclusive from './exclusive'
export default () => {
    return !fm.getNodes().some(shape => {

        /* 返回true说明验证不通过 */

        switch (fm.getTitle(shape)) {
            case 'Sequence flow':
                sf_in_parallel(shape)
                return sf_name(shape)

            case 'Exclusive gateway':
                return exclusive(shape)

            case 'Manual task':
            case 'User task':
                const ta = shape.properties.usertaskassignment
                if (!ta ||
                    (ta && ta.assignment && (ta.assignment.candidateOwners.length == 0))
                ) {
                    window.showAlert('"' + shape.properties['oryx-name'] + '"的审批人员设置不能为空') //审批节点
                    fm.spotlight(shape)
                    return true
                }
                break

            case 'Multi user task':
                const multi_parties = shape.properties.multiinstance_parties
                if (
                    (!multi_parties) ||
                    (multi_parties.length == 0) ||
                    ((multi_parties.length == 1) && (multi_parties[0] == 0))
                ) {
                    window.showAlert('"' + shape.properties['oryx-name'] + '"内容不能为空')
                    fm.spotlight(shape)
                    return true
                }
                break
            case 'Circulation task':
                const rolesjson = shape.properties.objData
                const zero = rolesjson && rolesjson.length == 0
                if (!rolesjson || zero) {
                    window.showAlert('"' + shape.properties['oryx-name'] + '"的传阅人员设置不能为空') //传阅节点
                    fm.spotlight(shape)
                    return true
                }
                break


            case 'Start event':
                if (shape.outgoing.length == 0) {
                    window.showAlert('请连接上开始节点')
                    fm.spotlight(shape)
                    return true
                } else {
                    return false
                }
                break
            case 'Parallel gateway':
                shape.setProperty('classify', 'ParallelGateway')
                break

            default:
                return false
        }

    })
}