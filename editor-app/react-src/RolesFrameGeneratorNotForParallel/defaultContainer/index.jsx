import React from 'react'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import RoleCube from './RoleCube'

export default function(del){
    return function({ data }){



        const clonedData = data.slice(0)
        clonedData.forEach(el=>{
            if(el.cate == 'historicTask'){
                const shape = fm.getShapeById(el.value)
                el.text = shape.properties['oryx-name'] + `(${shape.resourceId.substring(4,9)})`
            }
        })


        
        return (
            <SolidFrame innerStyle={{padding:'4px 7px'}}>
                <div style={{padding:'2px',minHeight: '17px',lineHeight:'8px'}}>
                    {data.map((el,index)=><RoleCube text={el.text} click={del(index)} key={index}/>)}
                </div>
            </SolidFrame> 
        )
    }
}

