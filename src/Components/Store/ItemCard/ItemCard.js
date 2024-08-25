import styles from "./ItemCard.module.css";
import inc from "../../../assets/logos/increment.png";
import dic from "../../../assets/logos/dicrement.png";
import { useValue } from "../../../contextAPI/context";

function ItemCard({item, id}) {
    // Accessing the states from the context API
    const {removeCart, addCart, cartCountDicrease, cartCountIncrease} = useValue();

    return(
        <div className={styles.itemCard} >
            <div className={styles.imgContainer} >
                <img src={item.image} alt="item img not found" />
            </div>
            <div className={styles.itemDetails} > 
                <p className={styles.title} >{item.title}</p>
                <p className={styles.price} >
                    &#x20b9; {(item.price * 83).toFixed(0)} 
                    {item.cartCount && 
                    <span className={styles.cartSelection} >
                        <img src={dic} alt="-" onClick={() => cartCountDicrease(id)} />
                        <span className={styles.cartCount} >{item.cartCount}</span>
                        <img src={inc} alt="+" onClick={() => cartCountIncrease(id)} />
                    </span>
                    }
                </p>
            </div>
            <div className={styles.buttonContainer} >
                {item.cartCount ? 
                <button 
                className={styles.removeButton} 
                onClick={() => removeCart(id)}
                >Remove From Cart 
                </button>
                :
                <button 
                className={styles.addButton } 
                onClick={() => addCart(item)} 
                >Add To Cart 
                </button>
                }
            </div>
        </div>
    )
}

export default ItemCard;