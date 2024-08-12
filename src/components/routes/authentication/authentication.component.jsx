import { createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect } from "../../../utils/firebase/firebase.utils"
import SignInForm from '../../sign-in-form/sign-in-form.component'
import SignUpForm from "../../sign-up-form/sign-up-form.component";


const Authentication = () => {
    const logGoogleUser = async() => {
        const {user} =await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    const logGoogleRedirectUser = async() => {
        const {user} =await signInWithGoogleRedirect();
        console.log({user})
        
    }

    return(
        <>
        <h1>
            This is a sign in page.
        </h1>
        <SignInForm/>
        <SignUpForm/>
        </>
    )
}

export default Authentication;