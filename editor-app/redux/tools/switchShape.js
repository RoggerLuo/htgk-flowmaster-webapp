
export default function(shape) {
    const nextId = shape.resourceId
    const title = fm.getTitle(shape)
    rdx.store.dispatch({ type: 'switchElement', nextId, nextStencilTitle: title })
}