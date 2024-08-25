import { Link, Navigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useRef } from "react";
import { useValue } from "../../../contextAPI/context";
import { auth } from "../../../firebase/firestoreConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

function SignUp() {

    // Accessing the userLoggedIn state from the context API
    const {userLoggedIn, loading, setLoading} = useValue();

    // Creating references for name, email and password input fields
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    // Function to handle form submission for SignUp from firebase/Auth
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth,emailRef.current.value, passRef.current.value)
            setLoading(false);
            toast.success('Welcome')
            clearInput();
        } catch (error) {
            setLoading(false);
            if(error.code === 'auth/email-already-in-use'){
                toast.warn('Already have an account')
            }
            else{
                toast.error(error.code)
            }
        }
    }

    // Reset input fields after submission
    function clearInput() {
        nameRef.current.value = "";
        emailRef.current.value = "";
        passRef.current.value = "";
    }

    return (
        <>
        {loading ? <p className={styles.load} >Loading....</p> :
        <div className={styles.formContainer}>
            {userLoggedIn && (<Navigate to={'/Busy_Buy'} replace={true} />)}
            <form onSubmit={handleSubmit} >
                <h2 className={styles.formHeading} >Sign up</h2>
                <ul className={styles.formList} >
                    <li className={`${styles.listItem} ${styles.inputBorder}`} >
                        <i className="fa-solid fa-circle-user"></i>
                        <input className={styles.inputField} placeholder="name" type="text" ref={nameRef} required />
                    </li>
                    <li className={`${styles.listItem} ${styles.inputBorder}`} >
                        <i className="fa-solid fa-lock"></i>
                        <input className={styles.inputField} placeholder="email" type="email" ref={emailRef} required />
                    </li>
                    <li className={`${styles.listItem} ${styles.inputBorder}`} >
                        <i className="fa-solid fa-key"></i>
                        <input className={styles.inputField} placeholder="Password, atleast 6 digits" type="password" pattern=".{6,}" ref={passRef} required />
                    </li>
                    <div className={styles.renderSignIn} >
                        <Link to="/Auth/sign-in" >Already have an account? Signin</Link>
                    </div>
                    <div className={styles.submitButton} >
                        <button>Sign Up</button>
                    </div>
                </ul>
            </form>
        </div>
        }
        </>
    )
}

export default SignUp;