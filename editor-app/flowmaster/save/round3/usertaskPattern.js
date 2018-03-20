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

        shape.setProperty('previousNodeSpecifiedSingle', !!repo.enableSingleSelect)
        shape.setProperty('previousNodeSpecified', !!repo.previousNodeSpecified)
        shape.setProperty('usertaskassignment', value)
        shape.setProperty('approveItems', getApproveItems(repo, shape))
        shape.setProperty('reduxData', repo)
        
        if(!fm.approve.is_display_prevShapeSpecify(shape,repo)){
            shape.setProperty('previousNodeSpecifiedSingle', false)
            shape.setProperty('previousNodeSpecified', false)
        }

    })
}