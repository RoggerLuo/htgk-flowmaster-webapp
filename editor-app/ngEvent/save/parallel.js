export default function(canvas){
    window.reduxStore.getState().parallel.repo.forEach((el) => {
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if (el.id && !currentElement) {
            return;
        }

        let jsonArray = []
        el.data.forEach((group) => {
            let innerArray = []
            group.forEach((el, index) => {
                switch (el.cate) {
                    case "boss":
                        innerArray.push({ "value": "boss" + "(" + el.value + ")", cate: el.cate, text: el.text, id: el.value })
                        break
                    case "role":
                        innerArray.push({ "value": "role" + "(" + el.value2 + ":" + el.value + ")", cate: el.cate, text: el.text, id: el.value, value2: el.value2 })
                        break
                    case "EMPLOYEE":
                        innerArray.push({ "value": "user" + "(" + el.value + ")", cate: el.cate, text: el.text, id: el.value })
                        break
                    case "ORG":
                    case "DEPT":
                        innerArray.push({ "value": "org" + "(" + el.value + ")", cate: el.cate, text: el.text, id: el.value })
                        break
                }
            })
            jsonArray.push(innerArray)
        })
        currentElement.setProperty('multiinstance_parties', jsonArray)
        currentElement.setProperty('multiinstance_type', "parallel")
        currentElement.setProperty('multiinstance_variable', "per")
        currentElement.setProperty('usertaskassignment', { "assignment": { "candidateOwners": [{ "value": "${per}" }] } })
    })
}

