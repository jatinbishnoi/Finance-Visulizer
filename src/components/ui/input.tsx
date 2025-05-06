import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border bg-transparent px-4 py-3 text-lg text-gray-800 shadow-lg placeholder:text-gray-400 placeholder:opacity-75 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-indigo-400 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 dark:hover:shadow-xl",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
