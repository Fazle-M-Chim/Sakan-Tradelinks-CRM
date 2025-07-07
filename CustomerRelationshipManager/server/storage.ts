import { 
  clients, 
  contacts, 
  machines, 
  reminders,
  type Client, 
  type Contact, 
  type Machine, 
  type Reminder,
  type InsertClient,
  type InsertContact,
  type InsertMachine,
  type InsertReminder,
  type ClientWithDetails
} from "@shared/schema";

export interface IStorage {
  // Client operations
  getClients(): Promise<Client[]>;
  getClient(id: number): Promise<ClientWithDetails | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;
  
  // Contact operations
  getContacts(): Promise<Contact[]>;
  getContactsByClientId(clientId: number): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: number, contact: Partial<InsertContact>): Promise<Contact | undefined>;
  deleteContact(id: number): Promise<boolean>;
  
  // Machine operations
  getMachines(): Promise<Machine[]>;
  getMachinesByClientId(clientId: number): Promise<Machine[]>;
  createMachine(machine: InsertMachine): Promise<Machine>;
  updateMachine(id: number, machine: Partial<InsertMachine>): Promise<Machine | undefined>;
  deleteMachine(id: number): Promise<boolean>;
  
  // Reminder operations
  getReminders(): Promise<Reminder[]>;
  getOverdueReminders(): Promise<Reminder[]>;
  getUpcomingReminders(): Promise<Reminder[]>;
  createReminder(reminder: InsertReminder): Promise<Reminder>;
  updateReminder(id: number, reminder: Partial<InsertReminder>): Promise<Reminder | undefined>;
  deleteReminder(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private clients: Map<number, Client>;
  private contacts: Map<number, Contact>;
  private machines: Map<number, Machine>;
  private reminders: Map<number, Reminder>;
  private currentClientId: number;
  private currentContactId: number;
  private currentMachineId: number;
  private currentReminderId: number;

  constructor() {
    this.clients = new Map();
    this.contacts = new Map();
    this.machines = new Map();
    this.reminders = new Map();
    this.currentClientId = 1;
    this.currentContactId = 1;
    this.currentMachineId = 1;
    this.currentReminderId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample data
    const sampleClients = [
      { name: "TechCorp Solutions", industry: "Manufacturing", lastContacted: "2024-12-15", status: "Active" },
      { name: "Global Manufacturing", industry: "Industrial", lastContacted: "2024-12-17", status: "Pending" },
      { name: "Precision Industries", industry: "Automotive", lastContacted: "2024-12-18", status: "Active" },
      { name: "InnoTech Labs", industry: "Technology", lastContacted: "2024-12-10", status: "Active" },
      { name: "Apex Engineering", industry: "Engineering", lastContacted: "2024-12-12", status: "Active" },
      { name: "Dynamic Systems", industry: "Manufacturing", lastContacted: "2024-12-14", status: "Active" },
    ];

    sampleClients.forEach(client => {
      const id = this.currentClientId++;
      this.clients.set(id, { ...client, id, createdAt: new Date() });
    });

    // Add sample contacts
    const sampleContacts = [
      { clientId: 1, name: "John Smith", position: "Operations Manager", email: "john.smith@techcorp.com", phone: "+1 (555) 123-4567" },
      { clientId: 1, name: "Maria Davis", position: "Technical Director", email: "maria.davis@techcorp.com", phone: "+1 (555) 123-4568" },
      { clientId: 2, name: "Robert Johnson", position: "Plant Manager", email: "robert.johnson@global.com", phone: "+1 (555) 234-5678" },
      { clientId: 3, name: "Sarah Wilson", position: "Quality Assurance", email: "sarah.wilson@precision.com", phone: "+1 (555) 345-6789" },
    ];

    sampleContacts.forEach(contact => {
      const id = this.currentContactId++;
      this.contacts.set(id, { ...contact, id, createdAt: new Date() });
    });

    // Add sample machines
    const sampleMachines = [
      { clientId: 1, model: "CNC Milling Machine X200", serialNumber: "SN-X200-001", purchaseDate: "2024-01-15", warrantyStatus: "Under Warranty", amcStatus: "Active", lastContacted: "2024-12-10" },
      { clientId: 1, model: "Laser Cutting System L500", serialNumber: "SN-L500-042", purchaseDate: "2023-03-22", warrantyStatus: "Expiring Soon", amcStatus: "Active", lastContacted: "2024-11-28" },
      { clientId: 2, model: "Industrial Press IP300", serialNumber: "SN-IP300-055", purchaseDate: "2023-08-10", warrantyStatus: "Active", amcStatus: "Active", lastContacted: "2024-12-05" },
      { clientId: 3, model: "Assembly Line AL1000", serialNumber: "SN-AL1000-100", purchaseDate: "2022-12-01", warrantyStatus: "Expired", amcStatus: "Inactive", lastContacted: "2024-11-15" },
    ];

    sampleMachines.forEach(machine => {
      const id = this.currentMachineId++;
      this.machines.set(id, { ...machine, id, createdAt: new Date() });
    });

    // Add sample reminders
    const sampleReminders = [
      { clientId: 1, type: "AMC Renewal", dueDate: "2024-12-15", isOverdue: true, completed: false },
      { clientId: 2, type: "Warranty Expiry", dueDate: "2024-12-17", isOverdue: true, completed: false },
      { clientId: 3, type: "Service Follow-up", dueDate: "2024-12-18", isOverdue: true, completed: false },
      { clientId: 4, type: "Monthly Check-in", dueDate: "2024-12-23", isOverdue: false, completed: false },
      { clientId: 5, type: "Insurance Renewal", dueDate: "2024-12-25", isOverdue: false, completed: false },
      { clientId: 6, type: "Service Maintenance", dueDate: "2024-12-27", isOverdue: false, completed: false },
    ];

    sampleReminders.forEach(reminder => {
      const id = this.currentReminderId++;
      this.reminders.set(id, { ...reminder, id, createdAt: new Date() });
    });
  }

  // Client operations
  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getClient(id: number): Promise<ClientWithDetails | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;

    const clientContacts = Array.from(this.contacts.values()).filter(c => c.clientId === id);
    const clientMachines = Array.from(this.machines.values()).filter(m => m.clientId === id);

    return {
      ...client,
      contacts: clientContacts,
      machines: clientMachines,
    };
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.currentClientId++;
    const client: Client = { ...insertClient, id, createdAt: new Date() };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: number, updateData: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;

    const updatedClient = { ...client, ...updateData };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }

  async deleteClient(id: number): Promise<boolean> {
    return this.clients.delete(id);
  }

  // Contact operations
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContactsByClientId(clientId: number): Promise<Contact[]> {
    return Array.from(this.contacts.values()).filter(c => c.clientId === clientId);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { ...insertContact, id, createdAt: new Date() };
    this.contacts.set(id, contact);
    return contact;
  }

  async updateContact(id: number, updateData: Partial<InsertContact>): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (!contact) return undefined;

    const updatedContact = { ...contact, ...updateData };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }

  async deleteContact(id: number): Promise<boolean> {
    return this.contacts.delete(id);
  }

  // Machine operations
  async getMachines(): Promise<Machine[]> {
    return Array.from(this.machines.values());
  }

  async getMachinesByClientId(clientId: number): Promise<Machine[]> {
    return Array.from(this.machines.values()).filter(m => m.clientId === clientId);
  }

  async createMachine(insertMachine: InsertMachine): Promise<Machine> {
    const id = this.currentMachineId++;
    const machine: Machine = { ...insertMachine, id, createdAt: new Date() };
    this.machines.set(id, machine);
    return machine;
  }

  async updateMachine(id: number, updateData: Partial<InsertMachine>): Promise<Machine | undefined> {
    const machine = this.machines.get(id);
    if (!machine) return undefined;

    const updatedMachine = { ...machine, ...updateData };
    this.machines.set(id, updatedMachine);
    return updatedMachine;
  }

  async deleteMachine(id: number): Promise<boolean> {
    return this.machines.delete(id);
  }

  // Reminder operations
  async getReminders(): Promise<Reminder[]> {
    return Array.from(this.reminders.values());
  }

  async getOverdueReminders(): Promise<Reminder[]> {
    return Array.from(this.reminders.values()).filter(r => r.isOverdue && !r.completed);
  }

  async getUpcomingReminders(): Promise<Reminder[]> {
    return Array.from(this.reminders.values()).filter(r => !r.isOverdue && !r.completed);
  }

  async createReminder(insertReminder: InsertReminder): Promise<Reminder> {
    const id = this.currentReminderId++;
    const reminder: Reminder = { ...insertReminder, id, createdAt: new Date() };
    this.reminders.set(id, reminder);
    return reminder;
  }

  async updateReminder(id: number, updateData: Partial<InsertReminder>): Promise<Reminder | undefined> {
    const reminder = this.reminders.get(id);
    if (!reminder) return undefined;

    const updatedReminder = { ...reminder, ...updateData };
    this.reminders.set(id, updatedReminder);
    return updatedReminder;
  }

  async deleteReminder(id: number): Promise<boolean> {
    return this.reminders.delete(id);
  }
}

export const storage = new MemStorage();
