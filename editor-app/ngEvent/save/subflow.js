import rolesJsonSpeller from './rolesJsonSpeller'

export default function(canvas) {
    const subflow = window.reduxStore.getState().subflow
    subflow.repo.forEach((repoObj) => {
        let currentElement = canvas.getChildShapeByResourceId(repoObj.id)
        if (repoObj.id && !currentElement) return
        let jsonArray = []
        // jsonArray = rolesJsonSpeller(jsonArray, repoObj.data)
        const subProcessSet = {
            "subProcessSet": [repoObj.subProcess]
        }
        let value = {
            "fields": [{
                    "name": "subProcessSet",
                    "implementation": "subProcessSet",
                    "stringValue": JSON.stringify(subProcessSet),
                    "expression": "",
                    "string": ""
                },
                {
                    "name": "waitExpression",
                    "implementation": "waitExpression",
                    "stringValue": "Wait",
                    "expression": "",
                    "string": ""
                }
            ]
        }
/*        sub_properties: {
            "versionId": "1",
            "procDefKey": "Pro_9d5ce17c497d497ba81f6a5b9a1ea272",
            "subSettings": [{
                    "subVersionId": "1",
                    "subProcDefKey": "Pro_8e9a0d771ccd45d38af0f1a2e954f7a2",
                    "actId": "sid-B16F8C26-2B60-466F-A872-21DE598A908B",
                    "candidateUsers": "{\"candidateOwners\" : [{\"cate\" : \"fromDb\",\"id\" : \"1\",\"text\" : \"从DB中获取\",\"value\" : \"fromDb(1)\"}]}",
                    "startType": "One",
                    "startUserSource": "Parent",
                    "startUserValue": "",
                    "formMapping": "[{\"left\":\"field_1510555486841\",\"right\":\"field_1510296977961\",\"type\":\"text\",\"subForms\":[]},{\"left\":\"field_1510555506743\",\"right\":\"field_1510297609155\",\"type\":\"sub_form\",\"subForms\":[{\"left\":\"field_1510555521126\",\"right\":\"field_1510297625044\",\"type\":\"text\",\"subForms\":[]},{\"left\":\"field_1510555534868\",\"right\":\"field_1510297639134\",\"type\":\"text\",\"subForms\":[]}]}]",
                    "processType": "Normal"
                },
                {
                    "subVersionId": "1",
                    "subProcDefKey": "Pro_403b405a36ad4014a411dc8b53ae6e36",
                    "actId": "sid-B16F8C26-2B60-466F-A872-21DE598A908B",
                    "candidateUsers": "{\"candidateOwners\" : [{\"cate\" : \"fromDb\",\"id\" : \"1\",\"text\" : \"从DB中获取\",\"value\" : \"fromDb(1)\"}]}",
                    "startType": "ByApproved",
                    "startUserSource": "Parent",
                    "startUserValue": "",
                    "formMapping": "[{\"left\":\"field_1510555922318\",\"right\":\"field_1510296977961\",\"type\":\"text\",\"subForms\":[]}]",
                    "processType": "Normal"
                }
            ]
        }*/
        // currentElement.setProperty('objData', jsonArray)
        currentElement.setProperty('servicetaskexpression', "")
        currentElement.setProperty('servicetaskfields', value)
        currentElement.setProperty('reduxData', repoObj)
        currentElement.setProperty('servicetaskdelegateexpression', "${subProcessServiceTask}")
        currentElement.setProperty('classify', "SubProcess")

        // if(repoObj.previousNodeSpecified){
            // currentElement.setProperty('previousNodeSpecified', true)
        // }
    })

}