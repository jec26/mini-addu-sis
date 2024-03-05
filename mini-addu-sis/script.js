let gradesData = [
  { code: '128098', name: 'Rizel Kent E. Miraflor', prelim: 0, midterm: 0, prefinal: 0, final: 0  },
  { code: '128099', name: 'Jesus Ricardo T. Año', prelim: 0, midterm: 0, prefinal: 0, final: 0  },
];

let coursesData = [
  { code: 'CS 1130', name: 'Introduction to Computing', slots: 30, occupiedSlots: 15, startTime: '9:00 AM', endTime: '10:30 AM', days: 'MW' },
  { code: 'CS 1131', name: 'Computer Programming 1', slots: 30, occupiedSlots: 21, startTime: '10:30 AM', endTime: '12:00 PM', days: 'MW' },
  { code: 'GE 1212', name: 'Science, Technology and Society', slots: 30, occupiedSlots: 19, startTime: '9:00 AM', endTime: '10:30 AM', days: 'TTH' },
  { code: 'IT 2241', name: 'Event-Driven Programming', slots: 30, occupiedSlots: 30, startTime: '10:30 AM', endTime: '12:00 PM', days: 'TTH' },
];

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

// Function to check if the user role is stored and set the role
function checkAndSetRole() {
  const storedUserRole = sessionStorage.getItem('userRole');

  if (storedUserRole) {
      setRole(storedUserRole);
  } else {
      promptAndSetRole();
  }
}

// Function to prompt the user for their role and set it
function promptAndSetRole() {
  const userRoles = {
      STUDENT: 'student',
      TEACHER: 'teacher'
  };
  
  const userRole = prompt('Enter your role (student or teacher):').toLowerCase();
  
  if (userRole === userRoles.STUDENT || userRole === userRoles.TEACHER) {
      sessionStorage.setItem('userRole', userRole);
      setRole(userRole);
  } else {
      alert('Invalid role. Please refresh and enter a valid role.');
  }
}

// Call the function to check and set the role
checkAndSetRole();

// Function to set the role (student or teacher)
function setRole(role) {
  const studentNav = document.getElementById('studentNav');
  const teacherNav = document.getElementById('teacherNav');

  if (role === 'student') {
      studentNav.style.display = 'block';
      teacherNav.style.display = 'none';
      displayGrades();
      displayCourses();
  } else if (role === 'teacher') {
      studentNav.style.display = 'none';
      teacherNav.style.display = 'block';
      displayGrades();
      displayCourses();
  }
}

// Function to display grades
function displayGrades() {
  const gradesTable = document.getElementById('gradesTable');
  gradesTable.innerHTML = '';

  const headerRow = gradesTable.insertRow(0);
  ['Code', 'Student Name', 'Prelim', 'Midterm', 'Prefinal', 'Final'].forEach((header, index) => {
      const cell = headerRow.insertCell(index);
      cell.textContent = header;
  });

  gradesData.forEach((grade, rowIndex) => {
      const row = gradesTable.insertRow(rowIndex + 1);
      Object.values(grade).forEach((value, index) => {
          const cell = row.insertCell(index);
          cell.textContent = value;
      });
  });
}

// Function to display courses
function displayCourses() {
  const coursesTable = document.getElementById('coursesTable');
  coursesTable.innerHTML = '';

  const headerRow = coursesTable.insertRow(0);
  ['Course Code', 'Course Name', 'Slots', 'Slots Occupied', 'Start Time', 'End Time', 'Days'].forEach((header, index) => {
      const cell = headerRow.insertCell(index);
      cell.textContent = header;
  });

  coursesData.forEach((course, rowIndex) => {
      const row = coursesTable.insertRow(rowIndex + 1);
      Object.values(course).forEach((value, index) => {
          const cell = row.insertCell(index);
          cell.textContent = value;
      });
  });
}

// Function to submit a grade
function submitGrade() {
  const studentCode = document.getElementById('gradeStudentCode').value;
  const prelim = document.getElementById('gradePrelim').value;
  const midterm = document.getElementById('gradeMidterm').value;
  const prefinal = document.getElementById('gradePrefinal').value;
  const final = document.getElementById('gradeFinal').value;

  const student = gradesData.find(grade => grade.code === studentCode);

  if (student) {
      student.prelim = parseFloat(prelim);
      student.midterm = parseFloat(midterm);
      student.prefinal = parseFloat(prefinal);
      student.final = parseFloat(final);

      displayGrades();

      document.getElementById('gradeForm').reset();
  } else {
      alert('Student not found. Please enter a valid student code.');
  }
}

