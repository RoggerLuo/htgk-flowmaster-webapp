import round2 from './round2'
import integrity from './integrity'
export default () => {
    if (!integrity()) return false
    if (!round2()) return false
    return true
}