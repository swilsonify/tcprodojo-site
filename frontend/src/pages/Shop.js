import { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      id: 1,
      name: 'TC Championship T-Shirt',
      price: 29.99,
      category: 'Apparel',
      description: 'Premium cotton tee with Torture Chamber logo. Available in black.',
      image: 'tshirt'
    },
    {
      id: 2,
      name: 'Train Like A Champion Hoodie',
      price: 54.99,
      category: 'Apparel',
      description: 'Heavyweight hoodie perfect for training or casual wear.',
      image: 'hoodie'
    },
    {
      id: 3,
      name: 'TC Training Shorts',
      price: 34.99,
      category: 'Apparel',
      description: 'Breathable athletic shorts designed for intense training.',
      image: 'shorts'
    },
    {
      id: 4,
      name: 'Championship Belt Replica',
      price: 149.99,
      category: 'Collectibles',
      description: 'Full-size replica of the Torture Chamber Championship belt.',
      image: 'belt'
    },
    {
      id: 5,
      name: 'TC Gym Bag',
      price: 44.99,
      category: 'Accessories',
      description: 'Durable gym bag with multiple compartments.',
      image: 'bag'
    },
    {
      id: 6,
      name: 'TC Water Bottle',
      price: 19.99,
      category: 'Accessories',
      description: '32oz stainless steel water bottle with TC branding.',
      image: 'bottle'
    },
    {
      id: 7,
      name: 'Training Gloves',
      price: 39.99,
      category: 'Training Gear',
      description: 'Professional-grade training gloves for grip work.',
      image: 'gloves'
    },
    {
      id: 8,
      name: 'TC Snapback Cap',
      price: 24.99,
      category: 'Apparel',
      description: 'Adjustable snapback with embroidered TC logo.',
      image: 'cap'
    }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existing = cart.find(item => item.id === productId);
    if (existing.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="pt-28 pb-20 px-4" data-testid="shop-page">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white torture-text mb-4">SHOP</h1>
          <div className="gradient-border mx-auto w-24 mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Represent Torture Chamber with official merchandise. Quality gear for champions.
          </p>
        </div>

        {/* Cart Button */}
        <div className="fixed top-24 right-4 z-40">
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg relative"
            data-testid="cart-button"
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black/80 z-50" onClick={() => setShowCart(false)}>
            <div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              data-testid="cart-sidebar"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-black border border-blue-500/20 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-white font-semibold">{item.name}</h3>
                            <p className="text-blue-400">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                              data-testid={`decrease-${item.id}`}
                            >
                              <Minus size={16} className="text-white" />
                            </button>
                            <span className="text-white px-2">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                              data-testid={`increase-${item.id}`}
                            >
                              <Plus size={16} className="text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-blue-500/20 pt-4 mb-4">
                    <div className="flex justify-between text-white text-xl font-bold">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
                    data-testid="checkout-button"
                    onClick={() => alert('Checkout coming soon! This is a demo.')}
                  >
                    CHECKOUT
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-black border border-blue-500/20 rounded-lg overflow-hidden hover-lift"
              data-testid={`product-${product.id}`}
            >
              {/* Product Image Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-blue-900 to-black flex items-center justify-center">
                <div className="text-center p-6">
                  <ShoppingCart size={48} className="text-blue-500 mx-auto mb-2" />
                  <div className="text-gray-400 text-sm">{product.image}</div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="text-blue-400 text-xs font-semibold mb-1">{product.category}</div>
                <h3 className="text-white font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
                    data-testid={`add-to-cart-${product.id}`}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-black border border-blue-500/20 rounded-lg">
            <h3 className="text-white font-bold mb-2">Free Shipping</h3>
            <p className="text-gray-400 text-sm">On orders over $75</p>
          </div>
          <div className="text-center p-6 bg-black border border-blue-500/20 rounded-lg">
            <h3 className="text-white font-bold mb-2">Quality Guaranteed</h3>
            <p className="text-gray-400 text-sm">Premium materials only</p>
          </div>
          <div className="text-center p-6 bg-black border border-blue-500/20 rounded-lg">
            <h3 className="text-white font-bold mb-2">Student Discount</h3>
            <p className="text-gray-400 text-sm">15% off for TC students</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;