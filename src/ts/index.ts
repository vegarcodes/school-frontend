import { deleteStudent, getAllStudents, postStudent } from "./api/student.api";
import type { NewStudent, Student } from "./types/student.type";

let studentsList = document.querySelector("#students") as HTMLUListElement;
const addStudentTxt = document.getElementById(
  "add-student-txt",
) as HTMLInputElement;
const addStudentBtn = document.getElementById(
  "add-student-btn",
) as HTMLButtonElement;

updateStudentsArray();
showStudents();
addStudentBtn.addEventListener("click", addStudent);

//Oppdater studentarrayet, slik at vi kan refreshe fremvisningen
async function updateStudentsArray() {
  const students: Student[] = await getAllStudents();
  return students;
}

//Vise student:
async function showStudents() {
  const students = await updateStudentsArray();
  console.log("INNE I SHOWSTUDENTSARRAY", students);
  studentsList.innerHTML = "";
  for (const student of students) {
    const listElement: HTMLLIElement = document.createElement("li");
    listElement.innerHTML = `Vår student ${student.name} har studentnummer ${student.id} og bor i ${student.address}.`;

    //Slett student:
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Slett";

    deleteBtn.addEventListener("click", async () => {
      console.log(student.id);
      await deleteStudent(student.id);
      listElement.remove();
    });

    listElement.append(deleteBtn);
    studentsList.appendChild(listElement);
  }
}

//Legg til student:
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
    showStudents();
  }
}
