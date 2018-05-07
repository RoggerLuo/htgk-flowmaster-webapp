import React from 'react'

const Sf = ({ selected, selectedOption, options }) => {
    const Dropdown = fm.common.Dropdown
    return(
        <div className="react-approve" >
            <div style={{height:'15px',width:'100%'}}></div>
            <div style={{fontWeight:'600'}}>业务状态</div>
            <div style={{height:'2px',width:'100%'}}></div>
            <Dropdown width={'200px'} margin={'0 0'} data={options||[]} choosedOption={selectedOption} choosed={selected} />
        </div>
    )
}

export default Sf

