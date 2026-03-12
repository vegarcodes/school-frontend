export type Student = {
  id: number;
  age: number;
  name: string;
  address: string;
  description: string;
  created: string;
  updated: string;
};

export type NewStudent = Omit<Student, "id" | "created" | "updated">;
