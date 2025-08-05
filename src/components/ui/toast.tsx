/**
 * Toast Notification Components
 * 
 * Customized toast system for Hack Board with terminal-friendly styling
 * Based on Radix UI primitives with fixed positioning to prevent layout interference
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Toast styling variants with terminal-friendly animations
 * Configured to slide in from top and not interfere with main layout
 */
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[swipe=end]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
  {
    variants: {
      variant: {
        default:
          "border bg-background text-foreground shadow",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof toastVariants>>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
))
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

const ToastClose = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:text-red-50",
      className
    )}
    toast-close=""
    {...props}
  />
))
ToastClose.displayName = "ToastClose"

const ToastProvider = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, children, ...props }, ref) => (
  <div style={{display: 'contents'}}>
    {children}
    <div
      ref={ref}
      className={cn("fixed top-4 right-4 z-[100] flex max-h-screen max-w-[420px] flex-col gap-2 pointer-events-none", className)}
      {...props}
    />
  </div>
))
ToastProvider.displayName = "ToastProvider"

const ToastViewport = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed top-4 right-4 z-[100] flex max-h-screen max-w-[420px] flex-col gap-2 pointer-events-none",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = "ToastViewport"

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
}
