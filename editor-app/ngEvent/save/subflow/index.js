import rolesJsonSpeller from '../rolesJsonSpeller'
import servicetaskfields from './servicetaskfields'
import checkSubform from './checkSubform'
import checkMainform from './checkMainform'
import formMapping from './formMapping'
export default function(canvas) {
    let returnFlag = true
    const procDefKey = window.getQueryString("pid")
    const versionId = window.getQueryString("versionId")
    const sub_properties = { versionId, procDefKey, subSettings: [] }
    
    const subflowReducer = window.reduxStore.getState().subflow
    subflowReducer.repo.forEach((repoObj) => {
        if(!returnFlag) return 
        
        let currentElement = canvas.getChildShapeByResourceId(repoObj.id)
        if (!currentElement) return
        
        if( !checkMainform(repoObj) || !checkSubform(repoObj)){
            returnFlag = false
        }
       
        const candidateUsers = {candidateOwners:rolesJsonSpeller([],repoObj.data)}
        if(candidateUsers.candidateOwners.length == 0){
            window.showAlert('子流程中审批人范围未选择')
            returnFlag = false
            return returnFlag
        }

        const subSetting = {
            "subVersionId": repoObj.subProcess.versionId||'',
            "subProcDefKey": repoObj.subProcess.subProcDefKey,
            "startType": repoObj.isOne ? "One" : "ByApproved",

            "actId": currentElement.resourceId,

            "candidateUsers": JSON.stringify(candidateUsers), //"{\"candidateOwners\" : [{\"cate\" : \"fromDb\",\"id\" : \"1\",\"text\" : \"从DB中获取\",\"value\" : \"fromDb(1)\"}]}",
            "formMapping":JSON.stringify(formMapping(repoObj)), // "[{\"left\":\"field_1510555486841\",\"right\":\"field_1510296977961\",\"type\":\"text\",\"subForms\":[]},{\"left\":\"field_1510555506743\",\"right\":\"field_1510297609155\",\"type\":\"sub_form\",\"subForms\":[{\"left\":\"field_1510555521126\",\"right\":\"field_1510297625044\",\"type\":\"text\",\"subForms\":[]},{\"left\":\"field_1510555534868\",\"right\":\"field_1510297639134\",\"type\":\"text\",\"subForms\":[]}]}]",

            "startUserSource": "Parent",
            "startUserValue": "",
            "processType": "Normal"
        }
        if(subSettings.subVersionId == ''){
            window.showAlert('子流程中子表单versionId未获得')
            returnFlag = false
            return returnFlag
        }
        sub_properties.subSettings.push(subSetting)
        
        currentElement.setProperty('servicetaskexpression', "")
        currentElement.setProperty('servicetaskfields', servicetaskfields(repoObj))
        currentElement.setProperty('reduxData', repoObj)
        currentElement.setProperty('servicetaskdelegateexpression', "${subProcessServiceTask}")
        currentElement.setProperty('classify', "SubProcess")

        // if(repoObj.previousNodeSpecified){
        // currentElement.setProperty('previousNodeSpecified', true)
        // }
    })
    window.sub_properties = sub_properties
    return returnFlag
}