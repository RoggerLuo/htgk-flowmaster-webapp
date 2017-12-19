import rolesJsonSpeller from './rolesJsonSpeller'

export default function(canvas) {
    let returnFlag = true

    const subflow = window.reduxStore.getState().subflow

    const procDefKey = window.getQueryString("pid")
    const versionId = window.getQueryString("versionId")
    const sub_properties = { versionId, procDefKey, subSettings: [] }

    subflow.repo.forEach((repoObj) => {
        let currentElement = canvas.getChildShapeByResourceId(repoObj.id)
        if (repoObj.id && !currentElement) return
        let jsonArray = []
        jsonArray = rolesJsonSpeller(jsonArray, repoObj.data)
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
        /* check是否匹配 */
        if(
            repoObj.leftFields.some((el, ind) => {
                if(!repoObj.subRights){
                    window.showAlert('子表单尚未选择')
                    returnFlag = false
                    return true
                }

                if(el.type != 'sub_form') return false
                
                if(!repoObj.subRights[el.name]){
                    window.showAlert('子表单"'+ el.title +'"尚未匹配')
                    returnFlag = false
                    return true
                }else{
                    if(!repoObj.subRights[el.name].rightFormId){
                        window.showAlert('子表单"'+ el.title +'"尚未匹配')
                        returnFlag = false
                        return true   
                    }
                }
            })
        ){
            return 
        }




        const formMapping = repoObj.leftFields.map((el, ind) => {
            
            if (el.type != "sub_form") {
                if(el.require){
                    if(!repoObj.mainRight){
                        window.showAlert('子表单尚未选择')
                        returnFlag = false
                        return 
                    }
                    if(!repoObj.mainRight[el.name]){
                        window.showAlert('必填项"'+ el.title +'"尚未匹配字段')
                        returnFlag = false
                        return 
                    }
                    if(repoObj.mainRight[el.name].name == 'initial'){
                        window.showAlert('必填项"'+ el.title +'"尚未匹配字段')
                        returnFlag = false
                        return 
                    }
                }
                const returnObj = {
                    left: el.name,
                    right: repoObj.mainRight && repoObj.mainRight[el.name] && repoObj.mainRight[el.name].name||'',
                    type: el.type,
                    subForms: []
                }
                return returnObj

            }





            if (el.type == "sub_form") {
                const returnObj = {
                    left: el.name,
                    right: repoObj.subRights[el.name].rightFormId,
                    type: el.type,
                    subForms: []
                }

                const optionMap = repoObj.subRights[el.name].map
                const subForms = []
                for(let v in optionMap){
                    if(optionMap.hasOwnProperty(v)){
                        subForms.push({
                            left: v,
                            right: optionMap[v].value,
                            type: optionMap[v].type||'尚未指派',
                            subForms: []
                        })
                    }
                }
                returnObj.subForms = subForms
                return returnObj
            }
        })

        debugger
        const subSetting = {
            "subVersionId": repoObj.subProcess.versionId||'',
            "subProcDefKey": repoObj.subProcess.subProcDefKey,
            "actId": currentElement.resourceId,
            "startType": repoObj.isOne ? "One" : "ByApproved",

            "candidateUsers": JSON.stringify(jsonArray), //"{\"candidateOwners\" : [{\"cate\" : \"fromDb\",\"id\" : \"1\",\"text\" : \"从DB中获取\",\"value\" : \"fromDb(1)\"}]}",
            "formMapping":JSON.stringify(formMapping), // "[{\"left\":\"field_1510555486841\",\"right\":\"field_1510296977961\",\"type\":\"text\",\"subForms\":[]},{\"left\":\"field_1510555506743\",\"right\":\"field_1510297609155\",\"type\":\"sub_form\",\"subForms\":[{\"left\":\"field_1510555521126\",\"right\":\"field_1510297625044\",\"type\":\"text\",\"subForms\":[]},{\"left\":\"field_1510555534868\",\"right\":\"field_1510297639134\",\"type\":\"text\",\"subForms\":[]}]}]",

            "startUserSource": "Parent",
            "startUserValue": "",
            "processType": "Normal"
        }

        sub_properties.subSettings.push(subSetting)

        window.sub_properties = sub_properties
        
        currentElement.setProperty('servicetaskexpression', "")
        currentElement.setProperty('servicetaskfields', value)
        currentElement.setProperty('reduxData', repoObj)
        currentElement.setProperty('servicetaskdelegateexpression', "${subProcessServiceTask}")
        currentElement.setProperty('classify', "SubProcess")

        // if(repoObj.previousNodeSpecified){
        // currentElement.setProperty('previousNodeSpecified', true)
        // }
    })
    return returnFlag
}