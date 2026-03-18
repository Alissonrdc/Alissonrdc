import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Card({ children, className, style, onClick }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        onClick && "cursor-pointer hover:border-blue-500/30 transition-colors",
        className
      )}
      style={{ background: "var(--card)", borderColor: "var(--border)", ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn("text-sm font-semibold", className)}
      style={{ color: "var(--foreground)" }}
    >
      {children}
    </h3>
  );
}
