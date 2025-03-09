// script.js

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("resume-form");
    const previewContent = document.getElementById("preview-content");
    const progressBar = document.createElement("div");
    progressBar.id = "progress-bar";
    document.body.insertBefore(progressBar, document.body.firstChild);

    function updatePreview() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const summary = document.getElementById("profile-summary").value;
        const skills = document.getElementById("skills").value;
        const education = Array.from(document.getElementsByClassName("education-field"))
                            .map(input => input.value).filter(value => value).join("<br>");
        const experience = Array.from(document.getElementsByClassName("experience-field"))
                            .map(input => input.value).filter(value => value).join("<br>");

        previewContent.innerHTML = `
            <h2>${name || "Your Name"}</h2>
            <p><strong>Email:</strong> ${email || "your.email@example.com"}</p>
            <p><strong>Phone:</strong> ${phone || "123-456-7890"}</p>
            <p><strong>Profile Summary:</strong> ${summary || "A brief introduction about yourself."}</p>
            <p><strong>Skills:</strong> ${skills || "List your skills here."}</p>
            <p><strong>Education:</strong> ${education || "Add your education details."}</p>
            <p><strong>Experience:</strong> ${experience || "Add your experience details."}</p>
        `;
        updateProgressBar();
    }

    function updateProgressBar() {
        const inputs = form.querySelectorAll("input, textarea");
        const filledInputs = Array.from(inputs).filter(input => input.value.trim() !== "");
        const progress = Math.round((filledInputs.length / inputs.length) * 100);
        progressBar.style.width = progress + "%";
        progressBar.textContent = progress + "% completed";
    }

    form.addEventListener("input", updatePreview);

    window.generateResume = function() {
        updatePreview();
        alert("Resume generated successfully!");
    };

    window.addEducation = function() {
        let section = document.getElementById("education-section");
        let newField = document.createElement("input");
        newField.type = "text";
        newField.placeholder = "Enter education details";
        newField.className = "education-field";
        section.appendChild(newField);
        newField.addEventListener("input", updatePreview);
    };

    window.addExperience = function() {
        let section = document.getElementById("experience-section");
        let wrapper = document.createElement("div");
        wrapper.className = "experience-wrapper";
        
        let newField = document.createElement("input");
        newField.type = "text";
        newField.placeholder = "Enter work experience details";
        newField.className = "experience-field";
        
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";
        removeBtn.onclick = function() {
            section.removeChild(wrapper);
            updatePreview();
        };
        
        wrapper.appendChild(newField);
        wrapper.appendChild(removeBtn);
        section.appendChild(wrapper);
        
        newField.addEventListener("input", updatePreview);
    };

    window.clearForm = function() {
        form.reset();
        updatePreview();
    };

    window.downloadPDF = function() {
        updatePreview(); // Ensure preview is up-to-date
    
        const element = document.getElementById("resume-preview");
        if (!element) {
            alert("Resume preview is not found!");
            return;
        }
    
        element.style.display = "block"; // Ensure visibility
        element.style.opacity = "1";
    
        setTimeout(() => {
            html2pdf().set({
                margin: 10,
                filename: 'Resume.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 3, useCORS: true, logging: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).from(element).save();
        }, 500); // Small delay to ensure rendering
    };

    updatePreview();
});
