import { getAllStudents, postStudent, deleteStudent } from "./api/student.api";
import type { Student, NewStudent } from "./types/student.type";

try {
  const students: Student[] = await getAllStudents();

  let studentsList: HTMLUListElement | null =
    document.querySelector("#students");

  if (studentsList === null) {
    studentsList = document.createElement("ul");
    studentsList.setAttribute("id", "students");
    document.body.appendChild(studentsList);
  }

  for (const student of students) {
    const listElement: HTMLLIElement = document.createElement("li");
    listElement.innerHTML = `Vår student ${student.name} har studentnummer ${student.id} og bor i ${student.address}.`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Slett";
    deleteBtn.addEventListener("click", async () => {
      try {
        await deleteStudent(student.id);
        listElement.remove();
      } catch (error) {
        alert("Kunne ikke slette studenten.");
        console.log(error);
      }
    });

    listElement.appendChild(deleteBtn);
    studentsList.appendChild(listElement);
  }
} catch (error) {
  alert("En feil har oppstått.");
  console.log(error);
}

const addStudentTxt = document.getElementById(
  "add-student-txt",
) as HTMLInputElement;
const addStudentBtn = document.getElementById(
  "add-student-btn",
) as HTMLButtonElement;

addStudentBtn.addEventListener("click", addStudent);

async function addStudent() {
  if (addStudentTxt.value) {
    const studentName = addStudentTxt.value;
    console.log(studentName);

    const newStudent: NewStudent = {
      age: 0,
      name: studentName,
      address: "",
      description: "",
    };

    await postStudent(newStudent);
  } else {
    alert("Du må skrive noe i tekstfeltet!");
  }
}
