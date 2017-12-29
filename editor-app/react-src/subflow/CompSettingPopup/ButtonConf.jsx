import React from 'react'
import {connect} from 'react-redux'

import Button from '../../DropdownButton'
import confirmGenerator from '../../confirmGenerator'

const ButtonContainer = ({ currentRepo, children}) => { 
    const reduxCate = currentRepo.data && currentRepo.data[0] && currentRepo.data[0].cate

    const add = (item) => {
        rdx.dispatch({type:'subflow/addRole',item})
        activeSave() 

    }
    const clear = () => {
        rdx.dispatch({type:'subflow/clear'})
        activeSave() 
    }

    const confirmFunction = confirmGenerator({reduxCate,add,clear})
    const xClass = {marginTop:'5px',marginLeft:'-105px'}
    return ( 
        <Button xClass={xClass} confirm={confirmFunction} existCate={reduxCate}>
            {children}
        </Button>
    )
}
export default rdx.connect('subflow',ButtonContainer)

// const mapStateToProps = (state) => {
//     const currentRepo = state.subflow.repo.filter((el,index)=>el.id == state.approve.id)
//     const reduxCate = currentRepo && currentRepo[0] && currentRepo[0].data && currentRepo[0].data[0] && currentRepo[0].data[0].cate||false
//     return {reduxCate}
// }
// const maprdx.DispatchToProps = (rdx.dispatch) => {
//     return {dispatch}
// }

// export default connect(mapStateToProps,mapDispatchToProps)(ButtonContainer)

