import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Plus, Gavel, Users, X } from "lucide-react";
import type { ClientWithDetails } from "@shared/schema";

interface ClientDetailModalProps {
  clientId: number;
  isOpen: boolean;
  onClose: () => void;
  onAddMachine: () => void;
  onAddContact: () => void;
}

export function ClientDetailModal({ 
  clientId, 
  isOpen, 
  onClose, 
  onAddMachine, 
  onAddContact 
}: ClientDetailModalProps) {
  const { data: client, isLoading } = useQuery<ClientWithDetails>({
    queryKey: ["/api/clients", clientId],
    enabled: isOpen && !!clientId,
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-emerald-100 text-emerald-800';
    }
  };

  const getWarrantyStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'under warranty':
        return 'bg-emerald-100 text-emerald-800';
      case 'expiring soon':
        return 'bg-amber-100 text-amber-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mt-2"></div>
                </div>
              </div>
            </div>
          </DialogHeader>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!client) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Client Not Found</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <p className="text-slate-600">The client you're looking for doesn't exist.</p>
            <Button onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-lg">
                  {getInitials(client.name)}
                </span>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-slate-800">
                  {client.name}
                </DialogTitle>
                <p className="text-slate-600">{client.industry}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="mt-4 flex items-center space-x-6">
            <div className="text-sm">
              <span className="text-slate-500">Last Contacted:</span>
              <span className="font-medium text-slate-800 ml-2">
                {client.lastContacted || 'Never'}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-slate-500">Status:</span>
              <Badge className={`ml-2 ${getStatusColor(client.status || 'Active')}`}>
                {client.status || 'Active'}
              </Badge>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Machines Card */}
            <Card className="bg-slate-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                    <Gavel className="w-5 h-5 mr-2" />
                    Machines
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={onAddMachine}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Machine
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.machines.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">No machines found</p>
                  ) : (
                    client.machines.map((machine) => (
                      <div key={machine.id} className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-800">{machine.model}</h4>
                          <Badge className={`text-xs ${getWarrantyStatusColor(machine.warrantyStatus || '')}`}>
                            {machine.warrantyStatus || 'Unknown'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-slate-500">Serial:</span>
                            <span className="font-medium text-slate-800 ml-1">{machine.serialNumber}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Purchase:</span>
                            <span className="font-medium text-slate-800 ml-1">{machine.purchaseDate}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">AMC Status:</span>
                            <span className="font-medium text-slate-800 ml-1">{machine.amcStatus}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Last Service:</span>
                            <span className="font-medium text-slate-800 ml-1">{machine.lastContacted}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contacts Card */}
            <Card className="bg-slate-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Contact People
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={onAddContact}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Contact
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.contacts.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">No contacts found</p>
                  ) : (
                    client.contacts.map((contact) => (
                      <div key={contact.id} className="bg-white p-4 rounded-lg border border-slate-200">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-xs">
                              {getInitials(contact.name)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-800">{contact.name}</h4>
                            <p className="text-sm text-slate-600">{contact.position}</p>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          {contact.email && (
                            <div>
                              <span className="text-slate-500">Email:</span>
                              <span className="font-medium text-slate-800 ml-1">{contact.email}</span>
                            </div>
                          )}
                          {contact.phone && (
                            <div>
                              <span className="text-slate-500">Phone:</span>
                              <span className="font-medium text-slate-800 ml-1">{contact.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
