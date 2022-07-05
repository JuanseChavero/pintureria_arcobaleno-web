import { createContext, useContext, ReactNode, useState } from 'react';
import { ShoppingCart } from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContextProps = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  cartItems: ShoppingCartItem[];
  cartItemsQuantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<ShoppingCartItem[]>(
    'shopping-cart',
    [],
  );

  const cartItemsQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseItemQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      item.quantity++;
      return setCartItems([...cartItems]);
    } else {
      return setCartItems([...cartItems, { id, quantity: 1 }]);
    }
  };
  const decreaseItemQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item?.quantity === 1) {
      return setCartItems(cartItems.filter((item) => item.id !== id));
    }

    if (item) {
      item.quantity--;
      return setCartItems([...cartItems]);
    }
  };
  const removeItem = (id: number) => {
    return setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    return setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
        clearCart,
        cartItems,
        cartItemsQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
