import { NextResponse } from "next/server";
import { db, CreateAssignmentDTO } from "@/lib/db";

export async function GET() {
  const assignments = db.getAll();
  return NextResponse.json({ success: true, count: assignments.length, data: assignments }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body: CreateAssignmentDTO = await request.json();

    for (const field of ["title", "subject", "dueDate"]) {
      if (!body[field as keyof CreateAssignmentDTO]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    if (body.status && !["Create", "On Process", "Submitted"].includes(body.status))
      return NextResponse.json({ error: "Invalid status. Must be: Create, On Process, or Submitted" }, { status: 400 });

    if (body.priority && !["low", "medium", "high"].includes(body.priority))
      return NextResponse.json({ error: "Invalid priority. Must be: low, medium, or high" }, { status: 400 });

    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.dueDate))
      return NextResponse.json({ error: "Invalid dueDate format. Use YYYY-MM-DD" }, { status: 400 });

    const newAssignment = db.create(body);
    return NextResponse.json({ success: true, data: newAssignment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}