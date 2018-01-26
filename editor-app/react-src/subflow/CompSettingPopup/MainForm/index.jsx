import React from 'react'
import SolidFrame from '../../../presentations/SolidFrame/SolidFrame'
import {connect} from 'react-redux'
import Header from '../Form/Header'
import Group from './GroupContainer'

const MainForm = ({ currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const leftFields = currentRepo.leftFields || []


    // let formLimits = false
    // if(fm.formLimits){
    //     const start = fm.formLimits.filter(el => el.nodeName ==' 开始')   
    //     if(start){
    //         formLimits = start[0]
    //     }
    // }


    return(
        <SolidFrame innerStyle={{padding:'0px'}} outerStyle={{width:'620px'}}>
            <Header />
            <div style={{padding:'10px 20px'}}>
                {
                    leftFields
                        .filter(el => el.type != 'sub_form')
                        .filter(el => el.type != "description")
                        .map((el,ind)=>{
                            // let required = false
                            // if(formLimits){
                            //     formLimits.fields.filter(form=>{
                            //         if(form.fieldId == el._id){
                            //             required = form.required
                            //         }
                            //     })
                            // }
                            return (<Group leftData={el} key={ind} />)
                        }
                    )
                }
            </div>
            <div style={{height:'20px',width:'100%'}}></div>
        </SolidFrame>
    )
}
export default global.connect2redux('subflow',MainForm)



