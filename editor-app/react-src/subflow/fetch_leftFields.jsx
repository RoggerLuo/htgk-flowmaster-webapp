 const markRequired_to_fields = (leftFields, nodes) => {
     let formLimits = false
     if (nodes) {
         const start = nodes.filter(el => el.nodeName == ' 开始')
         if (start) {
             formLimits = start[0]
         }
     }
     return leftFields.map((el, ind) => {
         el.required = false
         if (formLimits) {

             formLimits.fields.forEach(form => {
                 if (form.fieldId == el._id) {
                     el.required = form.required
                 }
             })
         }
         return el
     }).filter(el => el.type != "description")

 }

 const cb_fetch_leftFields = (leftFields,subProcess) => {
     fm.fetchFormLimits(
         subProcess.subProcDefKey,
         subProcess.versionId,
         (nodes) => {
             leftFields = markRequired_to_fields(leftFields, nodes)
             rdx.dispatch({ type: 'subflow/leftFields', leftFields })
         }
     )
 }
 const fetch_leftFields = (subProcess) => {
     fm.fetchFormComponents(subProcess.subProcDefKey, subProcess.versionId, function(data) {
         if (!data) return
         cb_fetch_leftFields(data.components,subProcess)
         // dispatch({type:'subflow/leftFields',leftFields:data.components})
     })
 }
 export default fetch_leftFields