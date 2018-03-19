import validateRepo from './validateRepo'
import validateItems from './validateItems'
export default function() {
    /* validateRepo通过返回true */
    return !validateItems.some(item => !validateRepo(item) ) 
}

