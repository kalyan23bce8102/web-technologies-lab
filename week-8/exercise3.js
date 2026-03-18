class CourseInfo {
    constructor(title, teacher) {
        this.title = title;
        this.teacher = teacher;
    }

    showDetails() {
        console.log(`Course: ${this.title}, Instructor: ${this.teacher}`);
    }
}

const course = new CourseInfo("Data Structures", "Dr. Reddy");

course.showDetails();

const enrollment = new Promise((resolve, reject) => {
    let available = true;

    available ? resolve("Enrollment Successful") : reject("Course Full");
});

enrollment
    .then(result => console.log(result))
    .catch(error => console.log(error));