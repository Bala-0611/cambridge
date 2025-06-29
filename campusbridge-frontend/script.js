const collegeForm = document.getElementById('college-form');
const collegeNameInput = document.getElementById('college-name');
const collegeLocationInput = document.getElementById('college-location');
const collegeList = document.getElementById('college-list');

const studentForm = document.getElementById('student-form');
const studentNameInput = document.getElementById('student-name');
const departmentInput = document.getElementById('department');
const yearInput = document.getElementById('year');
const emailInput = document.getElementById('email');
const collegeSelect = document.getElementById('college-select');
const studentList = document.getElementById('student-list');

// Load Colleges
const loadColleges = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/colleges');
    const data = await res.json();

    collegeList.innerHTML = '';
    collegeSelect.innerHTML = '<option value="">Select College</option>';

    data.forEach((college) => {
      // List on UI
      const li = document.createElement('li');
      li.textContent = `${college.name} (${college.location})`;
      collegeList.appendChild(li);

      // Select dropdown
      const option = document.createElement('option');
      option.value = college._id; // ✅ This is important
      option.textContent = college.name;
      collegeSelect.appendChild(option);
    });
  } catch (err) {
    alert('Error loading colleges');
    console.error(err);
  }
};

// Load Students
const loadStudents = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/students');
    const data = await res.json();

    studentList.innerHTML = '';
    data.forEach((student) => {
      const li = document.createElement('li');
      li.textContent = `${student.name} - ${student.department}, Year ${student.year}, ${student.email}`;
      studentList.appendChild(li);
    });
  } catch (err) {
    alert('Error loading students');
    console.error(err);
  }
};

// Add College
collegeForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newCollege = {
    name: collegeNameInput.value,
    location: collegeLocationInput.value
  };

  try {
    const res = await fetch('http://localhost:5000/api/colleges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCollege)
    });

    if (!res.ok) throw new Error('College creation failed');

    await loadColleges();
    collegeForm.reset();
  } catch (err) {
    alert('Failed to add college');
    console.error(err);
  }
});

// Add Student
studentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const studentData = {
    name: studentNameInput.value,
    department: departmentInput.value,
    year: yearInput.value,
    email: emailInput.value,
    collegeId: collegeSelect.value // ✅ Must send the _id
  };

  try {
    const res = await fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });

    if (!res.ok) throw new Error('Student creation failed');

    await loadStudents();
    studentForm.reset();
  } catch (err) {
    alert('Failed to add student');
    console.error(err);
  }
});

// Init
loadColleges();
loadStudents();
