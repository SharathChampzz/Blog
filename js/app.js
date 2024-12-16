// Fetch projects and dynamically render them
fetch("data/projects.json")
  .then((response) => response.json())
  .then((projects) => {
    const projectList = document.getElementById("project-list");

    projects.forEach((project) => {
      // Create project card
      const projectCard = document.createElement("div");
      projectCard.className = "project fade-in";

      // Project title
      const projectTitle = document.createElement("h3");
      projectTitle.textContent = project.title;
      projectCard.appendChild(projectTitle);

      // Project description
      const projectDesc = document.createElement("p");
      projectDesc.textContent = project.description;
      projectCard.appendChild(projectDesc);

      // Action button
      if (project.link) {
        const projectLink = document.createElement("a");
        projectLink.href = project.link;
        projectLink.textContent = "🔗 View Code";
        projectLink.target = "_blank";
        projectCard.appendChild(projectLink);
      } else {
        const noCodeBtn = document.createElement("button");
        noCodeBtn.textContent = "❌ No Code Available";
        noCodeBtn.onclick = showToast;
        projectCard.appendChild(noCodeBtn);
      }

      projectList.appendChild(projectCard);
    });
  })
  .catch((error) => console.error("Failed to load projects:", error));

// Toast notification logic
function showToast() {
  const toast = document.getElementById("toast");
  toast.className = "show";
  setTimeout(() => (toast.className = toast.className.replace("show", "")), 3000);
}
