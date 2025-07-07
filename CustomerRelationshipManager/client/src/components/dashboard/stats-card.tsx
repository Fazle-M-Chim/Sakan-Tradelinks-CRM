import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: "blue" | "emerald" | "red";
  isLoading?: boolean;
}

export function StatsCard({ title, value, icon: Icon, color, isLoading }: StatsCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    emerald: "bg-emerald-100 text-emerald-600",
    red: "bg-red-100 text-red-600",
  };

  const textColorClasses = {
    blue: "text-slate-800",
    emerald: "text-slate-800",
    red: "text-red-600",
  };

  if (isLoading) {
    return (
      <Card className="bg-white shadow-sm border border-slate-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-12"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className={cn("text-2xl font-bold mt-1", textColorClasses[color])}>
              {value}
            </p>
          </div>
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorClasses[color])}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
