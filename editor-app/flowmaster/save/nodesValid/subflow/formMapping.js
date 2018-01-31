export default function(repoObj) {
    const formMapping = repoObj.leftFields.map((el, ind) => {
        if (el.type != "sub_form") {
            const returnObj = {
                left: el.name,
                right: repoObj.mainRight && repoObj.mainRight[el.name] && repoObj.mainRight[el.name].name || '',
                type: el.type,
                subForms: []
            }
            return returnObj

        }

        if (el.type == "sub_form") {
            const returnObj = {
                left: el.name,
                right: repoObj.subRights[el.name].rightFormId,
                type: el.type,
                subForms: []
            }

            const optionMap = repoObj.subRights[el.name].map
            const subForms = []
            for (let v in optionMap) {
                if (optionMap.hasOwnProperty(v)) {
                    subForms.push({
                        left: v,
                        right: optionMap[v].value,
                        type: optionMap[v].type || '',
                        subForms: []
                    })
                }
            }
            returnObj.subForms = subForms
            return returnObj
        }
    })
    return formMapping
}