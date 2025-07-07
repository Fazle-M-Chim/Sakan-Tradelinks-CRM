import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddMachineModal } from "@/components/forms/add-machine-modal";
import { AddContactModal } from "@/components/forms/add-contact-modal";
import { useState } from "react";
import { ArrowLeft, Plus, Users, Gavel } from "lucide-react";
import { Link } from "wouter";
import type { ClientWithDetails } from "@shared/schema";

export default function ClientDetail() {
  const { id } = useParams();
  const [isAddMachineModalOpen, setIsAddMachineModalOpen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const { data: client, isLoading } = useQuery<ClientWithDetails>({
    queryKey: ["/api/clients", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex bg-slate-50">
        <Sidebar />
        <main className="flex-1 ml-64 overflow-auto">
          <Header />
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-96 bg-gray-200 rounded"></div>
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex bg-slate-50">
        <Sidebar />
        <main className="flex-1 ml-64 overflow-auto">
          <Header />
          <div className="p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Client not found</h2>
              <p className="text-gray-600 mb-4">The client you're looking for doesn't exist.</p>
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 overflow-auto">
        <Header />
        
        <div className="p-6">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Client Header */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-xl">
                  {getInitials(client.name)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{client.name}</h1>
                <p className="text-slate-600">{client.industry}</p>
              </div>
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
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Machines Card */}
            <Card className="bg-slate-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Gavel className="w-5 h-5 mr-2" />
                    Machines
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddMachineModalOpen(true)}
                  >
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
                          <Badge className={`text-xs ${
                            machine.warrantyStatus === 'Under Warranty' ? 'bg-emerald-100 text-emerald-800' :
                            machine.warrantyStatus === 'Expiring Soon' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {machine.warrantyStatus}
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
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Contact People
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddContactModalOpen(true)}
                  >
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
      </main>

      {/* Modals */}
      <AddMachineModal
        isOpen={isAddMachineModalOpen}
        onClose={() => setIsAddMachineModalOpen(false)}
        clientId={parseInt(id)}
      />

      <AddContactModal
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
        clientId={parseInt(id)}
      />
    </div>
  );
}
