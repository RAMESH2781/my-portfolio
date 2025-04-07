// DOM Elements
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('projectModal');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contactForm');
const successMessage = document.querySelector('.success-message');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const revealElements = document.querySelectorAll('.reveal');

// Typing effect for hero section
const typingText = document.querySelector('.typing-text');
const roles = ["Fullstack Developer", "UI/UX Designer", "Creative Coder", "Digital Artist"];
let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, characterIndex - 1);
    characterIndex--;
    typingDelay = 100;
  } else {
    typingText.textContent = currentRole.substring(0, characterIndex + 1);
    characterIndex++;
    typingDelay = 200;
  }
  
  if (!isDeleting && characterIndex === currentRole.length) {
    isDeleting = true;
    typingDelay = 2000; // Delay before starting to delete
  } else if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingDelay = 500; // Delay before typing next role
  }
  
  setTimeout(typeEffect, typingDelay);
}

// Initialize typing effect
setTimeout(typeEffect, 1000);

// Scroll reveal animation
function reveal() {
  for (let i = 0; i < revealElements.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = revealElements[i].getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      revealElements[i].classList.add("active");
      
      // Animate skill bars if they're visible
      if (revealElements[i].querySelector('.skill-progress')) {
        const skillBars = revealElements[i].querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        });
      }
    }
  }
}

// Initialize reveal animation
window.addEventListener("scroll", reveal);
reveal(); // Trigger once on load

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
  // Update theme icon
  if (document.body.classList.contains('light-mode')) {
    themeIcon.textContent = '🌙';
  } else {
    themeIcon.textContent = '☀️';
  }
});

// Project modal functionality
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.getAttribute('data-project');
    const projectTitle = card.querySelector('.project-title').textContent;
    const projectDescription = card.querySelector('p').textContent;
    const projectTags = card.querySelector('.project-tags').innerHTML;
    const projectImage = card.querySelector('.project-image').src;
    
    // Update modal content
    document.querySelector('.modal-title').textContent = projectTitle;
    document.querySelector('.modal-description p').textContent = projectDescription;
    document.querySelector('.modal-tags').innerHTML = projectTags;
    document.querySelector('.modal-image').src = projectImage;
    
    // Set project-specific link (could be updated with real links)
    document.querySelector('.modal-link').href = `#project-${projectId}`;
    
    // Open modal
    projectModal.classList.add('modal-active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });
});

// Close modal functionality
closeModal.addEventListener('click', () => {
  projectModal.classList.remove('modal-active');
  document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside content
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    projectModal.classList.remove('modal-active');
    document.body.style.overflow = 'auto';
  }
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Simulate form submission
  const formData = new FormData(contactForm);
  
  // Here you would normally send the form data to a server
  // For demonstration, we'll just show the success message
  
  // Clear form fields
  contactForm.reset();
  
  // Show success message
  successMessage.style.display = 'flex';
  
  // Hide success message after 3 seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 3000);
});

// Navbar scroll behavior
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.padding = '1rem 0';
    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.padding = '2rem 0';
    navbar.style.boxShadow = 'none';
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Optional: Add preloader
window.addEventListener('load', () => {
  // If you want to add a preloader, you can remove it here when the page is fully loaded
  document.body.classList.add('loaded');
});
