import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeProductCart, sumProduct, restProduct, total } = useCart();

  if (cartItems.length === 0) {
    return <p className="p-6 text-center">El carrito está vacío</p>;
  }

  return (
    <div className="p-4">
      <h2 className="font-bold text-5xl mb-6">Carrito</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-wrap border-b border-gray-300 p-4 gap-4 justify-center items-center"
        >
          <img
            src={item.image_link}
            alt={item.name}
            className="w-40 h-40 object-cover rounded"
          />

          <div className="flex flex-col justify-center ml-2">
            <p className="mt-2 font-bold">{item.name}</p>
            <p className="text-gray-600">{item.brand}</p>
            <p className="font-semibold mt-1">{parseFloat(item.price) || 0} €</p>
            <p className="mt-1">Cantidad: {item.quantity}</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 ml-auto">
            <div className="border h-11 px-3 flex items-center gap-3 rounded-xl">
              <button
                onClick={() => restProduct(item.id)}
                className="text-xl font-bold px-2"
              >
                -
              </button>
              <span className="text-base font-medium">{item.quantity}</span>
              <button
                onClick={() => sumProduct(item.id)}
                className="text-xl font-bold px-2"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeProductCart(item.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <h3 className="text-2xl font-bold mt-6">Total: {total.toFixed(2)} €</h3>
    </div>
  );
}

export default Cart;