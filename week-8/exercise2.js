const studentData = {
    id: 205,
    name: "Ananya",
    department: "ECE",
    marks: 84
};

let { id, name, department, marks } = studentData;

console.log(id, name, department, marks);

let grade = marks >= 90 ? "A" :
            marks >= 75 ? "B" :
            marks >= 60 ? "C" : "D";

const newStudent = { ...studentData, grade };

console.log(newStudent);