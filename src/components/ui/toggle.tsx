"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { toggleVariants, ToggleVariantsProps } from "./toggle-variants"
import { cn } from "@/lib/utils"

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    ToggleVariantsProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle }
