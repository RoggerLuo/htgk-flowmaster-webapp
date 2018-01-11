export default {
    is(selectedShape) {
        const incoming = selectedShape.incoming[0]
        if (!incoming) return false
        if (incoming._stencil._jsonStencil.title == 'Exclusive gateway') return true
        return false
    }
}