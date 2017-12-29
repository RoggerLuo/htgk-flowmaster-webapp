import React from 'react'
import {connect} from 'react-redux'

import Button from '../DropdownButton'
import confirmGenerator from '../confirmGenerator'

const CircuButtonContainer = ({currentRepo, children}) => { 
    const reduxCate = currentRepo.data && currentRepo.data[0] && currentRepo.data[0] .cate
    const add = (item) => rdx.dispatch({type:'circulation/addRole',item})   
    const clear = () => rdx.dispatch({type:'circulation/clear'})
    const confirmFunction = confirmGenerator({reduxCate,add,clear})
    const xClass = {marginTop:'5px',right:'12px'}
    return ( 
        <Button xClass={xClass} confirm={confirmFunction} existCate={reduxCate}>
            {children}
        </Button>
    )
}
export default rdx.connect('circulation', CircuButtonContainer)

// export default global.connect2redux('circulation',CircuButtonContainer)
/*
const mapStateToProps = (state) => {
    const currentRepo = state.service.repo.filter((el,index)=>el.id == state.approve.id)
    const reduxCate = currentRepo && currentRepo[0] && currentRepo[0].data && currentRepo[0].data[0] && currentRepo[0].data[0].cate||false
    return {reduxCate}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(mapStateToProps,mapDispatchToProps)(ButtonContainer)

*/