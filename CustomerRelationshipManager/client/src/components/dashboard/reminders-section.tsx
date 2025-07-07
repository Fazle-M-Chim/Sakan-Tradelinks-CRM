import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Calendar } from "lucide-react";
import type { Reminder, Client } from "@shared/schema";

interface RemindersSectionProps {
  overdueReminders: Reminder[];
  upcomingReminders: Reminder[];
  clients: Client[];
  isLoading?: boolean;
}

export function RemindersSection({ 
  overdueReminders, 
  upcomingReminders, 
  clients, 
  isLoading 
}: RemindersSectionProps) {
  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysUntil = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {[1, 2].map((i) => (
          <Card key={i} className="bg-white shadow-sm border border-slate-200">
            <CardHeader className="p-6 border-b border-slate-200">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mt-2"></div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center justify-between py-3 border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="space-y-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Overdue Alerts */}
      <Card className="bg-white shadow-sm border border-slate-200">
        <CardHeader className="p-6 border-b border-slate-200">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            Overdue Follow-ups
          </CardTitle>
          <p className="text-sm text-slate-600 mt-1">Clients requiring immediate attention</p>
        </CardHeader>
        <CardContent className="p-6">
          {overdueReminders.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No overdue reminders</p>
          ) : (
            <div className="space-y-3">
              {overdueReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {getClientName(reminder.clientId)}
                      </p>
                      <p className="text-xs text-slate-500">{reminder.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-red-600 font-medium">
                      {getDaysOverdue(reminder.dueDate)} days overdue
                    </p>
                    <p className="text-xs text-slate-500">
                      Due: {formatDate(reminder.dueDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Alerts */}
      <Card className="bg-white shadow-sm border border-slate-200">
        <CardHeader className="p-6 border-b border-slate-200">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
            <Calendar className="w-5 h-5 text-blue-500 mr-2" />
            Upcoming Monthly Reminders
          </CardTitle>
          <p className="text-sm text-slate-600 mt-1">Scheduled activities for this month</p>
        </CardHeader>
        <CardContent className="p-6">
          {upcomingReminders.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No upcoming reminders</p>
          ) : (
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {getClientName(reminder.clientId)}
                      </p>
                      <p className="text-xs text-slate-500">{reminder.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-600 font-medium">
                      In {getDaysUntil(reminder.dueDate)} days
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDate(reminder.dueDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
