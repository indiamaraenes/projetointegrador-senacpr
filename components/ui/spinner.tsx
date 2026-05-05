import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        {
          "size-4": size === "sm",
          "size-6": size === "md",
          "size-8": size === "lg",
        },
        className
      )}
      {...props}
    >
      <span className="sr-only">Carregando...</span>
    </div>
  )
}
