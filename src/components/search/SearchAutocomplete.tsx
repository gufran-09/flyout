import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, Tag, Compass, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  type: "tour" | "destination" | "category";
  city: string;
  category: string;
  categorySlug?: string;
  image: string;
  price?: number;
  rating?: number;
  badge?: string;
  description?: string;
  redirectUrl: string;
}

interface SearchAutocompleteProps {
  className?: string;
  onClose?: () => void;
  autoFocus?: boolean;
  fullScreen?: boolean;
}

export function SearchAutocomplete({
  className,
  onClose,
  autoFocus = false,
  fullScreen = false
}: SearchAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const searchTours = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/search?q=${encodeURIComponent(searchQuery)}&limit=8`,
        {
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Search failed");

      const searchData = await response.json();
      setResults(searchData.results || []);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      searchTours(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchTours]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      } else if (query.trim()) {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      onClose?.();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setShowDropdown(false);
    setQuery("");
    onClose?.();
    navigate(result.redirectUrl);
  };

  const handleSearch = () => {
    if (query.trim()) {
      setShowDropdown(false);
      onClose?.();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "destination":
        return <MapPin className="h-4 w-4 text-primary" />;
      case "category":
        return <Tag className="h-4 w-4 text-primary" />;
      default:
        return <Compass className="h-4 w-4 text-primary" />;
    }
  };

  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.trim()})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-primary/20 text-primary font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search tours, destinations, activities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && results.length > 0 && setShowDropdown(true)}
          autoFocus={autoFocus}
          className={cn(
            "pl-10 pr-20 h-10",
            fullScreen && "h-12 text-base"
          )}
        />
        <div className="absolute right-1 flex items-center gap-1">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {query && !isLoading && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="sm"
            className="h-7"
            onClick={handleSearch}
            disabled={!query.trim()}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      <AnimatePresence>
        {showDropdown && results.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl overflow-hidden z-50",
              fullScreen && "max-h-[60vh] overflow-y-auto"
            )}
          >
            {results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 text-left transition-colors",
                  "hover:bg-accent",
                  selectedIndex === index && "bg-accent"
                )}
              >
                <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(result.type)}
                    <span className="font-medium text-sm truncate">
                      {highlightMatch(result.title)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span>{result.city}</span>
                    <span>•</span>
                    <span className="px-1.5 py-0.5 bg-muted rounded text-[10px]">
                      {result.category}
                    </span>
                  </div>
                </div>
                {result.price && (
                  <span className="text-sm font-semibold text-primary">
                    AED {result.price}
                  </span>
                )}
              </button>
            ))}

            {/* View All Results */}
            <button
              onClick={handleSearch}
              className="w-full p-3 text-center text-sm text-primary font-medium bg-muted/50 hover:bg-muted transition-colors border-t border-border"
            >
              View all results for "{query}"
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {showDropdown && query.trim() && results.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl p-6 text-center z-50"
          >
            <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No results found for "{query}"
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Try different keywords or browse categories
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
