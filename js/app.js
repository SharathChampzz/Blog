document.addEventListener('DOMContentLoaded', () => {
  // Navigation Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Skills Dynamic Rendering
  const skillsData = [
      { name: 'JavaScript', level: 85 },
      { name: 'Python', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'Selenium', level: 80 },
      { name: 'React', level: 65 },
      { name: 'Node.js', level: 60 },
      { name: 'SQL', level: 75 },
      { name: 'Docker', level: 55 }
  ];

  const skillsContainer = document.getElementById('skills-container');
  skillsData.forEach(skill => {
      const skillElement = document.createElement('div');
      skillElement.classList.add('skill-bar');
      skillElement.innerHTML = `
          <div style="width: 100%">
              <div class="skill-name">${skill.name}</div>
              <div class="skill-progress" style="width: 100%; background-color: #e0e0e0; border-radius: 10px; height: 10px;">
                  <div class="skill-bar-fill" style="width: 0%; height: 100%; background-color: #3498db; border-radius: 10px; transition: width 1.5s ease-in-out;"></div>
              </div>
          </div>
      `;
      skillsContainer.appendChild(skillElement);

      // Animate skill bars
      setTimeout(() => {
          skillElement.querySelector('.skill-bar-fill').style.width = `${skill.level}%`;
      }, 500);
  });

  // Project Filtering and Rendering
  fetch("data/projects.json")
      .then(response => response.json())
      .then(projects => {
          const projectList = document.getElementById("project-list");
          const filterButtons = document.querySelectorAll('.filter-btn');

          function renderProjects(filter = 'all') {
              projectList.innerHTML = '';
              const filteredProjects = filter === 'all' 
                  ? projects 
                  : projects.filter(project => project.category === filter);

              filteredProjects.forEach(project => {
                  const projectCard = document.createElement("div");
                  projectCard.classList.add("project", project.category);
                  
                  projectCard.innerHTML = `
                      <h3>${project.title}</h3>
                      <p>${project.description}</p>
                      ${project.link ? 
                          `<a href="${project.link}" target="_blank">🔗 View Code</a>` : 
                          `<button onclick="showToast()">❌ No Code Available</button>`
                      }
                  `;
                  
                  projectList.appendChild(projectCard);
              });
          }

          // Initial render
          renderProjects();

          // Filter functionality
          filterButtons.forEach(button => {
              button.addEventListener('click', () => {
                  // Remove active class from all buttons
                  filterButtons.forEach(btn => btn.classList.remove('active'));
                  
                  // Add active to clicked button
                  button.classList.add('active');
                  
                  // Render filtered projects
                  renderProjects(button.dataset.filter);
              });
          });
      })
      .catch(error => console.error("Failed to load projects:", error));

  // Contact Form Submission (Mock)
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector('textarea').value;

      // In a real-world scenario, you'd send this to a backend
      console.log('Form Submitted:', { name, email, message });
      
      // Show success message
      alert('Thank you for your message! I\'ll get back to you soon.');
      
      // Reset form
      contactForm.reset();
  });

  // Toast Notification Logic
  window.showToast = function() {
      const toast = document.getElementById("toast");
      toast.classList.add("show");
      setTimeout(() => {
          toast.classList.remove("show");
      }, 3000);
  };
});

// Intersection Observer for Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
      }
  });
}, observerOptions);

// Apply fade-in to sections
document.querySelectorAll('section').forEach(section => {
  fadeInObserver.observe(section);
});