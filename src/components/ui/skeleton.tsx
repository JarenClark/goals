import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md old-bg-black/5 old-dark:bg-white/5 bg-secondary", className)}
      {...props}
    />
  )
}

export { Skeleton }
