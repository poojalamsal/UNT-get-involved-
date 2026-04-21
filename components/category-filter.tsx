// Category Filter Component
// Assigned to: Ifunaya (Priority 4 - Integration)

"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/data"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          className={cn(
            "transition-all",
            selectedCategory === category && "shadow-md"
          )}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
