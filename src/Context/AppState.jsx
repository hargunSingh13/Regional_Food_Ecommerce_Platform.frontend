import React, { useEffect ,useState} from 'react'
import AppContext from './AppContext'
import axios from 'axios';
import { toast, Slide,Bounce } from 'react-toastify';
import { connect } from 'mongoose';

const AppState = (props) => {
    const url = "https://regional-food-ecommerce-platform-backend.onrender.com/api";
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const[user, setUser] = useState();
    const [filterData, setFilterData] = useState([]);
    const [cart, setCart] = useState([]);
    const [reload, setReload] = useState(false);
    const [userAddress, setUserAddress] = useState([])
    const [orderDetails, setOrderDetails] = useState([]);
    const [stateData, setStateData] = useState([])
    const [mode, setMode] =useState("")
    const [orders,setOrders] = useState([])

    
    

    
    let sum = 0;
  {cart?.items?.map((i)=> (
    sum += i.price
  ))}

    useEffect(()=>{
        const fetchProduct = async ()=>{
            const api = await axios.get(`${url}/product/all`,{
                headers: {
                    "Content-Type": "Application/json",
                },
                withCredentials: true,
            });
            console.log(api.data.products);
            setProducts(api.data.products)
            setFilterData(api.data.products);

        };
        fetchProduct();
        userProfile();
        userCart();
        getAddress();
        getOrderDetails();
        getState();
        getUserOrders();
        }, [token, reload]);

        const AddProduct = async(name,origin,category,qty,description,image,pricePerUnit,price, mode, bestSeller)=>{
            const api = await axios.post(`${url}/product/addproduct`,
                {name,origin,category,qty,description,image,pricePerUnit,price,mode, bestSeller},
                {
                    headers:{
                        'Content-Type':'Application/json'
                    },
                withCredentials: true
                }
            );
            return api.data;
        }

        const addState = async(state, image)=>{
            const api = await axios.post(`${url}/state/add`,
                {state, image},
                
                {
                    headers:{
                        'Content-Type':'Application/json'
                    },
                withCredentials: true
                }
            );
            return api.data;
        }

        const getState = async() =>{
            const api = await axios.get(`${url}/state/get`,{
                headers: {
                    "Content-Type": "Application/json",
                },
                withCredentials: true,
            });
            console.log(api.data.state_data)
            setStateData(api.data.state_data);
        }

        const Registration = async(name, email, password)=>{
            const api = await axios.post(`${url}/user/register`,
                {name, email, password},
                {
                    headers:{
                        'Content-Type': 'Application/json'
                    },
                withCredentials: true
                }
            );
            if (api.data.success){
                console.log("success")
                toast.success('User Registered Successfully', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                    });
            }
            else{
                toast.warn("user already registered", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }
            return api.data;
        }
        const userProfile = async(authToken) => {
            const api = await axios.get(`${url}/user/profile`, {
                headers: {
                    "Content-Type": "Application/json",
                    auth: authToken,
                },
                withCredentials: true,
            });
        
            const profile = api.data.user_profile_data;
            setUser(profile);
            return profile;
        };
        

        const Login = async (email, password) => {
            const api = await axios.post(`${url}/user/login`,
                { email, password },
                {
                    headers: { 'Content-Type': 'Application/json' },
                    withCredentials: true,
                }
            );
        
            if (api.data.success) {
                const freshToken = api.data.token;
        
                setToken(freshToken);
                localStorage.setItem("token", freshToken);
                setIsAuthenticated(true);
        
                const profile = await userProfile(freshToken); // ✅ pass the correct token
        
                toast.success(`Welcome ${profile?.name}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            } else {
                toast.warn("Invalid Credentials", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        
            return api.data;
        };
        

        useEffect(()=>{
            let lstoken = localStorage.getItem("token");
            if (lstoken){
                setToken(lstoken);
                setIsAuthenticated(true);
            }
        }, []);

        

        const addToCart = async (productId, name, price, qty, image, source) => {
            if(isAuthenticated ){
                if(source === "productPage"){
                toast.success(`Added to cart!`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                
                })
                }
            }
            else{
                toast.warn("Please login first to add items to cart.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
            const api = await axios.post(
                `${url}/cart/add`,
                {productId, name, price, qty, image},
                {
                    headers: {
                        "Content-Type": "Application/json",
                        auth: token,
                    },
                    withCredentials: true,
                }
            );
            //setHeading("Explore our BestSellers")
            setReload(!reload)
            console.log("My cart"+ api);

        }

        const Logoutuser = ()=>{
            setIsAuthenticated(false);
            setToken("")
            localStorage.removeItem("token");
            toast.success('Logout SUCCESSFULLY', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }

        const userCart = async () => {
            const api = await axios.get(`${url}/cart/get`, {
                headers: {
                "Content-Type": "Application/json",
                auth: token,
                },
                withCredentials: true,
            });
           
            setCart(api.data.cart_data);
            // console.log("cart data=========",api.data.cart_data)
            // console.log("cart data    length=========",api.data.cart_data.items.length)
        }

        const decreaseQty = async(productId, qty)=>{
            const api = await axios.post(
                `${url}/cart/--qty`,
                {productId, qty},
                {
                    headers: {
                        "Content-Type":"Application/json",
                        auth: token,
                    },
                    withCredentials: true,
                }
            );
            console.log("dec====", api)
            console.log("dec====", api.data)
            setReload(!reload)
        }

        

        const removeProduct = async(productId)=>{    ///remove/:productId
            const api = await axios.delete(
                `${url}/cart/remove/${productId}`,
                {
                    headers: {
                        "Content-Type":"Application/json",
                        auth: token,
                    },
                    withCredentials: true,
                }
            );
            setReload(!reload)
        }

        const clearCart = async()=>{    ///remove/:productId
            const api = await axios.delete(
                `${url}/cart/clear`,
                
                {
                    headers: {
                        "Content-Type":"Application/json",
                        auth: token,
                    },
                    withCredentials: true,
                }
            );
            setReload(!reload)
        }

        const addAddress = async(fullName, email, address, city, state, country, pincode ,phoneNumber )=>{
            const api = await axios.post(`${url}/address/add`,
                {fullName, email, address, city, state, country, pincode ,phoneNumber},
                {
                    headers:{
                        'Content-Type':'Application/json',
                        auth: token,
                    },
                withCredentials: true
                }
            );
            return api.data;
        }

        const getAddress = async()=>{
            const api = await axios.get(`${url}/address/get`,{
                headers:{
                    'Content-Type':'Application/json',
                    auth: token,
                },
                withCredentials: true
            });
            
            setUserAddress(api.data.address_data)
            //console.log(api.data.address_data)
        }

        const savePaymentDetails = async(paymentData) => {
            try{
                const response = await axios.post(`${url}/payment/add`, paymentData,{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if(response.data.success){
                    console.log("payment details saved:", response.data.payment);
                    return {success: true};
                }
                else{
                    console.error("failed to save payment details:", response.data.message)
                    return {success: false, message: response.data.message};
                }
            }
            catch(error){
                console.error("error saving payment details:", error);
                return{success: false, message: "error in saving payment details"}
            }
        }

        const getOrderDetails = async() =>{
            const result = await axios.get(`${url}/payment/get`,{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(result.data.order_data)
            setOrderDetails(result.data.order_data);
        }

        const saveOrderDetails = async (orderData) => {
            const token = localStorage.getItem("token");
          
            try {
              const res = await axios.post(`${url}/prevOrders/post`, orderData, {
                headers: {
                  'Content-Type': 'application/json',
                  'auth': token,
                },
              });
          
              console.log('Order placed successfully:', res.data.order);
            } catch (err) {
              console.error('Error placing order:', err);
            }
          };
          
          const getUserOrders = async () => {
            const token = localStorage.getItem("token");
          
            try {
              const res = await axios.get(`${url}/prevOrders/get`, {
                headers: {
                  'Content-Type': 'application/json',
                  'auth': token,
                },
              });
          
              console.log('User Orders:', res.data);
              setOrders(res.data);
            } catch (error) {
              console.error('Error fetching orders', error);
            }
          };

          const adminLogin = async (email, password) => {
            try {
              const api = await axios.post(`${url}/admin/adminLogin`,
                { email, password },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  withCredentials: true,
                }
              );
          if (api.data.success){
              
              localStorage.setItem("role", "Admin");
              console.log("Admin login successful");
          }
              return api.data;
            } catch (err) {
              console.error("Admin login error:", err);
              throw err; // re-throw so the calling component can handle it
            }
          };
      
   
  return (
    <AppContext.Provider value={{products, AddProduct, addState, Registration, Login, user, isAuthenticated, filterData, setFilterData, addToCart, Logoutuser, cart, decreaseQty, removeProduct, clearCart, addAddress, userAddress, sum, savePaymentDetails, orderDetails, stateData, mode, setMode, saveOrderDetails, orders, adminLogin}}>
        {props.children}
    </AppContext.Provider>
  )
}
export default AppState
