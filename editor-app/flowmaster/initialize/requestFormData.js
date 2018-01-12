'use strict'
const formControlAdapter = (arr) => {
    return arr.map((el) => {
        el.subform_type = el.type
        el.cate = el.type
        el.text = el.title
        el.value = el.name

        if (el.type == "calculate") {
            if (el.rule.type != 'dateDiff') {
                el.type = 'double'
                return el
            }
        }
        el.type = el.name_type
        return el
    })
}
const mapmap = {
    "text": true,
    "textarea": true,
    "number": true,
    "money": true,
    "date": true,
    "time": true,
    "selection": true,
    multi_selection: true,
    select_employee: true,
    select_org: true,
    mobile: true,
    email: true,
    phone: true,
    calculate: true,
}
export const requestFormData = ($http, pid, cb) => {
    const url = window.globalHost + '/repository/process-definitions/' + pid + '/forms?processType=Normal'
    $http({
        method: 'GET',
        url
    }).success(function(data) {
        let dataObj = false
        if (data.formDefinition != "") {
            dataObj = JSON.parse(data.formDefinition)
        }
        cb(dataObj)
    })
}
export default function($http, pid) {
    requestFormData($http, pid, function(obj) {
        if (!obj) {
            window.formProperties = []
            return
        }
        global.formPeople = obj.components.filter(el => el.type == "select_employee")
        
        //筛选        
        const filteredComponents = obj.components.filter((el) => !!mapmap[el.type])

        window.formPropertiesTotal = formControlAdapter(JSON.parse(JSON.parse(JSON.stringify(obj.components))))
        window.formProperties = formControlAdapter(filteredComponents)

        const defaultOption = { text: '请选择', value: false, index: 'initial', type: 'initial' }
        window.formProperties.unshift(defaultOption)
        rdx.dispatch({ type: 'updateFormProperties', data: window.formProperties })
    })
    window.requestFormData = (pid,cb) => {
        requestFormData($http,pid,cb)
    }
}