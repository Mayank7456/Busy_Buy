import ItemCard from "../../Components/Store/ItemCard/ItemCard";
import { useValue } from "../../contextAPI/context";
import styles from "./Cart.module.css";

function Cart() {

    // Accessing the states from the context API
    const {cartItem, totalPrice, handleOrders} = useValue();
    
    return (
        <>
        {cartItem.length === 0 ?
            <p className={styles.emptyMSG} >Cart is Empty !</p> :
            <> 
            {/* Purchase form */}
            <div className={styles.purchaseSection} >
                <ul>
                    <li><h2>Total Price </h2></li>
                    <li><h2> &#x20b9; {totalPrice} /-</h2></li>
                    <li><button onClick={handleOrders} >Purchase</button></li>
                </ul>
            </div>
            {/* Cart List */}
            <section className={styles.storeItemSection} >
                {cartItem.map((item, i) => (
                    <ItemCard key={i} item={item.item} id={item.id} />
                    ))}
            </section>
            </>
        }
        </>
    )
}

export default Cart;