// script.js


const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Dynamic content loading and animated section transitions
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            loadSectionContent(entry.target.id);
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

function loadSectionContent(sectionId) {
    switch (sectionId) {
        case 'resume':
            loadTimelineItems();
            break;
        case 'projects':
            loadProjects();
            break;
        case 'skills':
            loadSkills();
            break;
    }
}

// Resume timeline
function loadTimelineItems() {
    const timeline = document.getElementById('timeline');
    const items = [
        { title: 'University Degree', date: '2020-2024', details: 'Bachelor in Computer Science' },
        { title: 'Internship', date: 'Summer 2023', details: 'Software Developer Intern at Tech Corp' },
        // Add more items as needed
    ];

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('timeline-item');
        itemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.date}</p>
            <div class="details">${item.details}</div>
        `;
        itemElement.addEventListener('click', () => {
            itemElement.querySelector('.details').style.display = 
                itemElement.querySelector('.details').style.display === 'none' ? 'block' : 'none';
        });
        timeline.appendChild(itemElement);
    });
}

// Projects section
function loadProjects() {
    const projectList = document.getElementById('project-list');
    const projects = [
        { name: 'Project 1', description: '', category: 'completed javascript', preview: 'project1.jpg' },
        { name: 'Project 2', description: '', category: 'in-progress python', preview: 'project2.jpg' },
        // Add more projects as needed
    ];

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-item');
        projectElement.dataset.category = project.category;
        projectElement.innerHTML = `
            <h3>${project.name}</h3>
            <img src="${project.preview}" alt="${project.name} preview">
        `;
        projectList.appendChild(projectElement);
    });

    // Project filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterProjects(filter);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-item');
    projects.forEach(project => {
        if (filter === 'all' || project.dataset.category.includes(filter)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Skills section
function loadSkills() {
    const skillsList = document.getElementById('skills-list');
    const skills = [
        { name: 'JavaScript', level: 80 },
        { name: 'Python', level: 70 },
        { name: 'HTML/CSS', level: 90 },
        // Add more skills as needed
    ];

    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.classList.add('skill-item');
        skillElement.innerHTML = `
            <h3>${skill.name}</h3>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%"></div>
            </div>
        `;
        skillsList.appendChild(skillElement);

        // Animate skill progress
        setTimeout(() => {
            skillElement.querySelector('.skill-progress').style.width = `${skill.level}%`;
        }, 100);
    });
}

// Contact form validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Here you would typically send the form data to a server
        alert('Message sent successfully!');
        contactForm.reset();
    }
});

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields.');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});