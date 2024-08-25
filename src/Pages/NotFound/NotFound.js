import { Link } from "react-router-dom";
import defaultError from "../../assets/logos/404.png";
import styles from "./NotFound.module.css";

function NotFound() {
    return(
        <div className={styles.errorPage} >
            <img src={defaultError} alt="404 Error, Page Not Found !" />
            <Link to="Busy_Buy/" className={styles.homeButton} ></Link>
        </div>
    )
}

export default NotFound;