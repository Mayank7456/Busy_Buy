import { Link, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";
import homeLogo from "../../assets/logos/home.png";
import storeLogo from "../../assets/logos/Store.png";
import cartLogo from "../../assets/logos/Cart.png";
import signInLogo from "../../assets/logos/signin.png";
import { useValue } from "../../contextAPI/context";
import { auth } from "../../firebase/firestoreConfig";
import { toast } from "react-toastify";


function Navbar() {
    // Accessing the userLoggedIn state from the context API
    const { userLoggedIn } = useValue();

    // Function to handle user logout
    async function handleLogout () {
        await auth.signOut();
        toast.success('Signout Success')
    }

    return (
        <>
            <nav>
                <div className={styles.logoContainer} >
                    <p>Busy Buy</p>
                </div>
                <div className={styles.menuButtons} >
                    <Link to="/Busy_Buy" >
                        <div className={styles.homeButton} >
                            <img src={homeLogo} alt="" width="35px" ></img>
                            <p>Home</p>
                        </div>
                    </Link>
                    <Link to="/Busy_Buy/my-orders" >
                        <div className={styles.orderButton} >
                            <img src={storeLogo} alt="" width="35px" ></img>
                            <p>My Orders</p>
                        </div>
                    </Link>
                    <Link to="/Busy_Buy/cart" >
                        <div className={styles.cartButton} >
                            <img src={cartLogo} alt="" width="35px" ></img>
                            <p>Cart</p>
                        </div>
                    </Link>
                    <Link to="/Busy_Buy/Auth/sign-in" >
                    {userLoggedIn ?
                        <div className={styles.signInButton} onClick={handleLogout} >
                            <img src={signInLogo} alt="" width="35px" ></img>
                            <p>Log out</p>
                        </div>
                        :
                        <div className={styles.signInButton} >
                            <img src={signInLogo} alt="" width="35px" ></img>
                            <p>Sign In</p>
                        </div>
                    }
                    </Link>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar;