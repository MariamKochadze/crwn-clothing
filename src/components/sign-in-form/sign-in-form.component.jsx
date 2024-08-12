import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

const defaultFormField = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { email, password } = formField;

    console.log(formField);

    const resetFormField = () => {
        setFormField(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
           resetFormField();
        } catch (error) {}

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({ ...formField, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Already have have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <Button type="submit" buttonType='inverted'>Sign-In</Button> 
            </form>
        </div>
    )
}
}
export default SignInForm ;
