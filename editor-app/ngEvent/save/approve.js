export default function(canvas) {
    window.reduxStore.getState().approve.repo.forEach((el) => {
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if (el.id && !currentElement) {
            return
        }
        let jsonArray = []
        el.data.forEach((el, index) => {
            switch (el.cate) {
                case "boss":
                    jsonArray.push({ "value": "boss" + "(" + el.value + ")", cate: el.cate, text: el.text, id: el.value })
                    break
                case "role":
                    jsonArray.push({ "value": "role" + "(" + el.value2 + ":" + el.value + ")", cate: el.cate, text: el.text, id: el.value, value2: el.value2 })
                    break
                case "EMPLOYEE":
                    jsonArray.push({ "value": "user" + "(" + el.value + ")", cate: el.cate, text: el.text, id: el.value })
                    break
                case "ORG":
                case "DEPT":
                    jsonArray.push({ "value": "org" + "(" + el.value + ")", cate: el.cate, text: el.text, id: el.value })
                    break
                    // 这是所有审批类节点共用的 需要共用和优化
                case "fromDb":
                    jsonArray = {
                        "value": "fromDb()",
                        "cate": "fromDb",
                        "text": "从DB中获取",
                        "id": "1"
                    }
                    currentElement.setProperty('dataSourceRef', el.dataSourceRef)
                    currentElement.setProperty('dataSourceSTDdata', el.dataSourceSTDdata)
                    break
            }
        })
        let value = {
            "assignment": {
                "candidateOwners": jsonArray
            }
        }
        currentElement.setProperty('usertaskassignment', value)
    })
}