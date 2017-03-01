var myAjax = {
    auth($scope){
        jQuery.ajax({
            // url: 'http://bpm.ooad.io/authc', 
            url: 'http://localhost:9001/authc', 
            data: '{"username": "activiti","password": "activiti"}', //json字符串 不能直接传对象,所以postman里面的raw是字符串来的
            // dataType: "json",
            type: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            success: function(response) {
                console.log(response)
                debugger
            }
        })
    },
    
}

