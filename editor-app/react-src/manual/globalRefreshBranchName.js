import { naming_multiBranch_usingGateway } from './nameMultiBranch/mainLogic' //handleMultiBranch

export default function() {
    fm.getNodes()
        .filter((el) => fm.getTitle(el) == "Multi user task")
        .forEach((el) => {
            const shape = el.outgoing[0] && el.outgoing[0].outgoing[0] || false
            shape && naming_multiBranch_usingGateway(shape)
        })
}