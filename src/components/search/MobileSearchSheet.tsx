import { useState } from "react";
import { Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SearchAutocomplete } from "./SearchAutocomplete";

interface MobileSearchSheetProps {
  className?: string;
}

export function MobileSearchSheet({ className }: MobileSearchSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Search className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-auto max-h-[80vh] p-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Search</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <SearchAutocomplete 
            autoFocus 
            fullScreen 
            onClose={() => setIsOpen(false)} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
