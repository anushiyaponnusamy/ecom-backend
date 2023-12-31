const dbHelper = require('./dbHelper');
const viewModel = require('./viewModel');

const controller = {}
controller.addToCart = async (req) => {
    try {
        if (!req.body.productId && !req.body.userId) return 'field required';
        const existingAlreadyInCart = await dbHelper.checkCart(req.body.productId, req.body.userId);

        if (existingAlreadyInCart) {
            return 'product already exists'
        }
        const cartViewModel = viewModel.createViewModel(req)
        return await dbHelper.addToCart(cartViewModel);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getAllCartItemsByUserId = async (req) => {
    try {
        if (!req.params.userId) return 'field required';

        return await dbHelper.getAllCartItemsByUserId(req.params.userId);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.checkCart = async (req) => {
    try {
        if (!req.params.userId && !req.params.productId) return 'field required';

        return await dbHelper.checkCart(req.params.productId, req.params.userId);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.deleteCartItemByUserIdAndProductId = async (req) => {
    try {
        return await dbHelper.deleteCartItemByUserIdAndProductId(req.params.productId, req.params.userId);
    } catch (error) {
        return Promise.reject(error)
    }
}
controller.deleteById = async (req) => {
    try {
        return await dbHelper.deleteById(req.params.id)
    } catch (error) {
        return Promise.reject(error)
    }
}
module.exports = controller;