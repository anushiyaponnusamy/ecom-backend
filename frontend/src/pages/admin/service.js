import axios from "axios";
import config from "../../config";
const accessToken = localStorage.getItem("token");
const headers = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`
    },
};
//product
const uploadImage = async (selectedFile) => {

    const formData = new FormData();
    formData.append('image', selectedFile);
    const response = await axios.post(config.REACT_APP_API + '/uploadImage', formData, { headers });
    return response;

};

const getAllUsers = async () => {

    let response = await axios.get(config.REACT_APP_API + '/auth/getAllUsers', headers);
    return response;
};
//category
const getAllCategories = async () => {

    let response = await axios.get(config.REACT_APP_API + '/category/getAllCategories', headers);
    return response;
};
const getAllProducts = async () => {

    let response = await axios.get(config.REACT_APP_API + '/product/getAllProduct', headers);
    return response;
};
const getProductById = async (id) => {

    let response = await axios.get(config.REACT_APP_API + `/product/getProductById/${id}`, headers);
    return response;
};
const createCategory = async (name) => {

    let response = await axios.post(config.REACT_APP_API + '/category/create-category', { name }, headers);
    return response;
};
const editCategory = async (categoryId, name) => {

    let response = await axios.post(config.REACT_APP_API + '/category/update-category', { categoryId, name }, headers);
    return response;
};

const deleteCategory = async (categoryId) => {

    let response = await axios.delete(config.REACT_APP_API + `/category/deleteCategoryById/${categoryId}`, headers);
    return response;
};

const createProduct = async (data) => {

    let response = await axios.post(config.REACT_APP_API + '/product/create-product', data, headers);
    return response;
};
const editProduct = async (data) => {

    let response = await axios.post(config.REACT_APP_API + '/product/update-product', data, headers);
    return response;
};

const deleteProduct = async (productId) => {

    let response = await axios.delete(config.REACT_APP_API + `/product/deleteProductById/${productId}`, headers);
    return response;
};
export {
    createProduct, editProduct, deleteProduct,
    getAllUsers, createCategory, uploadImage, getAllCategories,
    editCategory, deleteCategory, getAllProducts, getProductById
};