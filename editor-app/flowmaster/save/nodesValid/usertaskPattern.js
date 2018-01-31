import rolesJsonSpeller from './rolesJsonSpeller'
import getApproveItems from './getApproveItems'

export default function(canvas, reduceName) {
    rdx.getState()[reduceName].repo.forEach((repo) => {
        if(!repo.id) return 
        let currShape = fm.getNodeById(repo.id)
        if (!currShape) return

        let value = {
            "assignment": {
                "candidateOwners": rolesJsonSpeller([], repo.data, currShape)
            }
        }

        currShape.setProperty('previousNodeSpecifiedSingle', !!repo.enableSingleSelect)
        currShape.setProperty('previousNodeSpecified', !!repo.previousNodeSpecified)
        currShape.setProperty('usertaskassignment', value)
        currShape.setProperty('approveItems', getApproveItems(repo, currShape))
        currShape.setProperty('reduxData', repo)
        
        if(!fm.approve.rule_not_display_last_node_specify(currShape,repo)){
            currShape.setProperty('previousNodeSpecifiedSingle', false)
            currShape.setProperty('previousNodeSpecified', false)
        }

    })
}