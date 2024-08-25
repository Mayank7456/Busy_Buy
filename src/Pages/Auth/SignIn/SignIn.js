import { Link, Navigate } from "react-router-dom";
import styles from "../SignUp/SignUp.module.css";
import { useValue } from "../../../contextAPI/context";
import { useRef } from "react";
import { auth } from "../../../firebase/firestoreConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

function SignIn() {

    // Accessing the userLoggedIn state from the context API
    const {userLoggedIn, setLoading, loading} = useValue();
    // Creating references for email and password input fields
    const emailRef = useRef();
    const passwordRef = useRef();

    // Function to handle form submission for SignIn from firebase/Auth
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value);
            setLoading(false)
            toast.success('Welcome ')
        } catch (error) {
            setLoading(false)
            if(error.code === 'auth/invalid-credential'){
                toast.warn('Invalid Email/Password')
            }
            else{
                toast.error(error.code)
            }
        }
    }
    
        return(
            <>
            {loading ? <p className={styles.load} >Loading....</p> :
            <div className={styles.formContainer}>
                {userLoggedIn && (<Navigate to={'/Busy_Buy'} replace={true} />) }
                <form onSubmit={handleSubmit} >
                    <h2 className={styles.formHeading} >Sign In</h2>
                    <ul className={styles.formList} > 
                        <p className={styles.test} > You can use below email & pass for testing purpose - <br/> Email: test@gmail.com <br/> Password: 123456</p>
                        <li className={`${styles.listItem} ${styles.inputBorder}`} > 
                            <i className="fa-solid fa-lock"></i> 
                            <input className={styles.inputField} name="email" placeholder="email" type="email" ref={emailRef} /> 
                        </li>
                        <li className={`${styles.listItem} ${styles.inputBorder}`} > 
                            <i className="fa-solid fa-key"></i> 
                            <input className={styles.inputField} placeholder="Password" type="password" ref={passwordRef} /> 
                        </li>
                        <div className={styles.renderSignIn} >
                            <Link to="/Busy_Buy/Auth/sign-up" >Don't have an account? Signup</Link>
                        </div>
                        <div className={styles.submitButton} >
                            <button >Sign In</button>
                        </div>
                    </ul>
                </form>
            </div>
            }
            </>
        )
}

export default SignIn;