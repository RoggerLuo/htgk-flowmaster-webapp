import rolesJsonSpeller from './rolesJsonSpeller'
export default function(canvas) {
    
    const circulation = window.reduxStore.getState().circulation
    circulation.repo.forEach((repoObj) => {
        let currentElement = canvas.getChildShapeByResourceId(repoObj.id)
        if (repoObj.id && !currentElement) return
        let jsonArray = []
        jsonArray = rolesJsonSpeller(jsonArray,repoObj.data)

        let value = {
            "fields": [
                {
                    "name": "circulationUsers",
                    "implementation": "circulationUsers",
                    "stringValue": JSON.stringify(jsonArray),
                    "expression": "",
                    "string": ""
                }
            ]                
        }

        currentElement.setProperty('objData', jsonArray)
        currentElement.setProperty('servicetaskexpression', "")

        currentElement.setProperty('servicetaskfields', value)
        currentElement.setProperty('servicetaskdelegateexpression', "${circulationServiceTask}")
        currentElement.setProperty('classify', "Circulation")
        if(repoObj.previousNodeSpecified){
            currentElement.setProperty('previousNodeSpecified', true)
        }
    })
}