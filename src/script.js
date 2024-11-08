// Function to handle content editing
function makeEditable() {
  // Make resume sections editable
  document.querySelectorAll("#resume-preview [contenteditable]").forEach((element) => {
    element.addEventListener("input", (event) => {
      const id = event.target.id;
      if (id) {
        const inputElement = document.getElementById(id.replace("preview-", ""));
        if (inputElement) {
          inputElement.value = event.target.innerText;
        }
      }
    });
  });
}

function updatePreview() {
  // Update text fields in preview
  document.getElementById("preview-name").textContent = document.getElementById("name").value || "Your Name";
  document.getElementById("preview-email").textContent = document.getElementById("email").value || "Your Email";
  document.getElementById("preview-phone").textContent = document.getElementById("phone").value || "Your Phone";

  document.getElementById("preview-degree").textContent = document.getElementById("degree").value || "Degree";
  document.getElementById("preview-institution").textContent = document.getElementById("institution").value || "Institution";
  document.getElementById("preview-year").textContent = document.getElementById("year").value || "Year";

  document.getElementById("preview-job-title").textContent = document.getElementById("job-title").value || "Job Title";
  document.getElementById("preview-company").textContent = document.getElementById("company").value || "Company";
  document.getElementById("preview-years").textContent = document.getElementById("years").value || "Years";

  document.getElementById("preview-skills").textContent = document.getElementById("skills").value || "Skills";
}

function updatePicture() {
  const file = document.getElementById("profile-picture").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview-image").src = e.target.result;
      document.getElementById("preview-image").style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

// Function to generate a unique URL based on username
function generateUniqueURL(username) {
  // For local testing, use the current origin (localhost:5500)
  const baseURL = window.location.origin; // For local: "http://localhost:5500"
  
  // For production (e.g., Vercel), you would use the domain like:
  // const baseURL = "https://yourappname.vercel.app"; 
  
  return `${baseURL}/${username}-resume`; // Generate a unique URL
}


// Function to generate resume and show the unique URL
function generateResume() {
  const username = document.getElementById("username").value; // Get the username
  const name = document.getElementById("name").value; // Get the name
  const email = document.getElementById("email").value; // Get the email
  const phone = document.getElementById("phone").value; // Get the phone number

  // Update the preview sections with user data
  document.getElementById("preview-name").innerText = name;
  document.getElementById("preview-email").innerText = email;
  document.getElementById("preview-phone").innerText = phone;

  // Disable the form and hide it
  document.querySelectorAll("#resume-form input").forEach(input => input.disabled = true);
  document.querySelector(".form-section").style.display = "none";

  // Display the generated resume
  document.getElementById("resume-preview").style.display = "block";

  // Generate and display the unique URL
  const uniqueURL = generateUniqueURL(username);
  document.getElementById("resume-link").innerHTML = `Your resume can be viewed at: <a href="${uniqueURL}" target="_blank">${uniqueURL}</a>`;

  // Enable the PDF download
  enableDownload();
}


// Function to enable the download button for the PDF
function enableDownload() {
  const downloadButton = document.getElementById("download-pdf");
  downloadButton.style.display = "block"; // Show the download button
  
  // Add click event to download the resume as a PDF
  downloadButton.addEventListener("click", downloadPDF);
}

function downloadPDF() {
  const { jsPDF } = window.jspdf; // Ensure jsPDF is loaded correctly
  const doc = new jsPDF();

  // Add resume content to the PDF (based on the preview section)
  doc.text("Resume", 10, 10);
  doc.text(`Name: ${document.getElementById("preview-name").innerText}`, 10, 20);
  doc.text(`Email: ${document.getElementById("preview-email").innerText}`, 10, 30);
  doc.text(`Phone: ${document.getElementById("preview-phone").innerText}`, 10, 40);
  doc.text(`Degree: ${document.getElementById("preview-degree").innerText}`, 10, 50);
  doc.text(`Institution: ${document.getElementById("preview-institution").innerText}`, 10, 60);
  doc.text(`Year: ${document.getElementById("preview-year").innerText}`, 10, 70);
  doc.text(`Job Title: ${document.getElementById("preview-job-title").innerText}`, 10, 80);
  doc.text(`Company: ${document.getElementById("preview-company").innerText}`, 10, 90);
  doc.text(`Years: ${document.getElementById("preview-years").innerText}`, 10, 100);
  doc.text(`Skills: ${document.getElementById("preview-skills").innerText}`, 10, 110);

  // Save the PDF
  doc.save("resume.pdf");
}


// Add event listener for "Generate Resume" button
document.getElementById("generate-btn").addEventListener("click", generateResume);
