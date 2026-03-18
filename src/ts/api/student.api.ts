import { type NewStudent, type Student } from "../types/student.type";

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

//Legg til student
export async function postStudent(Student: NewStudent): Promise<Student> {
  try {
    const response: Response = await fetch(
      "http://localhost:3000/api/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer SKURKEAPI",
        },
        body: JSON.stringify(Student),
      },
    );
    const data: Student = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

//Slett student
export async function deleteStudent(id: number): Promise<void> {
  try {
    const response: Response = await fetch(
      `http://localhost:3000/api/students/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer SKURKEAPI",
        },
      },
    );
  } catch (error) {
    alert("Det skjedde noe galt med sletting" + error);
  }
}

export async function resetStudents(): Promise<number> {
  try {
    const response: Response = await fetch("http://localhost:3000/api/reset", {
      method: "POST",
      headers: {
        Authorization: "Bearer SKURKEAPI"
      }
    });

    if(!response.ok) {
      throw new Error("Noe gikk skeis");
    }

    return response.status;

  } catch (error) {
    throw error;
  }
}

export async function editStudent(id: number, data: Partial<Student>): Promise<void> {
  try {
    const response: Response = await fetch(`http://localhost:3000/api/students/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer SKURKEAPI"
      },
      body: JSON.stringify(data)
    });

    if(!response.ok) {
      throw new Error("Dette gikk skeis");
    }

    //return response.status;

  } catch (error) {
    console.error("Det har oppstått en feil", error);
  }
}
