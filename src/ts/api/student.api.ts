import { type Student, type NewStudent } from "../types/student.type";

export async function getAllStudents(): Promise<Student[]> {
  try {
    const response: Response = await fetch(
      "http://localhost:3000/api/students",
    );

    if (!response.ok) {
      throw new Error(`Kunne ikke hente data. Feilkode: ${response.status}`);
    }

    const data: Student[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getStudent(id: number): Promise<Student> {
  try {
    const response: Response = await fetch(
      `http://localhost:3000/api/students/${id}`,
    );

    if (!response.ok) {
      throw new Error(`Kunne ikke hente data. Feilkode: ${response.status}`);
    }

    const data: Student = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postStudent(student: NewStudent): Promise<Student> {
  const response: Response = await fetch("http://localhost:3000/api/students", {
    method: "POST",
    headers: {
      Authorization: "Bearer amina123",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error(`Kunne ikke lagre student. Feilkode: ${response.status}`);
  }

  const data: Student = await response.json();
  return data;
}

export async function deleteStudent(id: number): Promise<void> {
  const response: Response = await fetch(
    `http://localhost:3000/api/students/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer amina123",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Kunne ikke slette student. Feilkode: ${response.status}`);
  }
}
