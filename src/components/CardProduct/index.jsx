import React from 'react';
import { useCart } from "react-use-cart";

function Card(props) {
  const { _id, title, price, linkImg } = props.item;
  const { addItem } = useCart();
  const handleAddToCart = () => {
    // Ánh xạ thuộc tính _id sang id
    const itemWithId = { ...props.item, id: _id };
    addItem(itemWithId);
    alert("đã thêm Sản Phẩm vào giỏ hàng");
  };
  return (
    <>
       <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="relative overflow-hidden">
                    <img className="object-cover w-full h-full" src={props.item.linkImg} alt="Product" />
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">View Product</button>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4">{props.item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-900 font-bold text-lg">${props.item.price}</span>
                    <button onClick={handleAddToCart} className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Add to Cart</button>
                </div>
            </div>
    </>
  );
}

export default Card;
