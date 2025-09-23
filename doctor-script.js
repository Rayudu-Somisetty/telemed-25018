// Doctor Dashboard JavaScript Functionality

// Doctor authentication and session management
let doctorSession = {
    isLoggedIn: false,
    doctorInfo: null,
    availability: false
};

// Initialize doctor dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Doctor dashboard script loaded');
    
    // For immediate testing, let's bypass login and go straight to dashboard
    setTimeout(() => {
        console.log('Bypassing login and going to dashboard');
        
        // Set up doctor session
        doctorSession = {
            isLoggedIn: true,
            doctorInfo: {
                name: 'Dr. Rajesh Kumar',
                specialization: 'General Medicine',
                licenseNumber: 'DOC123456',
                rating: 4.8,
                experience: '12 years'
            },
            availability: false
        };
        
        // Save session
        localStorage.setItem('doctorSession', JSON.stringify(doctorSession));
        
        // Show dashboard directly
        showDoctorDashboard();
        updateAvailabilityStatus();
        
    }, 500);
});

// Doctor Login Function
function doctorLogin() {
    console.log('Doctor login function called');
    
    const licenseNumber = document.getElementById('license-number')?.value || 'DOC123456';
    const password = document.getElementById('doctor-password')?.value || 'doctor123';
    
    console.log('License:', licenseNumber, 'Password:', password);
    
    if (!licenseNumber || !password) {
        console.error('Missing credentials');
        alert('Please enter both license number and password');
        return;
    }
    
    // Demo authentication - replace with real API call
    if (licenseNumber === 'DOC123456' && password === 'doctor123') {
        console.log('Login successful');
        
        doctorSession = {
            isLoggedIn: true,
            doctorInfo: {
                name: 'Dr. Rajesh Kumar',
                specialization: 'General Medicine',
                licenseNumber: licenseNumber,
                rating: 4.8,
                experience: '12 years'
            },
            availability: false
        };
        
        // Save session
        localStorage.setItem('doctorSession', JSON.stringify(doctorSession));
        
        showDoctorDashboard();
        updateDoctorProfile();
    } else {
        console.error('Invalid credentials');
        alert('Invalid credentials. Try:\nLicense: DOC123456\nPassword: doctor123');
    }
}

// Show Doctor Dashboard
function showDoctorDashboard() {
    console.log('Showing doctor dashboard...');
    
    // Hide login screen
    const loginScreen = document.getElementById('doctor-login-screen');
    if (loginScreen) {
        loginScreen.classList.remove('active');
        console.log('Login screen hidden');
    }
    
    // Show dashboard screen
    const dashboardScreen = document.getElementById('doctor-dashboard-screen');
    if (dashboardScreen) {
        dashboardScreen.classList.add('active');
        console.log('Dashboard screen shown');
    } else {
        console.error('Dashboard screen not found!');
    }
    
    // Load dashboard data
    loadDashboardData();
}

// Update Doctor Profile Display
function updateDoctorProfile() {
    if (doctorSession.doctorInfo) {
        // Update any profile displays
        console.log('Doctor logged in:', doctorSession.doctorInfo.name);
    }
}

// Toggle Availability Status
function toggleAvailability() {
    const toggle = document.getElementById('availability-status');
    const statusText = document.getElementById('availability-text');
    
    doctorSession.availability = toggle.checked;
    
    if (toggle.checked) {
        statusText.textContent = 'Online';
        statusText.style.color = '#28a745';
        showNotification('You are now available for consultations', 'success');
    } else {
        statusText.textContent = 'Offline';
        statusText.style.color = '#dc3545';
        showNotification('You are now offline', 'info');
    }
    
    // Save updated session
    localStorage.setItem('doctorSession', JSON.stringify(doctorSession));
}

// Update Availability Status on Load
function updateAvailabilityStatus() {
    const toggle = document.getElementById('availability-status');
    const statusText = document.getElementById('availability-text');
    
    if (toggle && statusText) {
        toggle.checked = doctorSession.availability;
        statusText.textContent = doctorSession.availability ? 'Online' : 'Offline';
        statusText.style.color = doctorSession.availability ? '#28a745' : '#dc3545';
    }
}

// Profile Menu Toggle
function toggleProfileMenu() {
    const menu = document.getElementById('profile-menu');
    menu.classList.toggle('active');
}

