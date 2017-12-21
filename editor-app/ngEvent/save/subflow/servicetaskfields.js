
export default function(repoObj) {
    const subProcessSet = {
        subProcessSet: [repoObj.subProcess]
    }
    let value = {
        "fields": [{
                "name": "subProcessSet",
                "implementation": "subProcessSet",
                "stringValue": JSON.stringify(subProcessSet),
                "expression": "",
                "string": ""
            },
            {
                "name": "waitExpression",
                "implementation": "waitExpression",
                "stringValue": "Wait",
                "expression": "",
                "string": ""
            }
        ]
    }
    return value
}