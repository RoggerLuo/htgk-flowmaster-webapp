import React,{createClass} from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'

const SubOrganize = ({}) => {
    return (
        <div className="sub-organize">
            <span className="text">研发部</span> <span className="handler">^</span>
        </div>
    )
}

const Organize = ({}) => {
    return (
        <div className="organize">
            <span className="text">"图标" 新华三集团</span> <span className="handler">^</span>
            <SubOrganize />
        </div>
    )
}

const Component = ({title,confirm,content,display,dispatch,height}) => {
    const options = {
        
    }
    return (
        <div className="tree">
            tree
            <Organize />
        </div>
    )
}
export default Component
// const mapStateToProps = (state) => {
//     return state.popup
// }

// const mapDispatchToProps = (dispatch) => {
//     return {dispatch}
// }

// const ComponentContainer = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Component)


// export default function(){
//     render(
//         <Provider store={store}>
//             <ComponentContainer />
//         </Provider>
//         ,
//         document.getElementById('hugePopup')
//     );
// }