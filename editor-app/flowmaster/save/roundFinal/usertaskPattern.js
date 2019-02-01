import rolesJsonSpeller from './rolesJsonSpeller'
import getApproveItems from './getApproveItems'
export default function(reduceName) {
    rdx.getState()[reduceName].repo.forEach((repo) => {
        if(!repo.id) return 
        let shape = fm.getNodeById(repo.id)
        if (!shape) return

        let value = {
            "assignment": {
                "candidateOwners": rolesJsonSpeller([], repo.data, shape)
            }
        }
        let approveItems = getApproveItems(repo, shape)
        if(fm.backToLastNotAvailable(shape)) {
            approveItems = approveItems.filter(item=>item.code != "Back")
        }
        shape.setProperty('previousNodeSpecified', !!repo.previousNodeSpecified)            
        shape.setProperty('previousNodeSpecifiedSingle', !!repo.enableSingleSelect)
        shape.setProperty('usertaskassignment', value)
        shape.setProperty('approveItems',approveItems)
        shape.setProperty('reduxData', repo)

        shape.setProperty('hasProcessTimeOut', !!repo.hasProcessTimeOut )            
        shape.setProperty('processTime', repo.processTime)
        shape.setProperty('rangeTalkTime', repo.rangeTalkTime)

        if(!fm.approve.is_display_prevShapeSpecify(shape,repo)){
            shape.setProperty('previousNodeSpecifiedSingle', false)
            shape.setProperty('previousNodeSpecified', false)
        }
    })
}
