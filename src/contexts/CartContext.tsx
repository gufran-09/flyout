import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { Tour } from "@/components/home/ExperienceSection";

export interface CartItem {
  id: string;
  tour: Tour;
  quantity: number;
  guests: number;
  selectedDate?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (tour: Tour, guests?: number, selectedDate?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateGuests: (itemId: string, guests: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "flyout_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      // Migrate old cart items that might not have an ID
      return parsed.map((item: any) => ({
        ...item,
        id: item.id || `${item.tour.id}-${item.tour.duration}-${item.selectedDate || 'no-date'}`
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (tour: Tour, guests: number = 1, selectedDate?: string) => {
    const newItemId = `${tour.id}-${tour.duration}-${selectedDate || 'no-date'}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === newItemId
            ? { ...item, quantity: item.quantity + 1, guests: guests || item.guests }
            : item
        );
      }
      return [...prev, { id: newItemId, tour, quantity: 1, guests, selectedDate }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const updateGuests = (itemId: string, guests: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, guests: Math.max(1, guests) } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce(
    (sum, item) => sum + item.tour.price * item.quantity * item.guests,
    0
  ), [items]);

  const value = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateGuests,
    clearCart,
    totalItems,
    totalPrice,
  }), [items, totalItems, totalPrice]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
