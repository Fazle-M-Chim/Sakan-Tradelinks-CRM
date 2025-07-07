import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RemindersSection } from "@/components/dashboard/reminders-section";
import { ClientList } from "@/components/clients/client-list";
import { AddClientModal } from "@/components/forms/add-client-modal";
import { AddMachineModal } from "@/components/forms/add-machine-modal";
import { AddContactModal } from "@/components/forms/add-contact-modal";
import { ClientDetailModal } from "@/components/clients/client-detail-modal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Users, Gavel, AlertCircle } from "lucide-react";
import type { Client, Reminder } from "@shared/schema";

export default function Dashboard() {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isAddMachineModalOpen, setIsAddMachineModalOpen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const { data: clients = [], isLoading: clientsLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const { data: overdueReminders = [], isLoading: overdueLoading } = useQuery<Reminder[]>({
    queryKey: ["/api/reminders/overdue"],
  });

  const { data: upcomingReminders = [], isLoading: upcomingLoading } = useQuery<Reminder[]>({
    queryKey: ["/api/reminders/upcoming-monthly"],
  });

  const { data: allMachines = [] } = useQuery({
    queryKey: ["/api/machines"],
  });

  const totalClients = clients.length;
  const activeMachines = allMachines.length;
  const overdueCount = overdueReminders.length;

  const handleClientClick = (clientId: number) => {
    setSelectedClientId(clientId);
  };

  const handleCloseClientDetail = () => {
    setSelectedClientId(null);
  };

  const handleOpenAddClient = () => {
    setIsAddClientModalOpen(true);
  };

  const handleCloseAddClient = () => {
    setIsAddClientModalOpen(false);
  };

  const handleOpenAddMachine = () => {
    setIsAddMachineModalOpen(true);
  };

  const handleCloseAddMachine = () => {
    setIsAddMachineModalOpen(false);
  };

  const handleOpenAddContact = () => {
    setIsAddContactModalOpen(true);
  };

  const handleCloseAddContact = () => {
    setIsAddContactModalOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 overflow-auto">
        <Header onAddClient={handleOpenAddClient} />
        
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Clients"
              value={totalClients}
              icon={Users}
              color="blue"
              isLoading={clientsLoading}
            />
            <StatsCard
              title="Active Machines"
              value={activeMachines}
              icon={Gavel}
              color="emerald"
              isLoading={false}
            />
            <StatsCard
              title="Overdue Follow-ups"
              value={overdueCount}
              icon={AlertCircle}
              color="red"
              isLoading={overdueLoading}
            />
          </div>

          {/* Reminders Section */}
          <RemindersSection
            overdueReminders={overdueReminders}
            upcomingReminders={upcomingReminders}
            clients={clients}
            isLoading={overdueLoading || upcomingLoading}
          />

          {/* Client List */}
          <ClientList
            clients={clients}
            onClientClick={handleClientClick}
            onAddClient={handleOpenAddClient}
            isLoading={clientsLoading}
          />
        </div>
      </main>

      {/* Modals */}
      {selectedClientId && (
        <ClientDetailModal
          clientId={selectedClientId}
          isOpen={!!selectedClientId}
          onClose={handleCloseClientDetail}
          onAddMachine={handleOpenAddMachine}
          onAddContact={handleOpenAddContact}
        />
      )}

      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={handleCloseAddClient}
      />

      <AddMachineModal
        isOpen={isAddMachineModalOpen}
        onClose={handleCloseAddMachine}
        clientId={selectedClientId}
      />

      <AddContactModal
        isOpen={isAddContactModalOpen}
        onClose={handleCloseAddContact}
        clientId={selectedClientId}
      />
    </div>
  );
}
