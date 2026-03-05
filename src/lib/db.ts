import { v4 as uuidv4 } from "uuid";

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssignmentDTO {
  title: string;
  subject: string;
  description?: string;
  dueDate: string;
  status?: "pending" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high";
}

export interface UpdateAssignmentDTO {
  title?: string;
  subject?: string;
  description?: string;
  dueDate?: string;
  status?: "pending" | "in-progress" | "completed";
  priority?: "low" | "medium" | "high";
}

let assignments: Assignment[] = [
  {
    id: uuidv4(),
    title: "REST API with Next.js",
    subject: "Web Development",
    description: "Build a full REST API using Next.js with Swagger documentation",
    dueDate: "2025-04-01",
    status: "in-progress",
    priority: "high",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const db = {
  getAll: (): Assignment[] => assignments,
  getById: (id: string) => assignments.find((a) => a.id === id),
  create: (data: CreateAssignmentDTO): Assignment => {
    const now = new Date().toISOString();
    const newAssignment: Assignment = {
      id: uuidv4(),
      title: data.title,
      subject: data.subject,
      description: data.description ?? "",
      dueDate: data.dueDate,
      status: data.status ?? "pending",
      priority: data.priority ?? "medium",
      createdAt: now,
      updatedAt: now,
    };
    assignments.push(newAssignment);
    return newAssignment;
  },
  update: (id: string, data: UpdateAssignmentDTO): Assignment | null => {
    const index = assignments.findIndex((a) => a.id === id);
    if (index === -1) return null;
    assignments[index] = { ...assignments[index], ...data, updatedAt: new Date().toISOString() };
    return assignments[index];
  },
  delete: (id: string): boolean => {
    const index = assignments.findIndex((a) => a.id === id);
    if (index === -1) return false;
    assignments.splice(index, 1);
    return true;
  },
};