var myAjax = {
    auth($scope){

        
        jQuery.ajax({
            // url: 'http://bpm.ooad.io/authc', 
            url: 'http://localhost:9001/repository/process-definitions/c5006164f8fd461dbe3b9fe805d73855/design?processType=Normal', 
            data: '{"username": "activiti","password": "activiti"}', //json字符串 不能直接传对象,所以postman里面的raw是字符串来的
            // dataType: "json",
            type: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 21dde63fbdef4e8ea6595d697825cf0a"
            },
            success: function(response) {
                console.log(response)
                debugger
            }
        })
    },
}

