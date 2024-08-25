import { useValue } from "../../contextAPI/context";
import FilterForm from "../Filter/FilterForm";
import ItemList from "../Store/ItemList/ItemList";
import styles from "./Main.module.css";

function Main() {
    // Accessing the states from the context API
    const {searchQuery, handleInputChange} = useValue();
    return(
        <main>
        {/* Searching Section */}
            <div className={styles.searchSection} >
                <input 
                    placeholder="Search By Name" 
                    type="search" 
                    value={searchQuery}
                    onChange={handleInputChange}
                />
            </div>
        {/* Filter Section */}
            <FilterForm />
        {/* Store Section */}
            <ItemList />
        </main>
    )
}

export default Main;