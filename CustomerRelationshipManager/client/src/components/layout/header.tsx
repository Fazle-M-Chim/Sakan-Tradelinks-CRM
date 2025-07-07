import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";

interface HeaderProps {
  onAddClient?: () => void;
  title?: string;
  subtitle?: string;
}

export function Header({ 
  onAddClient, 
  title = "Dashboard", 
  subtitle = "Welcome back! Here's what needs your attention." 
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          <p className="text-slate-600 text-sm mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          {onAddClient && (
            <Button onClick={onAddClient} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          )}
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
