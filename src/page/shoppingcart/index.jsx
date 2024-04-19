import React , { useState } from 'react'
import CartItem from './CartItem'; // Import CartItem component
import { useCart } from "react-use-cart";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import AOS from "aos";
import {jwtDecode } from 'jwt-decode'; // Thư viện để giải mã token JWT

import "aos/dist/aos.css";
function Cart() {
    const [orderPopup, setOrderPopup] = React.useState(false);
    const [checkout, setcheckout] = useState(false);

    const handleclickCheckout = () => {
      setcheckout(!checkout); // Đảo ngược giá trị của checkout khi nút CHECKOUT được nhấp
    };
    const handleOrderPopup = () => {
      setOrderPopup(!orderPopup);
    };
    React.useEffect(() => {
      AOS.init({
        offset: 100,
        duration: 800,
        easing: "ease-in-sine",
        delay: 100,
      });
      AOS.refresh();
    }, []);
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        // emptyCart
      } = useCart();
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar handleOrderPopup={handleOrderPopup} />

        <div className="bg-gray-100 h-screen py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-4">
           
              <div className="md:w-3/4">
              {checkout ? (
              <Checkout></Checkout>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left font-semibold">Product</th>
                        <th className="text-left font-semibold">Price</th>
                        <th className="text-left font-semibold">Quantity</th>
                        <th className="text-left font-semibold">Total</th>
                        <th className="text-left font-semibold"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <CartItem
                          key={index}
                          item={item}
                          index={index}
                          updateItemQuantity={updateItemQuantity}
                          removeItem={removeItem}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                     )}
              </div>
          
              <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    <span>$1.99</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
    
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${cartTotal}</span>
                  </div>
                  <button onClick={handleclickCheckout} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                    Checkout
                  </button>
                </div>
              </div>
              
            </div>
            
          </div>
          
        </div>
      <Footer />

    </div>
  );
}


function Checkout() {

    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState('');

    const {
        items,
        emptyCart
      } = useCart();

    
    const handleCheckout = async (e) => {
      e.preventDefault();
        try {
          const token = localStorage.getItem('login');
          if(!token) {
            alert('Xin vui lòng đăng nhập');
          }
          else {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
            let id = '';
            if (decodedToken.exp > currentTime) {
                id = decodedToken.id;
            }else {
              // Xử lý trường hợp token hết hạn hoặc không hợp lệ
              console.error('Token expired or invalid');
            }
              // hàm tính tổng
          const totalAmount = items.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.itemTotal;
          }, 0);
                // Lấy ngày hôm nay
          const today = new Date();
          // Định dạng ngày thành chuỗi theo định dạng "YYYY-MM-DD"
          const formattedDate = today.toISOString().split("T")[0];
          // Tạo dữ liệu đơn hàng từ các sản phẩm trong giỏ hàng hoặc dữ liệu cần thiết khác
          const checkoutData = {
            invoice_date : formattedDate,
            user_id: id, // Sử dụng id thay vì user_id
            customer_name:lastname,
            phone : phone,
            total : totalAmount,
            status: "Đang Đợi",
            addrress: address,
            invoice_items: items.map(item => ({
              product_id: item._id, // Đây là id của sản phẩm trong giỏ hàng
              name: item.title,
              price: item.price, // Đây là giá của sản phẩm trong giỏ hàng
              quantity: item.quantity, // Đây là số lượng của sản phẩm trong giỏ hàng
              itemTotal: item.itemTotal
            }))
          };
          console.log(checkoutData.invoice_items);
          // Gọi API checkoutawait axios.post("http://localhost:3000/auth/login"
          const response = await axios.post("http://localhost:3000/order/checkout", checkoutData);

          
          // Xử lý kết quả từ server nếu cần
          console.log('Checkout successful:', response.data);
          alert('Checkout successful');
          emptyCart();
          
          }
        
        } catch (error) {
          // Xử lý lỗi nếu có
          console.error('Error during checkout:', error.response.data);
        }
    };

    
    return(
        <div className="flex items-center justify-center bg-white rounded-lg p-2">
    <div className="mx-auto w-full ] ">
        <form >
            <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Full Name
                </label>
                <input   value={lastname}
            onChange={(e) => setLastname(e.target.value)} type="text" name="name" id="name" placeholder="Full Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Phone Number
                </label>
                <input   value={phone}
           onChange={(e) => setPhone(e.target.value)} type="text" name="phone" id="phone" placeholder="Enter your phone number"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
          
            <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Address Details
                </label>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="area" id="area" placeholder="Enter area"
                                onChange={(e) => setAddress(e.target.value)} value={address}  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                   
                </div>
            </div>

            <div>
                <button onClick={handleCheckout}
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Hoàn Thành CheckOut
                </button>
            </div>
        </form>
    </div>
</div>
    )
}
export default Cart