// Close profile menu when clicking outside
document.addEventListener('click', function(event) {
    const profileDropdown = document.querySelector('.profile-dropdown');
    const menu = document.getElementById('profile-menu');
    
    if (menu && !profileDropdown.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Load Dashboard Data
function loadDashboardData() {
    // Simulate loading dashboard statistics
    setTimeout(() => {
        updateNotificationCount();
        loadRecentActivities();
    }, 500);
}

// Update Notification Count
function updateNotificationCount() {
    const notificationCount = document.getElementById('notification-count');
    if (notificationCount) {
        // Simulate new notifications
        const count = Math.floor(Math.random() * 5) + 1;
        notificationCount.textContent = count;
    }
}

// Start Consultation
function startConsultation(patientId) {
    showNotification(`Starting consultation with patient ${patientId}`, 'info');
    
    // Simulate starting video consultation
    setTimeout(() => {
        alert(`Video consultation started with patient ${patientId}`);
        // Here you would typically open the video consultation interface
    }, 1000);
}

// View Patient Details
function viewPatient(patientId) {
    showNotification(`Loading patient details for ${patientId}`, 'info');
    
    // Simulate patient details modal
    setTimeout(() => {
        alert(`Patient Details:\nID: ${patientId}\nName: Patient Name\nAge: 32\nCondition: Hypertension`);
    }, 500);
}

// View Patient History
function viewPatientHistory(patientId) {
    showNotification(`Loading patient history for ${patientId}`, 'info');
    
    setTimeout(() => {
        alert(`Patient History:\nPrevious consultations: 3\nLast visit: 2 days ago\nCurrent medications: Prescribed`);
    }, 500);
}

// Join Active Consultation
function joinConsultation(consultationId) {
    showNotification('Joining consultation...', 'info');
    
    setTimeout(() => {
        alert(`Joined consultation ${consultationId}`);
        // Open video consultation interface
    }, 1000);
}

// View Consultation Details
function viewConsultation(consultationId) {
    showNotification(`Loading consultation details for ${consultationId}`, 'info');
    
    setTimeout(() => {
        alert(`Consultation Details:\nDuration: 25 minutes\nDiagnosis: Completed\nPrescription: Sent`);
    }, 500);
}

// Handle Emergency Response
function handleEmergency(patientId) {
    const modal = document.getElementById('emergency-modal');
    
    // Populate emergency details
    document.getElementById('emergency-patient-name').textContent = 'Rajesh Kumar';
    document.getElementById('emergency-patient-age').textContent = '45';
    document.getElementById('emergency-symptoms').textContent = 'Chest pain, shortness of breath';
    
    modal.classList.add('active');
}

// Close Emergency Modal
function closeEmergencyModal() {
    const modal = document.getElementById('emergency-modal');
    modal.classList.remove('active');
}

// Accept Emergency Consultation
function acceptEmergency() {
    showNotification('Emergency consultation accepted. Connecting...', 'success');
    closeEmergencyModal();
    
    setTimeout(() => {
        alert('Connected to emergency patient. Video call starting...');
    }, 1000);
}

// Transfer Emergency to Specialist
function transferEmergency() {
    showNotification('Transferring to specialist...', 'info');
    closeEmergencyModal();
    
    setTimeout(() => {
        alert('Patient transferred to cardiology specialist');
    }, 1000);
}

// Search Patients
function searchPatients() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.focus();
        showNotification('Enter patient name or ID to search', 'info');
    }
}

// Show All Appointments
function showAllAppointments() {
    showNotification('Loading all appointments...', 'info');
    
    setTimeout(() => {
        alert('All Appointments:\n\n10:30 AM - Rajesh Kumar (Urgent)\n11:00 AM - Priya Sharma\n11:30 AM - Amit Singh\n12:00 PM - Sunita Devi\n12:30 PM - Mohan Lal');
    }, 500);
}

// Show All Consultations
function showAllConsultations() {
    showNotification('Loading consultation history...', 'info');
    
    setTimeout(() => {
        alert('Recent Consultations:\n\nActive: Sunita Devi (12 mins)\nCompleted: Mohan Lal (25 mins)\nCompleted: Ravi Kumar (18 mins)\nCompleted: Meera Singh (22 mins)');
    }, 500);
}

// Show Notifications Panel
function showNotifications() {
    showNotification('Opening notifications panel...', 'info');
    
    setTimeout(() => {
        alert('Notifications:\n\n🚨 Emergency: Patient #12348\n💊 Prescription query from pharmacy\n📊 Lab results for Sunita Devi\n📅 New appointment request');
    }, 500);
}

// Mark All Notifications as Read
function markAllRead() {
    const notificationCount = document.getElementById('notification-count');
    if (notificationCount) {
        notificationCount.textContent = '0';
        notificationCount.style.display = 'none';
    }
    
    showNotification('All notifications marked as read', 'success');
}

// View Query
function viewQuery(queryId) {
    showNotification(`Loading query ${queryId}...`, 'info');
    
    setTimeout(() => {
        alert('Pharmacy Query:\n\nPatient: Rajesh Kumar\nMedication: Metformin 500mg\nQuery: Dosage clarification for elderly patient\nPharmacy: City Medical Store');
    }, 500);
}

// View Lab Results
function viewLabResults(labId) {
    showNotification(`Loading lab results ${labId}...`, 'info');
    
    setTimeout(() => {
        alert('Lab Results - Sunita Devi:\n\nBlood Glucose: 95 mg/dL (Normal)\nHbA1c: 6.2% (Good control)\nLipid Profile: Within normal limits\nRecommendation: Continue current medication');
    }, 500);
}

// Show Detailed Analytics
function showDetailedAnalytics() {
    showNotification('Loading detailed analytics...', 'info');
    
    setTimeout(() => {
        alert('Detailed Analytics:\n\nDaily Performance:\n- Consultations: 8/12 completed\n- Average duration: 18 minutes\n- Patient satisfaction: 4.8/5\n\nWeekly Overview:\n- Total consultations: 67\n- Revenue: ₹28,500\n- Growth: +15% from last week');
    }, 500);
}

// Show Profile Settings
function showProfile() {
    showNotification('Opening profile settings...', 'info');
    
    setTimeout(() => {
        alert(`Doctor Profile:\n\nName: ${doctorSession.doctorInfo.name}\nSpecialization: ${doctorSession.doctorInfo.specialization}\nLicense: ${doctorSession.doctorInfo.licenseNumber}\nExperience: ${doctorSession.doctorInfo.experience}\nRating: ${doctorSession.doctorInfo.rating}/5`);
    }, 500);
}

// Show Settings
function showSettings() {
    showNotification('Opening settings...', 'info');
    
    setTimeout(() => {
        alert('Settings:\n\n📱 Notification Preferences\n⏰ Working Hours\n🔐 Privacy & Security\n💳 Payment Settings\n📊 Analytics Preferences');
    }, 500);
}

// Doctor Logout
function doctorLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session
        localStorage.removeItem('doctorSession');
        doctorSession = {
            isLoggedIn: false,
            doctorInfo: null,
            availability: false
        };
        
        // Reset forms
        document.getElementById('license-number').value = '';
        document.getElementById('doctor-password').value = '';
        
        // Show login screen
        document.getElementById('doctor-dashboard-screen').classList.remove('active');
        document.getElementById('doctor-login-screen').classList.add('active');
        
        showNotification('Logged out successfully', 'success');
    }
}

