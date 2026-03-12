import { getAllStudents, postStudent } from "./api/student.api";
import type { NewStudent, Student } from "./types/student.type";

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

function addStudent() {
  const addStudentTxtValue = addStudentTxt.value;
  if (!addStudentTxtValue) {
    alert("Du må skrive inn noe i tekstfeltet!");
  } else {
    alert("Hei og velkommen " + addStudentTxtValue);

    const newStudent: NewStudent = {
      age: 0,
      name: addStudentTxtValue,
      address: "",
      description: "",
    };

    postStudent(newStudent);
  }
}
