import round2 from './round2'
import integrity from './integrity'
export default () => {
    if (!integrity()) return rdx.save()
    if (!round2()) return rdx.save()
}