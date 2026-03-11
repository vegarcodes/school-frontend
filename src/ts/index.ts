import { getAllStudents } from "./api/student.api";
import type { Student } from "./types/student.type";

try {
  const students: Student[] = await getAllStudents();
  
  let studentsList: HTMLUListElement | null = document.querySelector("#students");

  if (studentsList === null) {
    studentsList = document.createElement("ul");
    studentsList.setAttribute("id", "students");
    document.body.appendChild(studentsList);
  }

  for (const student of students) {
    const listElement: HTMLLIElement = document.createElement("li");
    listElement.innerHTML = `Vår student ${student.name} har studentnummer ${student.id} og bor i ${student.address}.`;
    studentsList.appendChild(listElement);
  }
} catch (error) {
  alert("En feil har oppstått.");
  console.log(error);
}
