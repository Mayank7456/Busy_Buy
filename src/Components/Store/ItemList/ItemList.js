import ItemCard from "../ItemCard/ItemCard";
import styles from "./ItemList.module.css";
import { store } from "../../../data/StoreData";
import { useValue } from "../../../contextAPI/context";

function ItemList() {

    // Accessing the states from the context API
    const {searchQuery, rangeValue} = useValue();
    // Filter store items
    let filteredData = store.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) && item.price >= rangeValue );

    return(
        <section className={styles.storeItemSection} >
            {filteredData.map((item,i) => (
                <ItemCard key={i} item={item}  />
            ))}
        </section>
    )
}

export default ItemList;