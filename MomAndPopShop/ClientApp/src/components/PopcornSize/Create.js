﻿import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
        case 'name':
            errorMessage = value.length < 3 || value.length > 50 ? 'Name must be between 3 and 50 characters' : '';
            break;
        case 'description':
            errorMessage = value.length < 3 || value.length > 500 ? 'Description must be between 3 and 500 characters' : '';
            break;
        case 'popcornSizePrice':
            errorMessage = value < 0.01 ? 'Price must be 0.01 or greater' : '';
            break;
        case 'quantity':
            errorMessage = value < 1 ? 'Quantity must be 1 or greater' : '';
            break;
        default:
            break;
    }
    return errorMessage;
};

const Create = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        popcornSizePrice: 0,
        quantity: 0
    });

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        description: '',
        popcornSizePrice: '',
        quantity: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let errorMessage = validateField(name, value);

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage
        }));

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        for (const key in validationErrors) {
            if (validationErrors[key]) {
                console.error('Validation error:', validationErrors[key]);
                setIsLoading(false);
                return;
            }
        }

        try {
            const response = await fetch('/popcornSize/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('PopcornSize item created successfully');
                navigate('/popcornSize');
            } else {
                console.error('Error creating popcornSize item');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Create PopcornSize Item</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Name">PopcornSize Name</label>
                    <input
                        type="text"
                        id="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.name}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="Description">PopcornSize Description</label>
                    <input
                        type="text"
                        id="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.description}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="PopcornSizePrice">PopcornSize Price</label>
                    <input
                        type="number"
                        id="PopcornSizePrice"
                        name="popcornSizePrice"
                        value={formData.popcornSizePrice}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.popcornsizePrice}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="Quantity">PopcornSize InStock Quantity</label>
                    <input
                        type="number"
                        id="Quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.quantity}</span>
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <input type="submit" value="Add Item" />
                )}
            </form>
        </div>
    );
};

export default Create;