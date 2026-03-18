let name = "Rahul";
let m1 = 78, m2 = 82, m3 = 91;

const getTotal = (a, b, c) => a + b + c;
const getAverage = (a, b, c) => getTotal(a, b, c) / 3;

let totalMarks = getTotal(m1, m2, m3);
let avgMarks = getAverage(m1, m2, m3);

console.log(`Student Name: ${name}`);
console.log(`Total Marks: ${totalMarks}`);
console.log(`Average Marks: ${avgMarks.toFixed(2)}`);