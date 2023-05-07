import React, { createContext, useState, useEffect } from "react";

interface CartInterface {
  cart: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
    amount: number;
  }[];
  addToCart: (product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
  }) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
  itemAmount: number;
  totalPrice: number;
}

export const CartContext = createContext<CartInterface>({
  addToCart: (product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
  }) => {},
  cart: [],
  removeFromCart: (id: number) => {},
  clearCart: () => {},
  increaseAmount: (id: number) => {},
  decreaseAmount: (id: number) => {},
  itemAmount: 0,
  totalPrice: 0,
});

const CartProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [cart, setCart] = useState<
    {
      id: number;
      title: string;
      price: number;
      description: string;
      category: string;
      image: string;
      rating: { rate: number; count: number };
      amount: number;
    }[]
  >([]);

  const [itemAmount, setItemAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const total = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount * currentItem.price;
      }, 0);
      setTotalPrice(total);
    }
  }, [cart]);

  const addToCart = (product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
  }) => {
    let cartItem:
      | {
          id: number;
          title: string;
          price: number;
          description: string;
          category: string;
          image: string;
          rating: { rate: number; count: number };
          amount: number;
        }
      | undefined;
    const newItem = { ...product, amount: 1 };
    cartItem = cart.find((item: { id: number }) => {
      return item.id === product.id;
    });
    if (cartItem) {
      let newCart: any;
      newCart = [...cart].map((item: { id: number }) => {
        if (item.id === product.id) {
          return { ...item, amount: cartItem!.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: number) => {
    let newCart: any;
    newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id: number) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      addToCart(item);
    }
  };

  const decreaseAmount = (id: number) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      if (item.amount < 2) {
        removeFromCart(id);
      } else {
        let newCart: any;
        newCart = cart.map((i) => {
          if (i.id === id) {
            return { ...i, amount: item.amount - 1 };
          } else {
            return i;
          }
        });
        setCart(newCart);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        totalPrice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
