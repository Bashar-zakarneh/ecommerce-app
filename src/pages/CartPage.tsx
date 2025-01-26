import { useCartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart } = useCartContext();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Shopping Cart
      </h1>

      <div className="border rounded-lg shadow-lg p-6">
        {cart.items.length === 0 ? (
          <div className="text-center text-lg text-gray-500">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain mr-4"
                        />
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-red-500 cursor-pointer">
                        <button onClick={() => handleRemoveItem(item.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-xl font-semibold">Total:</div>
              <div className="text-xl font-semibold">
                $
                {cart.items
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const handleRemoveItem = (id: number) => {
  console.log("Removing item with id:", id);
};

export default CartPage;
