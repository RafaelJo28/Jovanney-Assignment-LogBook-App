import { NextResponse } from "next/server";
import { db, UpdateAssignmentDTO } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const assignment = db.getById(params.id);
  if (!assignment) return NextResponse.json({ error: `Assignment '${params.id}' not found` }, { status: 404 });
  return NextResponse.json({ success: true, data: assignment }, { status: 200 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body: UpdateAssignmentDTO = await request.json();

    if (Object.keys(body).length === 0)
      return NextResponse.json({ error: "No fields provided to update" }, { status: 400 });

    if (body.status && !["pending", "in-progress", "completed"].includes(body.status))
      return NextResponse.json({ error: "Invalid status. Must be: pending, in-progress, or completed" }, { status: 400 });

    if (body.priority && !["low", "medium", "high"].includes(body.priority))
      return NextResponse.json({ error: "Invalid priority. Must be: low, medium, or high" }, { status: 400 });

    if (body.dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(body.dueDate))
      return NextResponse.json({ error: "Invalid dueDate format. Use YYYY-MM-DD" }, { status: 400 });

    const updated = db.update(params.id, body);
    if (!updated) return NextResponse.json({ error: `Assignment '${params.id}' not found` }, { status: 404 });

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const deleted = db.delete(params.id);
  if (!deleted) return NextResponse.json({ error: `Assignment '${params.id}' not found` }, { status: 404 });
  return NextResponse.json({ message: `Assignment '${params.id}' deleted successfully` }, { status: 200 });
}