// Show Forgot Password
function showForgotPassword() {
    const email = prompt('Enter your registered email address:');
    if (email) {
        showNotification('Password reset instructions sent to your email', 'success');
    }
}

// Show Doctor Registration
function showDoctorRegistration() {
    alert('Doctor Registration:\n\nPlease contact our medical administrator to register as a new doctor.\n\nEmail: admin@telemed.com\nPhone: +91-9876543210\n\nRequired documents:\n- Medical degree certificate\n- License verification\n- Identity proof');
}

// Load Recent Activities
function loadRecentActivities() {
    // Simulate loading recent activities
    console.log('Loading recent activities...');
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Handle Enter key in login form
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const loginScreen = document.getElementById('doctor-login-screen');
        if (loginScreen && loginScreen.classList.contains('active')) {
            doctorLogin();
        }
    }
});

// Utility function to show screens (similar to patient app)
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Character counter for textareas
function updateCharCount(textareaId, countId, maxLength) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(countId);
    
    if (textarea && counter) {
        const currentLength = textarea.value.length;
        counter.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength > maxLength) {
            counter.style.color = '#dc3545';
        } else {
            counter.style.color = '#666';
        }
    }
}

// Language support (basic)
const languages = {
    en: {
        welcome: 'Welcome',
        dashboard: 'Dashboard',
        appointments: 'Appointments',
        consultations: 'Consultations'
    },
    hi: {
        welcome: 'स्वागत',
        dashboard: 'डैशबोर्ड',
        appointments: 'नियुक्तियाँ',
        consultations: 'परामर्श'
    }
};

let currentLanguage = 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    // Update UI text based on language
    updateUIText();
}

function updateUIText() {
    // Update text content based on current language
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (languages[currentLanguage] && languages[currentLanguage][key]) {
            element.textContent = languages[currentLanguage][key];
        }
    });
}

// Simulate real-time updates
setInterval(() => {
    if (doctorSession.isLoggedIn) {
        // Simulate notification updates
        const notifications = document.querySelectorAll('.notification-item');
        if (notifications.length > 0 && Math.random() > 0.95) {
            updateNotificationCount();
        }
    }
}, 30000); // Check every 30 seconds
