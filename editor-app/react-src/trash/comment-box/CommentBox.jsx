import React,{createClass} from 'react';
import { render } from 'react-dom'
import Remarkable from 'remarkable';

/* createClass貌似比ES6更方便*/
/*
const CommentBox = React.createClass({
    render:function(){
        return (
            <div className="CommentBox">
                Hello, world! I am a CommentBox~aaa
            </div>
            )
    }
});
*/
/* 这边可以直接传递children的，stateless也可以接收props.children */

const Comment = ({author,children}) => {
    /* 可以改成return的模式，这样你就可以加其他语句了 */
    const md = new Remarkable() /* remarkable nice,但是在手机上貌似没用 */
    const rawMarkup = {__html:md.render(children.toString())}
    return(
    <div className="comment">
        <h2 className="commentAuthor">
            {author}
        </h2>
        <span dangerouslySetInnerHTML={rawMarkup} />
    </div>
)}
/* 除了class要用className好像其他没有问题 */
const CommentForm = ({onInputChange,onBtnClick}) => (
    <form className="commentForm" role="form">
        Hello, world! I am a CommentForm.
        <div className="row">
            <div className="col-md-8">
                <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="I hate brower compatibility..."
                    onChange={onInputChange}
                >
                </textarea>
            </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={onBtnClick}>OK</button>
    </form>
)
const CommentList = ({data}) => {
    const commentNodes = data.map((comment)=>(
        <Comment key={comment.id} {...comment}>{comment.text}</Comment>
        )
    )
    /* ReactElement可以直接放在大括号里插入jsx当作一个普通组件 */
    return (
        <div className="commentList">
            CommentList...
            <Comment author="Roger luo">Wow, it really has the 'children' property, even in stateless function</Comment>
            <Comment author="Roger luo again">[this is a link](http://www.baidu.com)
            -another -`comment`: -"testmark"--donw  **title**</Comment>
            {commentNodes}
        </div>
    )
}
/* 
    这个例子说明props和state是可以一起使用的 
    既可以从父元素获得props也可以自己维护一个内部state
*/
class HelloMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: props.testprops};
    }
    render() {
        return (
            <div>
                Hello {this.props.name}
                <div>{this.state.count}</div>
            </div> 
        );
    }
}

/* 为了使用mount事件，是不是顶层要使用非stateless来实现？看看redux的案例再说 */
/* 这样暴力的使用拓展运算符 来使用 spread attribute {...{data,onInputChange,onBtnClick}} */
/*const CommentBox = ({data,onInputChange,onBtnClick}) => (
    <div className="CommentBox">
        <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">React test</a>
                </div>
            </div>
        </nav>
        <HelloMessage testprops='tttestprop' name='rrroger'/>
        <div className="container">
            <h1>Hello, world! I am a CommentBox~(with stateless function)</h1>        
            <CommentList data={data} />
            <CommentForm {...{data,onInputChange,onBtnClick}} />
        </div>
    </div>
)
*/


const data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

/* 
    不能对字符串使用const，使用了这个就是常量，不能变化
    内层可以访问外层的let和const
*/
let textarea='';

/* 这里这个e可以借鉴下 */
/* 怎么把input更新到redux? */
const onInputChange = function(e){
    console.log('change~')
    textarea = e.target.value
}


const CommentBox = createClass({
    getInitialState(){
        let data = [
          {id: 1, author: "Pete Hunt", text: "This is one comment"},
          {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
        ];
       return {data: data, onInputChange: onInputChange}
    },
    onBtnClick(){
        console.log('onBtnClick~'+data)
        let data=this.state.data.concat({text:textarea,author:'roger',id:Date.parse( new Date()) })
        this.setState({'data':data})
    },
    render(){
        return (
            <div className="CommentBox">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">React test</a>
                        </div>
                    </div>
                </nav>
                <HelloMessage testprops='tttestprop' name='rrroger'/>
                <div className="container">
                    <h1>Hello, world! I am a CommentBox~(with stateless function)</h1>        
                    <CommentList data={this.state.data} />
                    <CommentForm {...this.state} onBtnClick={this.onBtnClick}/>
                </div>
            </div>
        )
    }
})


const onBtnClick = function(){
    console.log('onBtnClick~'+data)
    data.push({text:textarea,author:'roger',id:Date.parse( new Date()) })
    /* 
        这边直接暴力渲染 
        redux的store是自己会变化？什么机制，我这边也是引用，但是store变化了之后并没有让react自动更新，
        redux是有订阅更新吗
    */
    const store={data,onInputChange,onBtnClick}
    render(
        (<CommentBox {...store}/>),
        document.getElementById('app')
    );
}

const store={data,onInputChange,onBtnClick}
// render(
//     (<CommentBox {...store}/>),
//     document.getElementById('app')
// );
render(
    (<CommentBox />),
    document.getElementById('app')
);

