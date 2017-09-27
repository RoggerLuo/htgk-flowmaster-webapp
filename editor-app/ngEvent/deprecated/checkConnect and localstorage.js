const checkConnect = ($scope) => {
    const json = window.getRawJson()
    return !json.childShapes.some((el, index) => {
        if (el.outgoing.length == 0) {
            if (el.stencil.id != 'EndNoneEvent' && el.stencil.id != 'EndErrorEvent') {
                //window.showAlert('请连接上所有的节点')
                // isOK = false
                return true
            }
        }
        switch (el.stencil.id) {
            case 'StartNoneEvent':
                if (el.outgoing.length == 0) {
                    // isOK = false
                    // window.showAlert('请连接上开始节点')
                    // returnValue = true
                    return true
                }
                break
        }
        return false
    })
}

window.globalHost = 'localhost:9001'

/*
     每次move都压入 localstorage
     保存 清空key
    
    读取的时候 判断key是否存在，存在就读取localstorage     
*/
window.localDesignData = {}
window.localDesignData.read = (pid) => {
    if (localStorage.getItem(pid) !== "undefined") {
        return JSON.parse(localStorage.getItem(pid))
    }
    return ''
}
window.localDesignData.save = (pid, obj) => {
    localStorage.setItem(pid, JSON.stringify(obj))
}
window.localDesignData.clear = (pid) => {
    localStorage.removeItem(pid)
}



