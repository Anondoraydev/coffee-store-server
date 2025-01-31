import React, { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(6);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleBuyNow = () => {
    alert("Proceeding to checkout");
  };

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading products...</div>;
  }

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Shopping Cart Application
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Product List */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.slice(0, visibleProducts).map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleProducts < products.length && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setVisibleProducts(visibleProducts + 6)}
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
              >
                Load More
              </button>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Your Cart
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((product) => (
                <li key={product.id} className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${product.price.toFixed(2)} × {product.quantity} = $
                      {(product.price * product.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(product.id)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t my-6"></div>

          {/* Total Price */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-gray-700">Total:</span>
            <span className="text-xl font-bold text-gray-900">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>

          {/* Buy Now and Clear Cart Buttons */}
          {cart.length > 0 && (
            <div className="space-y-4">
              <button
                onClick={handleBuyNow}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg shadow-lg text-lg font-semibold"
              >
                Buy Now
              </button>
              <button
                onClick={() => setCart([])}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg shadow-lg text-lg font-semibold"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
