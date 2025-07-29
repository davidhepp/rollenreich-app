"use client";
import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import SearchResultItem from "./SearchResultItem";

interface CollapsibleSearchBarProps {
  className?: string;
}

export default function CollapsibleSearchBar({
  className = "",
}: CollapsibleSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    debouncedQuery,
    products,
    pagination,
    isLoading,
    isError,
    updateQuery,
    clearSearch,
    hasResults,
    showResults,
  } = useSearch(300);

  // Close dropdown and collapse when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        if (!query) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

  // Show dropdown when there are results or when loading
  useEffect(() => {
    if (isExpanded && showResults && (hasResults || isLoading)) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [isExpanded, showResults, hasResults, isLoading]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearchIconClick = () => {
    setIsExpanded(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(e.target.value);
  };

  const handleClear = () => {
    clearSearch();
    setIsDropdownOpen(false);
    setIsExpanded(false);
  };

  const handleResultSelect = () => {
    setIsDropdownOpen(false);
    clearSearch();
    setIsExpanded(false);
  };

  const handleInputFocus = () => {
    if (showResults && (hasResults || isLoading)) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {!isExpanded ? (
        // Search Icon (collapsed state)
        <div className="cursor-pointer w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <button
            onClick={handleSearchIconClick}
            className="focus:outline-none cursor-pointer"
          >
            <Search strokeWidth={1.5} />
          </button>
        </div>
      ) : (
        // Expanded Search Bar
        <div className="relative min-w-[250px] sm:min-w-[300px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Search products..."
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-none leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-btn-primary focus:border-btn-primary text-sm"
          />

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Search Results Dropdown */}
          {isDropdownOpen && showResults && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-none shadow-lg max-h-96 overflow-y-auto right-0 sm:right-auto">
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">
                    Searching...
                  </span>
                </div>
              )}

              {!isLoading && isError && (
                <div className="p-4 text-center">
                  <p className="text-sm text-red-600">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}

              {!isLoading &&
                !isError &&
                !hasResults &&
                debouncedQuery.length >= 2 && (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">
                      No products found for &quot;{debouncedQuery}&quot;
                    </p>
                  </div>
                )}

              {!isLoading && !isError && hasResults && (
                <>
                  <div className="py-2">
                    {products.map((product) => (
                      <SearchResultItem
                        key={product.id}
                        product={product}
                        onSelect={handleResultSelect}
                      />
                    ))}
                  </div>

                  {pagination && pagination.totalProducts > products.length && (
                    <div className="border-t border-gray-200 p-3 text-center">
                      <p className="text-xs text-gray-500">
                        Showing {products.length} of {pagination.totalProducts}{" "}
                        results
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
