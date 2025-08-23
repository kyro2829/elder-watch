import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ElderlyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "warning" | "success";
  size?: "default" | "large" | "extra-large";
  children: React.ReactNode;
}

export function ElderlyButton({ 
  variant = "primary", 
  size = "large", 
  className, 
  children, 
  ...props 
}: ElderlyButtonProps) {
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    warning: "bg-warning hover:bg-warning/90 text-warning-foreground",
    success: "bg-success hover:bg-success/90 text-success-foreground"
  };

  const sizes = {
    default: "h-12 px-6 text-base",
    large: "h-16 px-8 text-lg",
    "extra-large": "h-20 px-12 text-xl"
  };

  return (
    <Button
      className={cn(
        "font-semibold transition-all duration-200 shadow-md hover:shadow-lg",
        "min-w-[120px] rounded-xl",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}