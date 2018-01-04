import React from 'react'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import RoleCube from './RoleCube'

export default function(del){
    return function({ data }){
        return (
            <SolidFrame innerStyle={{padding:'4px 7px'}}>
                <div style={{padding:'2px',minHeight: '17px',lineHeight:'8px'}}>
                    {data.map((el,index)=><RoleCube text={el.text} click={del(index)} key={index}/>)}
                </div>
            </SolidFrame> 
        )
    }
}

