import React from 'react'
import SolidFrame from '../../../presentations/SolidFrame/SolidFrame'
import {connect} from 'react-redux'
import Header from '../Form/Header'
import Group from './GroupContainer'

const MainForm = ({ currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const leftFields = currentRepo.leftFields || []
    return(
        <SolidFrame innerStyle={{padding:'0px'}} outerStyle={{width:'620px'}}>
            <Header />
            <div style={{padding:'10px 20px'}}>
                {
                    leftFields.filter(el=>el.subform_type != 'sub_form').map((el,ind)=>(
                        <Group leftData={el} key={ind}/>
                    ))
                }
            </div>
            <div style={{height:'20px',width:'100%'}}></div>
        </SolidFrame>
    )
}

export default global.connect2redux('subflow',MainForm)



