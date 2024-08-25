// Importing necessary dependencies and hooks
import { useContext, createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firestoreConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

// Creating a context
const context = createContext();

// Custom hook to access context value
function useValue() {
    const value = useContext(context);
    return value;
}

// CustomContext component
function CustomContext({children}) {
    // Auth
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    // Cart
    const [cartItem, setCartItem] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderData, setOrderData] = useState([]);
    // Filter
    const [searchQuery, setSearchQuery] = useState('');
    const [ rangeValue,setRangeValue ] = useState(9);
    // this is not working yet
    // const [checkBoxQuery, setCheckBoxQuery] = useState({
    //     checkBox1: '',
    //     checkBox2: '',
    //     checkBox3: '',
    //     checkBox4: ''
    // });

    // Auth : Effect to initialize user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [userLoggedIn]);

    // Function to initialize user state based on authentication state
    async function initializeUser(user) {
        
        setCurrentUser(user || null);
        setUserLoggedIn(!!user);
    }
    
    // Effect to fetch cart items when currentUser changes
    useEffect(() => {
        if(!currentUser || !currentUser.uid){
            return;
        }
        const fetchCartItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users", currentUser.uid, "cart"));
                const cartItems = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCartItem(cartItems);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        
        fetchCartItems();
        
        const unsubscribe = onSnapshot(collection(db, "users", currentUser?.uid, "cart"), () => {
            fetchCartItems();
        });
        
        return () => unsubscribe();
    }, [currentUser])

    // Effect to fetch order data
    useEffect(() => {
        if(!currentUser || !currentUser.uid){
            return;
        }
        const fetchordersData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users", currentUser.uid, "order"));
                const order = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                const sortOrder = order.sort((a,b) => b.currentTime - a.currentTime);
                setOrderData(sortOrder);
            } catch (error) {
                console.error("Error fetching orders data:", error);
            }
        };
        
        fetchordersData();
        
        const unsubscribe = onSnapshot(collection(db, "users", currentUser?.uid, "order"), () => {
            fetchordersData();
        });
        
        return () => unsubscribe();
    }, [currentUser])

    // Effect to calculate Total price when cartItem changes
    useEffect(() => {
        const handleTotalPrice = () => {
            let totalPrice = 0;
            cartItem.forEach((item) => {
                totalPrice += item.item.price * 83 * item.item.cartCount;
            });
            setTotalPrice(totalPrice.toFixed(0));
        }
        handleTotalPrice();
    }, [cartItem]);


    // Function to add items to Cart
    async function addCart(item) {
        try {
            const isItemInCart = cartItem.some(cartItem => cartItem.item.id === item.id);

            if (!isItemInCart) {
                const updatedItem = { ...item, cartCount: 1 };

                await addDoc(collection(db, "users", currentUser.uid, "cart"), {
                    item: updatedItem
                });

                toast.success("Item Added");
            } else {
                toast.warn("Item Already in Cart, Increase quantity please !")
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
            toast.error("Failed to add item to cart ,User should login to use cart");
        }
    }
    
    // Function to remove item from cart
    function removeCart(id) {
        deleteDoc(doc(db, "users", currentUser.uid, "cart", id))
            .then(() => {
                toast.success("Item Removed");
            })
            .catch((error) => {
                console.error("Error removing item from cart:", error);
                toast.error("Failed to remove item from cart");
            });
    }
    
    // Function to dicrease cart count
    async function cartCountDicrease(id) {
        const docRef = doc(db, "users", currentUser.uid, "cart", id);
        try {
            const docSnap = await getDoc(docRef);
            const currentCount = (docSnap.data().item.cartCount);
            if(currentCount > 1){
                const newCount = currentCount - 1   
                await updateDoc(docRef, {
                    "item.cartCount": newCount
                });
            }
        } catch (error) {
            console.error("Error updating cart count:", error);
        }
    }
    
    // Function to increase cart count
    async function cartCountIncrease(id) {
        const docRef = doc(db, "users", currentUser.uid, "cart", id);
        try {
            const docSnap = await getDoc(docRef);
            const newCount = (docSnap.data().item.cartCount) + 1;

            await updateDoc(docRef, {
                "item.cartCount": newCount
            });
        } catch (error) {
            console.error("Error updating cart count:", error);
        }
    }

    // Function to handle orders
    const handleOrders = () => {
        let currentTime = new Date();

        addDoc(collection(db, "users", currentUser.uid, "order"), {
            cartItem,
            totalPrice,
            currentTime
        });

        cartItem.forEach((item) => {
            removeCart(item.id)
        })

        toast.success("Ordered Success");
        
    }

    // Function to handle search input change
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value)
    }

    // Function to handle checkbox filter
    const handleCheckBoxFilter = (event) => {
        console.log(event.target.checked);
    }

    // Providing context value to children components
    return (
        <context.Provider 
        value={
            {
                cartItem, totalPrice,
                setCartItem, setTotalPrice, removeCart, addCart, cartCountDicrease, cartCountIncrease,
                orderData, 
                setOrderData, handleOrders,
                searchQuery, rangeValue,
                handleInputChange, handleCheckBoxFilter, setRangeValue,
                currentUser, userLoggedIn, 
                setCurrentUser, setUserLoggedIn,
                loading, setLoading
            }
        }>

            {children}

        <ToastContainer 
            autoClose={2000} 
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition= {Zoom}
        />
        </context.Provider>
    )
}

export {useValue};
export default CustomContext;