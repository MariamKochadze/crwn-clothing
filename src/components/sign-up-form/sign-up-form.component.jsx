import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formField;

    console.log(formField);

    const resetFormField = () => {
        setFormField(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            if (!response) {
                throw new Error('User creation failed');
            }
            const { user } = response;
            await createUserDocumentFromAuth(user, { displayName });
            resetFormField();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('User creation encountered an error', error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label='Display Name'
                onChange={handleChange} 
                name='displayName' 
                value={displayName} 
                required 
                />
                <FormInput
                label='Email'
                onChange={handleChange} 
                name='email' 
                value={email} 
                required 
                />
                <FormInput
                label='Password'
                onChange={handleChange} 
                name='password' 
                value={password} 
                required 
                />
                <FormInput
                label='Password'
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword} 
                required 
                />
                <Button type="submit" buttonType='inverted'>Sign-Up</Button> 
            </form>
        </div>
    )
}
export default SignUpForm;
