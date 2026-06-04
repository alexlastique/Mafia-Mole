// ============================================
// FAQ FUNCTIONALITY
// ============================================
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        city: document.getElementById('city').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // Validate email
    if (!isValidEmail(formData.email)) {
        showFormMessage('Veuillez entrer une adresse email valide', 'error');
        return;
    }

    // Show loading state
    showFormMessage('Envoi en cours...', 'loading');
    const submitBtn = contactForm.querySelector('.submit-button');
    submitBtn.disabled = true;

    // Simulate sending data (in production, this would be a real API call)
    setTimeout(() => {
        // Save to localStorage (for demo purposes)
        saveSubmission(formData);

        // Reset form
        contactForm.reset();

        // Show success message
        showFormMessage('✅ Merci ! Nous vous contacterons bientôt pour vous ajouter à la bêta !', 'success');
        
        // Re-enable button
        submitBtn.disabled = false;

        // Clear message after 5 seconds
        setTimeout(() => {
            formNote.textContent = '';
        }, 5000);
    }, 1500);
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    formNote.textContent = message;
    formNote.style.color = type === 'error' ? '#f5576c' : type === 'success' ? '#43e97b' : '#667eea';
    formNote.style.fontWeight = 'bold';
}

function saveSubmission(data) {
    // Get existing submissions from localStorage
    let submissions = JSON.parse(localStorage.getItem('mafiaMoleSubmissions') || '[]');
    
    // Add new submission
    submissions.push(data);
    
    // Save back to localStorage
    localStorage.setItem('mafiaMoleSubmissions', JSON.stringify(submissions));
    
    console.log('Submission saved:', data);
    console.log('Total submissions:', submissions.length);
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// NAVBAR ACTIVE STATE
// ============================================
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// ADD ACTIVE STATE STYLING TO CSS
// ============================================
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent);
        border-bottom: 2px solid var(--accent);
    }
`;
document.head.appendChild(style);

// ============================================
// LOGGING
// ============================================
console.log('🕵️ Mafia Mole Landing Page loaded successfully!');
console.log('Submissions can be viewed in localStorage: mafiaMoleSubmissions');
