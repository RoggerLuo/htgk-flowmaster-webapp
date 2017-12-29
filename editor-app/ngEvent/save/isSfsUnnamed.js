export default ($scope) => { 
    var json = window.getRawJson() 
    
    return json.childShapes.some((el, index) => {
        switch (el.stencil.id) {
            case 'SequenceFlow':
                if (!!el.properties["name"] ) {
                    window.showAlert(`连线未命名`) 
                    return true
                }
                break
        }
    })
}