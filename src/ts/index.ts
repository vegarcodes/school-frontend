import { deleteStudent, editStudent, getAllStudents, postStudent, resetStudents } from "./api/student.api";
import type { NewStudent, Student } from "./types/student.type";

let studentsList = document.querySelector("#students") as HTMLUListElement;
const addStudentTxt = document.getElementById(
  "add-student-txt",
) as HTMLInputElement;
const addAddressTxt = document.getElementById("add-address-txt") as HTMLInputElement;

const addStudentForm = document.getElementById("addStudentForm") as HTMLFormElement;

const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;

resetBtn.addEventListener("click", async () => {
  const status: number = await resetStudents();
  if(status === 200) {
    updateStudentsArray();
    showStudents();
  }
});

updateStudentsArray();
showStudents();

addStudentForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  await addStudent(); 
})

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
    const articleElement: HTMLElement = document.createElement("article");
    articleElement.innerHTML = `Vår student ${student.name} har studentnummer ${student.id} og bor i ${student.address}.`;

    //Slett student:
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `Slett <strong>${student.name}<strong>`;

    const editForm = document.createElement("form");
    const editName = document.createElement("input");
    const submitEditForm = document.createElement("button");
    editName.type = "text";
    editName.required = true;
    editName.placeholder = "Navn";
    submitEditForm.type = "submit";
    submitEditForm.innerText = `Rediger ${student.name}`;
    
    editForm.append(editName);
    editForm.append(submitEditForm);

    deleteBtn.addEventListener("click", async () => {
      console.log(student.id);
      await deleteStudent(student.id);
      articleElement.remove();
    });

    editForm.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      await editStudent(student.id, {
        name: editName.value
      });
      updateStudentsArray();
      showStudents();
      console.log("REDIGERER SKURK");
    });

    articleElement.append(deleteBtn);
    articleElement.append(editForm);
    studentsList.appendChild(articleElement);
  }
}

//Legg til student:
function addStudent() {
  const addStudentTxtValue = addStudentTxt.value;  
  const address = addAddressTxt.value;

  const newStudent: NewStudent = {
    age: 20,
    name: addStudentTxtValue,
    address: address,
    description: "En default skurk",
  };

  postStudent(newStudent);
  updateStudentsArray();
  showStudents();
}

