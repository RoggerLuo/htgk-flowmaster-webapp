'use strict'

/* get role data */
$http({    
    method: 'GET',
    url: window.globalHost+'/identity/roles?orgId='+window.getQueryString("orgId")
}).success(function (data) {
    let roleData = data.data.map((el)=>{
        return {
            text:el.name,
            value:el.id,
            orgId:el.orgId
        }                            
    })
    .filter((el)=>(el.value!='OrgSupervisor')&&(el.value!='OrgLeader'))
    roleData.forEach((el,ind,arr)=>{
        if(arr.filter((el2)=>el2.text == el.text).length>1){
            $http({    
                method: 'GET',
                url: window.globalHost+'/identity/organizations/'+el.orgId
            }).success(function (data) {
                arr[ind].text = arr[ind].text + '('+data.name+')'
            })
        }
    })

    roleData = roleData.length === 0 ? [{text:'尚无角色可选择',value:'initial'}]:roleData
    window.reduxStore.dispatch({type:'updateRoleData',roleData})
})

