module.exports = {
    getOrder: require('./getOrder.controller.api'),
    addProductToOrder: require('./addProductToOrder.controller.api'),
    removeProductToOrder: require('./removeProductToOrder.controller.api'),
    moreQuantity: require('./moreQuantity.controller.api'),
    lessQuantity: require('./lessQuantity.controller.api'),
    cancelOrder: require('./cancelOrder.controller.api'),
    completeOrder: require('./completeOrder.controller.api'),
    clearCart: require('./clearCart.controller.api'),
};