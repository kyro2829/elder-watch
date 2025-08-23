import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HealthCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  status?: "normal" | "warning" | "danger";
  className?: string;
}

export function HealthCard({ 
  title, 
  value, 
  unit, 
  icon, 
  status = "normal", 
  className 
}: HealthCardProps) {
  const statusColors = {
    normal: "border-primary/20 bg-card",
    warning: "border-warning/40 bg-warning/5",
    danger: "border-destructive/40 bg-destructive/5"
  };

  return (
    <Card className={cn(
      "p-6 transition-all duration-200 hover:shadow-lg",
      statusColors[status],
      className
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
          <div className="text-primary">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-foreground">
            {value}
          </span>
          {unit && (
            <span className="text-lg text-muted-foreground font-medium">
              {unit}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}