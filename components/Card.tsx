import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface KartaProps {
  title: string;
  icon?: ReactNode; // You can pass any React component (like an icon or another component)
  value: string | number;
  desc: string;
}

export function Karta({ title, icon, value, desc }: KartaProps) {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>} 
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
        </div>
        <p className="text-xs text-muted-foreground">
          {desc}
        </p>
      </CardContent>
    </Card>
  );
}
