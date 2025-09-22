// TeleMed App JavaScript - Optimized for low-end devices

// Global state management
let currentLanguage = 'en';
let currentUser = null;
let consultationData = {};

// Address data for dropdowns
const addressData = {
    'andhra-pradesh': {
        name: 'Andhra Pradesh',
        districts: {
            'east-godavari': {
                name: 'East Godavari',
                cities: {
                    'kakinada': {
                        name: 'Kakinada',
                        blocks: {
                            'urban-kakinada': {
                                name: 'Urban Kakinada',
                                mandals: {
                                    'kakinada-urban': {
                                        name: 'Kakinada Urban',
                                        secretariats: ['Secretariat 1', 'Secretariat 2']
                                    }
                                }
                            }
                        }
                    },
                    'rajamahendravaram': {
                        name: 'Rajamahendravaram',
                        blocks: {
                            'urban-rajamahendravaram': {
                                name: 'Urban Rajamahendravaram',
                                mandals: {
                                    'rajamahendravaram-urban': {
                                        name: 'Rajamahendravaram Urban',
                                        secretariats: ['Secretariat A', 'Secretariat B']
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'krishna': {
                name: 'Krishna',
                cities: {
                    'vijayawada': {
                        name: 'Vijayawada',
                        blocks: {
                            'urban-vijayawada': {
                                name: 'Urban Vijayawada',
                                mandals: {
                                    'vijayawada-urban': {
                                        name: 'Vijayawada Urban',
                                        secretariats: ['Patamata', 'Governorpet', 'Gandhinagar']
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    'telangana': {
        name: 'Telangana',
        districts: {
            'hyderabad': {
                name: 'Hyderabad',
                cities: {
                    'hyderabad': {
                        name: 'Hyderabad',
                        blocks: {
                            'urban-hyderabad': {
                                name: 'Urban Hyderabad',
                                mandals: {
                                    'hyderabad-central': {
                                        name: 'Hyderabad Central',
                                        secretariats: ['Charminar', 'Golconda', 'Himayatnagar']
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

// Language content
const translations = {
    en: {
        welcome: 'Welcome',
        login: 'Login',
        register: 'Register Now',
        aadharNumber: 'Aadhar Number / ABHA Number',
        password: 'Password',
        consultDoctor: 'Consult Doctor',
        previousConsultations: 'Previous Consultations'
    },
    hi: {
        welcome: 'स्वागत है',
        login: 'लॉगिन',
        register: 'अभी रजिस्टर करें',
        aadharNumber: 'आधार नंबर / एबीएचए नंबर',
        password: 'पासवर्ड',
        consultDoctor: 'डॉक्टर से सलाह लें',
        previousConsultations: 'पिछली सलाह'
    },
    pa: {
        welcome: 'ਜੀ ਆਇਆਂ ਨੂੰ',
        login: 'ਲਾਗਇਨ',
        register: 'ਹੁਣ ਰਜਿਸਟਰ ਕਰੋ',
        aadharNumber: 'ਆਧਾਰ ਨੰਬਰ / ਏਬੀਐਚਏ ਨੰਬਰ',
        password: 'ਪਾਸਵਰਡ',
        consultDoctor: 'ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ',
        previousConsultations: 'ਪਿਛਲੀਆਂ ਸਲਾਹਾਂ'
    }
};

// Utility functions
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Update navigation active state
    updateNavigation(screenId);
}

function updateNavigation(screenId) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class based on screen
    if (screenId === 'dashboard-screen') {
        document.querySelector('.nav-item:nth-child(1)').classList.add('active');
    } else if (screenId === 'consultations-screen') {
        document.querySelector('.nav-item:nth-child(2)').classList.add('active');
    } else if (screenId === 'more-screen') {
        document.querySelector('.nav-item:nth-child(3)').classList.add('active');
    }
}

function selectLanguage(language) {
    currentLanguage = language;
    console.log('Language selected:', language);
    showScreen('login-screen');
}

function updateLanguageContent() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Authentication functions
function login() {
    const aadhar = document.getElementById('aadhar').value;
    const password = document.getElementById('password').value;
    
    if (!aadhar || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate login validation
    if (aadhar.length >= 12 && password.length >= 6) {
        currentUser = {
            name: 'Rayudu Somi Setty',
            aadhar: aadhar,
            age: 19,
            mobile: '9494588144',
            patientId: '1018259369185939'
        };
        showScreen('dashboard-screen');
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function sendOTP() {
    const mobile = document.getElementById('mobile').value;
    
    if (!mobile || mobile.length !== 10) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }
    
    // Show OTP input field
    document.getElementById('otp-group').style.display = 'block';
    
    // Simulate OTP sending
    setTimeout(() => {
        alert('OTP sent to ' + mobile + ': 123456');
    }, 500);
}

function verifyAndProceed() {
    const documentFile = document.getElementById('document').files[0];
    const mobile = document.getElementById('mobile').value;
    const otp = document.getElementById('otp').value;
    
    if (!documentFile) {
        alert('Please upload a document');
        return;
    }
    
    if (!mobile || mobile.length !== 10) {
        alert('Please enter a valid mobile number');
        return;
    }
    
    if (!otp || otp !== '123456') {
        alert('Invalid OTP. Please try again.');
        return;
    }
    
    // Proceed to user details
    showScreen('user-details-screen');
}

// Address dropdown functions
function updateDistricts() {
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    const selectedState = stateSelect.value;
    
    // Clear dependent dropdowns
    clearSelect(districtSelect);
    clearSelect(document.getElementById('city'));
    clearSelect(document.getElementById('block'));
    clearSelect(document.getElementById('mandal'));
    clearSelect(document.getElementById('secretariat'));
    
    if (selectedState && addressData[selectedState]) {
        const districts = addressData[selectedState].districts;
        Object.keys(districts).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = districts[key].name;
            districtSelect.appendChild(option);
        });
    }
}

function updateCities() {
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    const citySelect = document.getElementById('city');
    
    const selectedState = stateSelect.value;
    const selectedDistrict = districtSelect.value;
    
    clearSelect(citySelect);
    clearSelect(document.getElementById('block'));
    clearSelect(document.getElementById('mandal'));
    clearSelect(document.getElementById('secretariat'));
    
    if (selectedState && selectedDistrict && 
        addressData[selectedState] && 
        addressData[selectedState].districts[selectedDistrict]) {
        
        const cities = addressData[selectedState].districts[selectedDistrict].cities;
        Object.keys(cities).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = cities[key].name;
            citySelect.appendChild(option);
        });
    }
}

function updateBlocks() {
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    const citySelect = document.getElementById('city');
    const blockSelect = document.getElementById('block');
    
    const selectedState = stateSelect.value;
    const selectedDistrict = districtSelect.value;
    const selectedCity = citySelect.value;
    
    clearSelect(blockSelect);
    clearSelect(document.getElementById('mandal'));
    clearSelect(document.getElementById('secretariat'));
    
    if (selectedState && selectedDistrict && selectedCity &&
        addressData[selectedState] &&
        addressData[selectedState].districts[selectedDistrict] &&
        addressData[selectedState].districts[selectedDistrict].cities[selectedCity]) {
        
        const blocks = addressData[selectedState].districts[selectedDistrict].cities[selectedCity].blocks;
        Object.keys(blocks).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = blocks[key].name;
            blockSelect.appendChild(option);
        });
    }
}

function updateMandals() {
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    const citySelect = document.getElementById('city');
    const blockSelect = document.getElementById('block');
    const mandalSelect = document.getElementById('mandal');
    
    const selectedState = stateSelect.value;
    const selectedDistrict = districtSelect.value;
    const selectedCity = citySelect.value;
    const selectedBlock = blockSelect.value;
    
    clearSelect(mandalSelect);
    clearSelect(document.getElementById('secretariat'));
    
    if (selectedState && selectedDistrict && selectedCity && selectedBlock &&
        addressData[selectedState] &&
        addressData[selectedState].districts[selectedDistrict] &&
        addressData[selectedState].districts[selectedDistrict].cities[selectedCity] &&
        addressData[selectedState].districts[selectedDistrict].cities[selectedCity].blocks[selectedBlock]) {
        
        const mandals = addressData[selectedState].districts[selectedDistrict].cities[selectedCity].blocks[selectedBlock].mandals;
        Object.keys(mandals).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = mandals[key].name;
            mandalSelect.appendChild(option);
        });
    }
}

function updateSecretariats() {
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    const citySelect = document.getElementById('city');
    const blockSelect = document.getElementById('block');
    const mandalSelect = document.getElementById('mandal');
    const secretariatSelect = document.getElementById('secretariat');
    
    const selectedState = stateSelect.value;
    const selectedDistrict = districtSelect.value;
    const selectedCity = citySelect.value;
    const selectedBlock = blockSelect.value;
    const selectedMandal = mandalSelect.value;
    
    clearSelect(secretariatSelect);
    
    if (selectedState && selectedDistrict && selectedCity && selectedBlock && selectedMandal &&
        addressData[selectedState] &&
        addressData[selectedState].districts[selectedDistrict] &&
        addressData[selectedState].districts[selectedDistrict].cities[selectedCity] &&
        addressData[selectedState].districts[selectedDistrict].cities[selectedCity].blocks[selectedBlock] &&
        addressData[selectedState].districts[selectedDistrict].cities[selectedCity].blocks[selectedBlock].mandals[selectedMandal]) {
        
        const secretariats = addressData[selectedState].districts[selectedDistrict].cities[selectedCity].blocks[selectedBlock].mandals[selectedMandal].secretariats;
        secretariats.forEach(secretariat => {
            const option = document.createElement('option');
            option.value = secretariat.toLowerCase().replace(/\s+/g, '-');
            option.textContent = secretariat;
            secretariatSelect.appendChild(option);
        });
    }
}

function clearSelect(selectElement) {
    selectElement.innerHTML = '<option value="">Select ' + selectElement.previousElementSibling.textContent + '</option>';
}

function completeRegistration() {
    const requiredFields = ['state', 'district', 'city', 'block', 'mandal', 'secretariat', 'pincode'];
    const missingFields = requiredFields.filter(field => !document.getElementById(field).value);
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Simulate registration completion
    alert('Registration completed successfully!');
    showScreen('dashboard-screen');
}

// Consultation functions
function bookAppointment() {
    alert('Appointment booking feature will be available soon!');
}

function toggleAudio() {
    const button = event.target;
    button.style.backgroundColor = button.style.backgroundColor === 'red' ? '#666' : 'red';
}

function toggleVideo() {
    const button = event.target;
    button.style.backgroundColor = button.style.backgroundColor === 'red' ? '#666' : 'red';
}

function endCall() {
    if (confirm('Are you sure you want to end the call?')) {
        // Add consultation record
        addConsultationRecord();
        showScreen('dashboard-screen');
    }
}

function addConsultationRecord() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    // This would normally save to a database
    console.log('Consultation completed on', dateStr);
}

function sendMessage() {
    const input = document.getElementById('chatMessage');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message patient';
        messageDiv.innerHTML = `
            <span class="sender">You:</span>
            <span class="text">${message}</span>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        input.value = '';
        
        // Simulate doctor response
        setTimeout(() => {
            const doctorMessage = document.createElement('div');
            doctorMessage.className = 'message doctor';
            doctorMessage.innerHTML = `
                <span class="sender">Dr. Kumar:</span>
                <span class="text">Thank you for sharing that information.</span>
            `;
            messagesContainer.appendChild(doctorMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }
}

// More menu functions
function resetPassword() {
    alert('Reset password functionality will be implemented');
}

function otherMembers() {
    alert('Other members management will be available soon');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        showScreen('language-screen');
    }
}

// Character counter for textarea
function updateCharCount() {
    const textarea = document.getElementById('query');
    const counter = document.querySelector('.char-count');
    
    if (textarea && counter) {
        const currentLength = textarea.value.length;
        counter.textContent = `${currentLength}/1500`;
        
        if (currentLength > 1500) {
            counter.style.color = 'red';
        } else {
            counter.style.color = '#666';
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    showScreen('language-screen');
    
    // Add character counter to query textarea
    const queryTextarea = document.getElementById('query');
    if (queryTextarea) {
        queryTextarea.addEventListener('input', updateCharCount);
    }
    
    // Add enter key listener for chat
    const chatInput = document.getElementById('chatMessage');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add file upload feedback
    const fileInput = document.getElementById('document');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0]?.name || 'No file selected';
            const label = this.nextElementSibling;
            if (label) {
                label.textContent = fileName.length > 20 ? fileName.substring(0, 20) + '...' : fileName;
            }
        });
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Performance optimization for low-end devices
function optimizeForLowEndDevices() {
    // Reduce animations on low-end devices
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        document.body.classList.add('low-performance');
        
        // Disable heavy animations
        const style = document.createElement('style');
        style.textContent = `
            .low-performance * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimizations
optimizeForLowEndDevices();