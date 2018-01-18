import rolesJsonSpeller from './rolesJsonSpeller'
export default function(canvas) {
    rdx.getState().circulation.repo.forEach((repo) => {
        let currShape = fm.getNodeById(repo.id)
        if (!currShape) return
        const rolesjson = rolesJsonSpeller([], repo.data)
        // debugger
        let value = {
            "fields": [{
                "name": "circulationUsers",
                "implementation": "circulationUsers",
                "stringValue": JSON.stringify(rolesjson),
                "expression": "",
                "string": ""
            }]
        }

        currShape.setProperty('objData', rolesjson)
        currShape.setProperty('servicetaskexpression', "")
        currShape.setProperty('servicetaskfields', value)
        currShape.setProperty('servicetaskdelegateexpression', "${circulationServiceTask}")
        currShape.setProperty('classify', "Circulation")
        if (repo.previousNodeSpecified) {
            currShape.setProperty('previousNodeSpecified', true)
        }
    })
}