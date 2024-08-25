import styles from "./OrderCard.module.css";

function OrderCard({order}) {

    // Access order date from firestore database and formatted it.
    const orderDate = order.currentTime.toDate()
    let formattedTime = orderDate.toLocaleString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return(
        <div className={styles.orderCard} >
            <h1>Your Orders</h1>
            <p>Orderes on:- {formattedTime}</p>
            <div className={styles.orderDetailContainer} >
               <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.cartItem.map((orderData,i) => (
                    <tr key={i} >
                        <td className={styles.titleField} >{orderData.item.title}</td>
                        <td>&#x20b9; {(orderData.item.price * 83).toFixed(0)}</td>
                        <td> x {orderData.item.cartCount}</td>
                        <td>&#x20b9; {(orderData.item.price * 83 * orderData.item.cartCount).toFixed(0)}</td>
                    </tr>
                    ))}
                </tbody>
               </table>
                <p className={styles.grandTotal} >Total : &#x20b9; {order.totalPrice} /-</p>
            </div>
        </div>
    )
}

export default OrderCard;