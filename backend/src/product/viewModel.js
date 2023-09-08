
const slugify = require('slugify')

const productViewModel = {}

productViewModel.createViewModel = (req) => {
    const { body } = req;
    const viewModel = {}
    viewModel.slug = slugify(body.name);
    viewModel.name = body.name;
    viewModel.price = body.price;
    viewModel.description = body.description;
    viewModel.quantity = body.quantity;
    viewModel.photo = body.photo;
    viewModel.category = body.category;
    viewModel.shipping = body?.shipping;
    return viewModel
}
productViewModel.updateViewModel = (req) => {
    const { body } = req;
    const viewModel = {}

    if (body.name) {
        viewModel.name = body.name;
        viewModel.slug = slugify(body.name);

    }
    if (body.price)
        viewModel.price = body.price;
    if (body.description)
        viewModel.description = body.description;
    if (body.quantity)
        viewModel.quantity = body.quantity;
    if (body.photo)
        viewModel.photo = body.photo;
    if (body.category)
        viewModel.category = body.category
    if (body.shipping)
        viewModel.shipping = body.shipping
    return viewModel
}
module.exports = productViewModel;