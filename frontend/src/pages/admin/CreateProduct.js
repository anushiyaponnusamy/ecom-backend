
import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Container,
    CssBaseline,
    Grid,
} from '@mui/material';

import { createProduct, getAllCategories, uploadImage } from './service';
import './CreateProduct.css'
import { useNavigate } from 'react-router-dom';
const formContainerStyle = {
    display: 'grid',
    placeItems: 'center',
    minHeight: '100vh',
};

const inputStyle = {
    margin: '10px 0',
    width: '100%',
};


const FormComponent = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({

        name: '',
        price: 0,
        description: '',
        quantity: 0,
        photo: '',
        category: '',
        shipping: '',
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setProduct({ ...product, [name]: value })
    };

    const handlePhotoChange = (event) => {
        console.log(event.target.files[0])
        const img = event.target.files[0]
        uploadImage(img).then((response) => {
            setProduct({ ...product, photo: response.data })
        }).catch((err) => console.log(err))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: product.quantity,
            photo: product.photo,
            category: product.category,
            shipping: product.shipping,
        }
        if (!product.name.trim() || !product.category || !product.photo) {
            setError('Please fill out all fields.');
            return;
        }
        try {
            createProduct(data).then((response) => {
                if (response.data._id) {
                    navigate('/')
                }
            }).catch((error) => console.log(error))

        } catch (error) {

        }
        // setProduct({
        //     name: '',
        //     price: 0,
        //     description: '',
        //     quantity: 0,
        //     photo: '',
        //     category: '',
        //     shipping: '',
        // });
    };
    useEffect(() => {

        getAllCategories().then((response) => {
            if (response.data) {
                setCategories(response.data)
            }
        }).catch((err) => console.log(err))
    }, []);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1>Create Product</h1>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        name="name"
                                        value={product.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <TextField
                                        label="Quantity"
                                        variant="outlined"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <TextField
                                        label="Price"
                                        variant="outlined"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <TextField
                                        label="Shipping"
                                        variant="outlined"
                                        name="shipping"
                                        value={product.shipping}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <TextField
                                        label="Description"
                                        variant="outlined"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={product.category}
                                        name="category"
                                        onChange={handleChange}
                                        label="Category"
                                    >
                                        {categories.map((cat) => (
                                            <MenuItem key={cat?._id} value={cat?._id}>
                                                {cat?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" required fullWidth>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Grid>
                        {error && <p>{error}</p>}
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FormComponent;
