import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface WishlistItem {
    id: string;
    title: string;
    image: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    reviews?: number;
    duration?: string;
    badge?: string;
    location?: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist_items");
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (error) {
                console.error("Failed to parse wishlist from localStorage", error);
                localStorage.removeItem("wishlist_items");
            }
        }
    }, []);

    // Save to localStorage whenever wishlist changes
    useEffect(() => {
        localStorage.setItem("wishlist_items", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlist((prev) => {
            if (prev.some((i) => i.id === item.id)) {
                return prev;
            }
            toast.success(`${item.title} added to wishlist`);
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id: string) => {
        setWishlist((prev) => {
            const itemToRemove = prev.find(i => i.id === id);
            if (itemToRemove) {
                toast.info(`${itemToRemove.title} removed from wishlist`);
            }
            return prev.filter((item) => item.id !== id);
        });
    };

    const isInWishlist = (id: string) => {
        return wishlist.some((item) => item.id === id);
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
