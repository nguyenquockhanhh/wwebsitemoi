import React from 'react'

function CartItem({ item , index, updateItemQuantity, removeItem }) {
  return (
    <>
      <tr key={index}>
        <td className="py-4">
          <div className="flex items-center">
            <img
              className="h-16 w-16 mr-4"
              src={item.linkImg}
              alt="Product image"
            />
            <span className="font-semibold">{item.title}</span>
          </div>
        </td>
        <td className="py-4">${item.price}</td>
        <td className="py-4">
          <div className="flex items-center">
            <button
              className="border rounded-md py-2 px-4 mr-2"
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span className="text-center w-8">{item.quantity}</span>
            <button
              className="border rounded-md py-2 px-4 ml-2"
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
        </td>
        <td className="py-4">${item.itemTotal}</td>
        <td className="py-4">
          <button onClick={() => removeItem(item.id)} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default CartItem