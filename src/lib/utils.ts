/**
 * Utility functions for Hack Board
 * 
 * Contains helper functions for styling and class name management
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine and merge Tailwind CSS classes
 * 
 * Combines multiple class name inputs using clsx and resolves
 * Tailwind CSS conflicts using tailwind-merge for clean styling
 * 
 * @param inputs - Array of class names, objects, or conditional classes
 * @returns Merged and conflict-resolved class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
