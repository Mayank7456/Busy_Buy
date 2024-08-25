import { useValue } from '../../contextAPI/context';
import styles from './FilterForm.module.css';

function FilterForm() {
    // Accessing the states from the context API
    const { setRangeValue,rangeValue} = useValue();
    // pending: filter using checkbox is not complted yet

    return(
            <div className={styles.filterSection}  >
                <ul>
                    <li><h2>Filter</h2></li>
                    <li><p>Price: {(rangeValue * 83).toFixed(0)}</p></li>
                    <li><input type='range' step="10" value={rangeValue} min="5" max="1000" onChange={(e) => setRangeValue(e.target.value)}/></li>
                    <li><h2>Category</h2></li>
                    <li>
                        <input type="checkbox" id="men-cloth" name="men's clothing"  />
                        <label htmlFor="men-cloth" >Men's Clothing</label>
                    </li>
                    <li>
                        <input type="checkbox" id="women-cloth" name="women's clothing"  />
                        <label htmlFor="women-cloth" >Women's Clothing</label>
                    </li>
                    <li>
                        <input type="checkbox" id="jewelery" name='jewelery'  />
                        <label htmlFor="jewelery" >Jewelery</label>
                    </li>
                    <li>
                        <input type="checkbox" id="electronic" name='electronics'  />
                        <label htmlFor="electronic" >Electronics</label>
                    </li>
                </ul>
            </div>
        )
}

export default FilterForm;