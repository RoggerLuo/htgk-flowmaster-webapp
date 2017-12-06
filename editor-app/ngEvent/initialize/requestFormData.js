'use strict'
const formControlAdapter = (arr) => {
    return arr.map((el)=>{
        el.cate = el.type
        el.text = el.title
        el.value = el.name

        if(el.type == "calculate"){
            if(el.rule.type != 'dateDiff'){
                el.type = 'double'
                return el
            }
        }
        el.type = el.name_type
        return el
    })
}
const mapmap = {
    "text":true,
    "textarea":true,
    "number":true,
    "money":true,
    "date":true,
    "time":true,
    "selection":true,
    multi_selection:true,
    select_employee:true,
    select_org:true,
    mobile:true,
    email:true,
    phone:true,
    calculate:true,
}

export default function($http){
    const url = window.globalHost+'/repository/process-definitions/'+window.getQueryString("pid")+'/forms?processType=Normal'
    $http({    
        method: 'GET', url
    }).success(function (data) {
        let obj = false
        if(data.formDefinition != ""){
            obj = JSON.parse(data.formDefinition)
        }
        if(!obj){
            window.formProperties = []
            return  
        }
        
        global.formPeople = obj.components.filter(el=>el.type=="select_employee")

        const filteredComponents = obj.components.filter((el)=>{
            return !!mapmap[el.type]
        })
        window.formProperties = formControlAdapter(filteredComponents)
        window.formProperties.unshift({text:'请选择',value:'initial',index:'initial',type:'initial'})
        global.reduxStore.dispatch({type:'updateFormProperties',data:window.formProperties})
    })
}
