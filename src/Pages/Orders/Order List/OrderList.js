import { useValue } from "../../../contextAPI/context";
import OrderCard from "../Order card/OrderCard";
import styles from "./OrderList.module.css";

function OrderList() {

    // Accessing the orderData state from the context API
    const {orderData} = useValue();

    return(
        <section className={styles.orderListSection} >
            {orderData.length  === 0 ? <p className={styles.emptyMSG} >No Record Found !</p> :
            <>
            {orderData.map((order,i) => (
                <OrderCard key={i} order={order} />
                ))}
            </>
            }
        </section>
    )
}

export default OrderList;