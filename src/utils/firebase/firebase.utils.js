import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBy_EXMhiA0zLa7xQwRrRprYvgbKfR4VbY',
    authDomain: 'crwn-clothing-35be6.firebaseapp.com',
    projectId: 'crwn-clothing-35be6',
    storageBucket: 'crwn-clothing-35be6.appspot.com',
    messagingSenderId: '19230583975',
    appId: '1:19230583975:web:96a04a261fe55476ccbf82',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createAt, ...additionalInformation });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error('Error creating user with email and password', error);
        throw error;
    }
};
