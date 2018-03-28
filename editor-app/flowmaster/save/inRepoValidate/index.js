import dispatcher from './dispatcher'
import items from './items'
/* 所有的都是通过返回true */
export default function() {
    // 这段的意思是 所有的都通过才true
    return !items.some(item => {
        const value = dispatcher(item)
        console.log(`[inRepo] ${item.name} `,value)
        return !value
    })
}

