
$scope.getModel = function() {
    
    var json = $scope.editor.getJSON();
    
    json = JSON.stringify(json);
    
    return json

    var selection = $scope.editor.getSelection();
    $scope.editor.setSelection([]);
    
    // Get the serialized svg image source
    var svgClone = $scope.editor.getCanvas().getSVGRepresentation(true);
    $scope.editor.setSelection(selection);
    if ($scope.editor.getCanvas().properties["oryx-showstripableelements"] === false) {
        var stripOutArray = jQuery(svgClone).find(".stripable-element");
        for (var i = stripOutArray.length - 1; i >= 0; i--) {
            stripOutArray[i].remove();
        }
    }

    // Remove all forced stripable elements
    var stripOutArray = jQuery(svgClone).find(".stripable-element-force");
    for (var i = stripOutArray.length - 1; i >= 0; i--) {
        stripOutArray[i].remove();
    }

    // Parse dom to string
    var svgDOM = DataManager.serialize(svgClone);

    var params = {
        json_xml: json,
        svg_xml: svgDOM,
        name: 'scope.saveDialog.name',
        description: '$scope.saveDialog.description'
    };
    return params
}

$scope.putModel = function() {
    const make_base_auth = function (user, pass) {    
      let tok = user + ':' + pass;    
      let hash = window.btoa(tok);    
      return "Basic " + hash;    
    }     
    // console.log(make_base_auth('kermit','kermit'))

    // const params = {
    //     json_xml: $scope.getModelJson(),
    //     svg_xml: 'svgDOM',
    //     name: 'name',
    //     description: 'description'
    // };

    jQuery.ajax({
        // url: 'http://localhost:3001/list', //KISBPM.URL.putModel('test'),
        // url: 'http://activiti.ooad.io/activiti-rest/service/token', //KISBPM.URL.putModel('test'),
        url: 'http://localhost:9001/activiti-rest/service/model/1530/save', //KISBPM.URL.putModel('test'),
        // data: {
        //     "userId": "8e4eca6bb62a4caea183ce66a2768682",
        //     "orgId": "108f826f-4a36-4742-a124-6ade824c85ed",
        //     "ticket": "bebd9c2dc5c943249b7ddc211f7d02d3"
        // },
        data: '$scope.getModel()',
        type: 'PUT',
        // headers: {
        //     Authorization: make_base_auth('kermit','kermit')
            // Authorization: 'make_base_auth'
        // },
        success: function(response) {
            debugger
        }
    });

}
