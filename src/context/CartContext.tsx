import React, { createContext, useContext, useState, useCallback } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  talla?: number | string;
  color?: string;
  grabado?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number, talla?: number | string, color?: string, grabado?: string) => void;
  updateQuantity: (id: number, quantity: number, talla?: number | string, color?: string, grabado?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const sameLine = (a: CartItem, b: Partial<CartItem>) =>
  a.id === b.id && a.talla === b.talla && a.color === b.color && a.grabado === b.grabado;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => sameLine(i, item));
      if (existing) {
        return prev.map((i) => (sameLine(i, item) ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: number, talla?: number | string, color?: string, grabado?: string) => {
    setItems((prev) => prev.filter((i) => !sameLine(i, { id, talla, color, grabado })));
  }, []);

  const updateQuantity = useCallback(
    (id: number, quantity: number, talla?: number | string, color?: string, grabado?: string) => {
      const key = { id, talla, color, grabado };
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => !sameLine(i, key)));
      } else {
        setItems((prev) => prev.map((i) => (sameLine(i, key) ? { ...i, quantity } : i)));
      }
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
