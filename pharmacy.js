// Pharmacy Management System JavaScript - TeleMed Healthcare

// Initialize demo functionality
function initializeDemo() {
    // Single demo credential
    const demoCredential = { username: 'DEMO001', password: 'demo123456' };

    // Add event listener for the single demo button
    const demoBtn = document.getElementById('demoLogin');
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            fillCredentials(demoCredential);
        });
    }
}

// Fill login form with demo credentials
function fillCredentials(credentials) {
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    
    if (usernameField && passwordField) {
        usernameField.value = credentials.username;
        passwordField.value = credentials.password;
        
        // Add visual feedback
        usernameField.style.background = '#e8f5e8';
        passwordField.style.background = '#e8f5e8';
        
        setTimeout(() => {
            usernameField.style.background = '';
            passwordField.style.background = '';
        }, 1000);
    }
}

// Legacy function for onclick handler in HTML
function fillDemoCredentials(type) {
    fillCredentials({ username: 'DEMO001', password: 'demo123456' });
}

// Global state management
let currentPharmacyUser = null;
let selectedMedicineForDeletion = null;
let inventoryData = [];
let ordersData = [];

// Sample data for demonstration
const sampleInventory = [
    {
        id: 'med1',
        name: 'Paracetamol 500mg',
        genericName: 'Acetaminophen',
        category: 'tablet',
        manufacturer: 'ABC Pharma',
        batchNumber: 'PC001',
        quantity: 50,
        unitType: 'piece',
        purchasePrice: 2.00,
        sellingPrice: 2.50,
        mfgDate: '2024-01-15',
        expiryDate: '2025-12-31',
        storageConditions: 'room-temp',
        prescriptionRequired: true,
        minStock: 20,
        status: 'in-stock'
    },
    {
        id: 'med2',
        name: 'Amoxicillin 250mg',
        genericName: 'Amoxicillin',
        category: 'capsule',
        manufacturer: 'XYZ Pharma',
        batchNumber: 'AM001',
        quantity: 5,
        unitType: 'piece',
        purchasePrice: 12.00,
        sellingPrice: 15.00,
        mfgDate: '2023-08-15',
        expiryDate: '2024-08-15',
        storageConditions: 'cool-dry',
        prescriptionRequired: true,
        minStock: 10,
        status: 'low'
    },
    {
        id: 'med3',
        name: 'Cough Syrup 100ml',
        genericName: 'Dextromethorphan',
        category: 'syrup',
        manufacturer: 'DEF Pharma',
        batchNumber: 'CS001',
        quantity: 15,
        unitType: 'bottle',
        purchasePrice: 35.00,
        sellingPrice: 45.00,
        mfgDate: '2023-06-20',
        expiryDate: '2024-06-20',
        storageConditions: 'room-temp',
        prescriptionRequired: false,
        minStock: 5,
        status: 'expiring'
    }
];

const sampleOrders = [
    {
        id: 'ORD001',
        status: 'pending',
        priority: 'urgent',
        date: '2025-09-23',
        time: '10:30',
        consultationId: 'CONS123',
        patient: {
            name: 'Rayudu Somi Setty',
            age: 19,
            gender: 'Male',
            patientId: '1018259369185939',
            mobile: '9494588144',
            address: 'Eluru Rd, Vijayawada, Andhra Pradesh - 520008'
        },
        doctor: {
            name: 'Dr. Naveen Kumar',
            qualification: 'MBBS, Anaesthesia',
            registration: 'MCI12345',
            diagnosis: 'Viral Fever, Headache'
        },
        medicines: [
            {
                name: 'Paracetamol 500mg',
                dosage: '1 tablet twice daily after meals for 3 days',
                quantity: 6,
                unit: 'tablets',
                instructions: 'Take with water, avoid empty stomach',
                availability: 'in-stock'
            },
            {
                name: 'Cough Syrup (Dextromethorphan)',
                dosage: '5ml three times daily for 5 days',
                quantity: 1,
                unit: 'bottle (100ml)',
                instructions: 'Shake well before use',
                availability: 'in-stock'
            }
        ],
        notes: 'Patient has mild fever. Ensure adequate rest and hydration. Follow up if symptoms persist beyond 5 days.'
    },
    {
        id: 'ORD002',
        status: 'ready',
        priority: 'normal',
        date: '2025-09-22',
        time: '14:15',
        consultationId: 'CONS124',
        patient: {
            name: 'Priya Sharma',
            age: 35,
            gender: 'Female',
            patientId: '1018259369185940',
            mobile: '9876543210',
            address: 'MG Road, Vijayawada, Andhra Pradesh - 520010'
        },
        doctor: {
            name: 'Dr. Anita Gupta',
            qualification: 'MD, General Medicine',
            registration: 'MCI67890',
            diagnosis: 'Upper Respiratory Tract Infection'
        },
        medicines: [
            {
                name: 'Amoxicillin 250mg',
                dosage: '1 capsule three times daily for 7 days',
                quantity: 21,
                unit: 'capsules',
                instructions: 'Take with food to avoid stomach upset',
                availability: 'prepared'
            }
        ],
        billing: {
            subtotal: 315.00,
            gst: 37.80,
            total: 352.80,
            paymentStatus: 'pending'
        }
    }
];

// Initialize pharmacy system
document.addEventListener('DOMContentLoaded', function() {
    inventoryData = [...sampleInventory];
    ordersData = [...sampleOrders];
    
    // Initialize screens
    showScreen('pharmacy-login-screen');
    
    // Set current date for deletion form
    const deletionDatetime = document.getElementById('deletion-datetime');
    if (deletionDatetime) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        deletionDatetime.value = now.toISOString().slice(0, 16);
    }
    
    // Initialize character counter for deletion explanation
    const deletionExplanation = document.getElementById('deletion-explanation');
    if (deletionExplanation) {
        deletionExplanation.addEventListener('input', updateCharacterCount);
    }
    
    // Update login time display
    updateLoginTime();
});

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
}

function updateLoginTime() {
    const loginTimeElement = document.getElementById('login-time');
    if (loginTimeElement && currentPharmacyUser) {
        const now = new Date();
        const timeString = now.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        loginTimeElement.textContent = `Logged in: ${timeString}`;
    }
}

// Authentication functions
function pharmacyLogin() {
    const staffId = document.getElementById('pharmacy-staff-id').value;
    const password = document.getElementById('pharmacy-password').value;
    const location = document.getElementById('pharmacy-location').value;
    const role = document.getElementById('user-role').value;
    
    // Validate required fields
    if (!staffId || !password || !location || !role) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Simple validation for demo
    if (staffId.length >= 3 && password.length >= 6) {
        // Determine user name based on role
        let userName = 'Staff Member';
        
        if (role.includes('pharmacist') || role === 'medical-officer' || role === 'doctor') {
            userName = 'Dr. ' + (role.includes('phc') ? 'Rajesh Kumar' : 'Priya Sharma');
        } else if (role.includes('nurse') || role.includes('auxiliary')) {
            userName = 'Nurse ' + (Math.random() > 0.5 ? 'Anita Singh' : 'Meera Patel');
        } else if (role.includes('assistant') || role.includes('technician')) {
            userName = (Math.random() > 0.5 ? 'Amit Kumar' : 'Ravi Sharma');
        } else if (role.includes('supervisor')) {
            userName = 'Supervisor ' + (Math.random() > 0.5 ? 'Vikram Singh' : 'Sunita Rao');
        }
        
        // Set current user
        currentPharmacyUser = {
            staffId: staffId,
            name: userName,
            role: role,
            location: location,
            loginTime: new Date()
        };
        
        // Update UI with user info
        updatePharmacyHeader();
        showScreen('pharmacy-dashboard-screen');
        updateLoginTime();
        
        // Show facility-specific welcome message
        const facilityType = location.startsWith('phc-') ? 'PHC' : 'Pharmacy';
        setTimeout(() => {
            alert(`Welcome to the unified medication management system! You are logged in as ${facilityType} staff.`);
        }, 500);
    } else {
        alert('Invalid credentials. Please check your Staff ID and password.');
    }
}

function pharmacyLogout() {
    if (confirm('Are you sure you want to logout?')) {
        currentPharmacyUser = null;
        showScreen('pharmacy-login-screen');
        
        // Clear form fields
        document.getElementById('pharmacy-staff-id').value = '';
        document.getElementById('pharmacy-password').value = '';
        document.getElementById('pharmacy-location').value = '';
        document.getElementById('user-role').value = '';
    }
}

function updatePharmacyHeader() {
    if (!currentPharmacyUser) return;
    
    const pharmacyNameElement = document.getElementById('pharmacy-name');
    const staffInfoElement = document.getElementById('staff-info');
    const facilityTypeElement = document.getElementById('facility-type');
    
    if (pharmacyNameElement) {
        const locationNames = {
            // PHC Locations
            'phc-gandhinagar': 'PHC Gandhinagar',
            'phc-patamata': 'PHC Patamata', 
            'phc-governorpet': 'PHC Governorpet',
            'phc-eluru-road': 'PHC Eluru Road',
            'phc-kanuru': 'PHC Kanuru',
            
            // Private Pharmacies
            'apollo-pharmacy-vijayawada': 'Apollo Pharmacy - Vijayawada',
            'medplus-pharmacy-vijayawada': 'MedPlus Pharmacy - Vijayawada',
            'reliance-pharmacy': 'Reliance Smart Pharmacy',
            'guardian-pharmacy': 'Guardian Pharmacy',
            
            // Government Facilities
            'govt-hospital-pharmacy': 'Government General Hospital Pharmacy',
            'district-hospital-pharmacy': 'District Hospital Pharmacy',
            'chc-pharmacy': 'Community Health Center Pharmacy'
        };
        pharmacyNameElement.textContent = locationNames[currentPharmacyUser.location] || 'Unknown Location';
    }
    
    if (staffInfoElement) {
        const roleNames = {
            // Pharmacy Staff
            'licensed-pharmacist': 'Licensed Pharmacist',
            'pharmacy-assistant': 'Pharmacy Assistant',
            'pharmacy-technician': 'Pharmacy Technician',
            'pharmacy-supervisor': 'Pharmacy Supervisor',
            
            // PHC/Government Staff
            'medical-officer': 'Medical Officer',
            'phc-pharmacist': 'PHC Pharmacist',
            'staff-nurse': 'Staff Nurse',
            'auxiliary-nurse': 'Auxiliary Nurse Midwife (ANM)',
            'phc-assistant': 'PHC Assistant',
            
            // Healthcare Professionals
            'doctor': 'Doctor/Physician',
            'nurse': 'Registered Nurse',
            'lab-technician': 'Lab Technician'
        };
        
        const roleName = roleNames[currentPharmacyUser.role] || currentPharmacyUser.role;
        staffInfoElement.textContent = `Staff: ${currentPharmacyUser.name} | ID: ${currentPharmacyUser.staffId} | Role: ${roleName}`;
    }
    
    if (facilityTypeElement) {
        let facilityType = 'Healthcare Facility';
        
        if (currentPharmacyUser.location.startsWith('phc-')) {
            facilityType = 'Primary Health Center (PHC)';
        } else if (currentPharmacyUser.location.includes('apollo') || 
                   currentPharmacyUser.location.includes('medplus') || 
                   currentPharmacyUser.location.includes('reliance') || 
                   currentPharmacyUser.location.includes('guardian')) {
            facilityType = 'Private Pharmacy';
        } else if (currentPharmacyUser.location.includes('govt') || 
                   currentPharmacyUser.location.includes('district') || 
                   currentPharmacyUser.location.includes('chc')) {
            facilityType = 'Government Healthcare Facility';
        }
        
        facilityTypeElement.textContent = `Facility Type: ${facilityType}`;
    }
}

// Medicine management functions
function addMedicine() {
    const form = document.getElementById('add-medicine-form');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['medicine-name', 'medicine-category', 'manufacturer', 'batch-number', 'quantity', 'purchase-price', 'selling-price', 'mfg-date', 'expiry-date'];
    const missingFields = requiredFields.filter(field => !document.getElementById(field).value);
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields marked with *');
        return;
    }
    
    // Validate dates
    const mfgDate = new Date(document.getElementById('mfg-date').value);
    const expiryDate = new Date(document.getElementById('expiry-date').value);
    const today = new Date();
    
    if (mfgDate > today) {
        alert('Manufacturing date cannot be in the future');
        return;
    }
    
    if (expiryDate <= mfgDate) {
        alert('Expiry date must be after manufacturing date');
        return;
    }
    
    if (expiryDate <= today) {
        if (!confirm('This medicine is already expired. Do you still want to add it?')) {
            return;
        }
    }
    
    // Create new medicine object
    const newMedicine = {
        id: 'med' + Date.now(),
        name: document.getElementById('medicine-name').value,
        genericName: document.getElementById('generic-name').value,
        category: document.getElementById('medicine-category').value,
        strength: document.getElementById('medicine-strength').value,
        manufacturer: document.getElementById('manufacturer').value,
        batchNumber: document.getElementById('batch-number').value,
        quantity: parseInt(document.getElementById('quantity').value),
        unitType: document.getElementById('unit-type').value,
        purchasePrice: parseFloat(document.getElementById('purchase-price').value),
        sellingPrice: parseFloat(document.getElementById('selling-price').value),
        mfgDate: document.getElementById('mfg-date').value,
        expiryDate: document.getElementById('expiry-date').value,
        storageConditions: document.getElementById('storage-conditions').value,
        prescriptionRequired: document.querySelector('input[name="prescription-required"]:checked').value === 'yes',
        drugSchedule: document.getElementById('drug-schedule').value,
        minStock: parseInt(document.getElementById('min-stock').value) || 0,
        notes: document.getElementById('medicine-notes').value,
        addedBy: currentPharmacyUser.staffId,
        addedDate: new Date().toISOString(),
        status: 'in-stock'
    };
    
    // Add to inventory
    inventoryData.push(newMedicine);
    
    // Show success message
    alert(`Medicine "${newMedicine.name}" has been successfully added to inventory!`);
    
    // Clear form
    clearForm();
    
    // Navigate back to dashboard
    showScreen('pharmacy-dashboard-screen');
}

function clearForm() {
    const form = document.getElementById('add-medicine-form');
    if (form) {
        form.reset();
    }
}

// Inventory management
function filterInventory() {
    const searchTerm = document.getElementById('inventory-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const stockFilter = document.getElementById('stock-filter').value;
    
    let filteredData = inventoryData.filter(medicine => {
        const matchesSearch = medicine.name.toLowerCase().includes(searchTerm) ||
                            medicine.genericName.toLowerCase().includes(searchTerm) ||
                            medicine.batchNumber.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categoryFilter || medicine.category === categoryFilter;
        
        let matchesStock = true;
        if (stockFilter === 'low') {
            matchesStock = medicine.quantity <= medicine.minStock;
        } else if (stockFilter === 'expired') {
            matchesStock = new Date(medicine.expiryDate) < new Date();
        } else if (stockFilter === 'expiring') {
            const sixMonthsFromNow = new Date();
            sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
            matchesStock = new Date(medicine.expiryDate) <= sixMonthsFromNow && new Date(medicine.expiryDate) > new Date();
        } else if (stockFilter === 'in-stock') {
            matchesStock = medicine.quantity > medicine.minStock;
        }
        
        return matchesSearch && matchesCategory && matchesStock;
    });
    
    renderInventoryList(filteredData);
}

function renderInventoryList(medicines) {
    const inventoryList = document.getElementById('inventory-list');
    if (!inventoryList) return;
    
    if (medicines.length === 0) {
        inventoryList.innerHTML = '<div class="no-results">No medicines found matching your criteria.</div>';
        return;
    }
    
    inventoryList.innerHTML = medicines.map(medicine => {
        const stockStatus = getStockStatus(medicine);
        const totalValue = (medicine.quantity * medicine.sellingPrice).toFixed(2);
        
        return `
            <div class="inventory-item" data-category="${medicine.category}" data-status="${stockStatus.class}">
                <div class="medicine-details">
                    <h4>${medicine.name} ${medicine.strength || ''}</h4>
                    <p class="generic-name">Generic: ${medicine.genericName || 'N/A'}</p>
                    <p class="manufacturer">Manufacturer: ${medicine.manufacturer}</p>
                    <p class="batch-info">Batch: ${medicine.batchNumber} | Mfg: ${formatDate(medicine.mfgDate)} | Exp: ${formatDate(medicine.expiryDate)}</p>
                    <div class="stock-info">
                        <span class="stock-status ${stockStatus.class}">Stock: ${medicine.quantity} ${medicine.unitType}s ${stockStatus.text}</span>
                        <span class="price-info">₹${medicine.sellingPrice.toFixed(2)}/${medicine.unitType} | Total: ₹${totalValue}</span>
                    </div>
                    <div class="storage-info">Storage: ${getStorageText(medicine.storageConditions)}</div>
                </div>
                <div class="inventory-actions">
                    <button class="btn-small" onclick="editMedicine('${medicine.id}')">Edit</button>
                    <button class="btn-small" onclick="viewMedicine('${medicine.id}')">View</button>
                    <button class="btn-small-danger" onclick="deleteMedicine('${medicine.id}')">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function getStockStatus(medicine) {
    const today = new Date();
    const expiryDate = new Date(medicine.expiryDate);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    
    if (expiryDate < today) {
        return { class: 'warning', text: '(Expired)' };
    } else if (expiryDate <= sixMonthsFromNow) {
        return { class: 'warning', text: '(Expiring Soon)' };
    } else if (medicine.quantity <= medicine.minStock) {
        return { class: 'low', text: '(Low Stock)' };
    } else {
        return { class: 'good', text: '' };
    }
}

function getStorageText(condition) {
    const conditions = {
        'room-temp': 'Room Temperature (15-25°C)',
        'cool-dry': 'Cool & Dry Place',
        'refrigerated': 'Refrigerated (2-8°C)',
        'frozen': 'Frozen (Below 0°C)',
        'protect-light': 'Protect from Light'
    };
    return conditions[condition] || 'Not specified';
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
}

function editMedicine(medicineId) {
    alert('Edit medicine functionality will be implemented');
}

function viewMedicine(medicineId) {
    alert('View medicine details functionality will be implemented');
}

function deleteMedicine(medicineId) {
    const medicine = inventoryData.find(m => m.id === medicineId);
    if (!medicine) return;
    
    selectedMedicineForDeletion = medicine;
    updateDeleteMedicineInfo();
    showScreen('delete-reason-screen');
}

function exportInventory() {
    alert('Export inventory functionality will be implemented');
}

// Delete medicine functions
function searchMedicinesForDeletion() {
    const searchTerm = document.getElementById('search-medicine-delete').value.toLowerCase();
    const filteredMedicines = inventoryData.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm) ||
        medicine.genericName.toLowerCase().includes(searchTerm) ||
        medicine.batchNumber.toLowerCase().includes(searchTerm)
    );
    
    renderDeleteMedicineList(filteredMedicines);
}

function renderDeleteMedicineList(medicines) {
    const medicineList = document.getElementById('medicine-delete-list');
    if (!medicineList) return;
    
    medicineList.innerHTML = medicines.map(medicine => `
        <div class="medicine-item selectable" onclick="selectMedicineForDeletion(this, '${medicine.id}')">
            <div class="medicine-info">
                <h4>${medicine.name} ${medicine.strength || ''}</h4>
                <p>Batch: ${medicine.batchNumber} | Qty: ${medicine.quantity} ${medicine.unitType}s | Exp: ${formatDate(medicine.expiryDate)}</p>
                <p>Manufacturer: ${medicine.manufacturer} | Price: ₹${medicine.sellingPrice.toFixed(2)}/${medicine.unitType}</p>
            </div>
            <div class="selection-indicator">Select</div>
        </div>
    `).join('');
}

function selectMedicineForDeletion(element, medicineId) {
    // Remove selection from other items
    document.querySelectorAll('.medicine-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Select current item
    element.classList.add('selected');
    
    // Find and store selected medicine
    selectedMedicineForDeletion = inventoryData.find(m => m.id === medicineId);
    
    // Show reason form after a short delay
    setTimeout(() => {
        updateDeleteMedicineInfo();
        showScreen('delete-reason-screen');
    }, 300);
}

function updateDeleteMedicineInfo() {
    if (!selectedMedicineForDeletion) return;
    
    const medicine = selectedMedicineForDeletion;
    const totalValue = (medicine.quantity * medicine.sellingPrice).toFixed(2);
    
    document.getElementById('delete-medicine-name').textContent = medicine.name + (medicine.strength ? ` ${medicine.strength}` : '');
    document.getElementById('delete-batch-number').textContent = medicine.batchNumber;
    document.getElementById('delete-quantity').textContent = `${medicine.quantity} ${medicine.unitType}s`;
    document.getElementById('delete-total-value').textContent = `₹${totalValue}`;
}

function toggleOtherReason() {
    const reasonSelect = document.getElementById('deletion-reason');
    const otherReasonGroup = document.getElementById('other-reason-group');
    
    if (reasonSelect.value === 'other') {
        otherReasonGroup.style.display = 'block';
        document.getElementById('other-reason').required = true;
    } else {
        otherReasonGroup.style.display = 'none';
        document.getElementById('other-reason').required = false;
    }
}

function updateCharacterCount() {
    const textarea = document.getElementById('deletion-explanation');
    const charCount = document.querySelector('.char-count');
    
    if (textarea && charCount) {
        const currentLength = textarea.value.length;
        charCount.textContent = `${currentLength}/500 characters`;
        
        if (currentLength > 500) {
            charCount.style.color = 'red';
            textarea.value = textarea.value.substring(0, 500);
        } else {
            charCount.style.color = '#666';
        }
    }
}

function confirmMedicineDeletion() {
    if (!selectedMedicineForDeletion) {
        alert('No medicine selected for deletion');
        return;
    }
    
    const form = document.getElementById('deletion-form');
    const requiredFields = ['deletion-reason', 'deletion-explanation', 'authorized-by'];
    const missingFields = requiredFields.filter(field => !document.getElementById(field).value);
    
    if (document.getElementById('deletion-reason').value === 'other' && !document.getElementById('other-reason').value) {
        missingFields.push('other-reason');
    }
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check confirmations
    const confirmations = ['confirm-authority', 'confirm-documentation', 'confirm-irreversible'];
    const unchecked = confirmations.filter(id => !document.getElementById(id).checked);
    
    if (unchecked.length > 0) {
        alert('Please confirm all acknowledgments before proceeding');
        return;
    }
    
    // Final confirmation
    if (!confirm(`Are you absolutely sure you want to delete "${selectedMedicineForDeletion.name}" from inventory? This action cannot be undone.`)) {
        return;
    }
    
    // Create deletion record for audit
    const deletionRecord = {
        medicineId: selectedMedicineForDeletion.id,
        medicineName: selectedMedicineForDeletion.name,
        batchNumber: selectedMedicineForDeletion.batchNumber,
        quantity: selectedMedicineForDeletion.quantity,
        totalValue: (selectedMedicineForDeletion.quantity * selectedMedicineForDeletion.sellingPrice).toFixed(2),
        reason: document.getElementById('deletion-reason').value,
        otherReason: document.getElementById('other-reason').value,
        explanation: document.getElementById('deletion-explanation').value,
        disposalMethod: document.getElementById('disposal-method').value,
        requestedBy: currentPharmacyUser.staffId,
        authorizedBy: document.getElementById('authorized-by').value,
        witness: document.getElementById('witness').value,
        referenceDoc: document.getElementById('reference-doc').value,
        deletionDate: new Date().toISOString(),
        ipAddress: 'System IP', // In real implementation, get actual IP
        userAgent: navigator.userAgent
    };
    
    // Remove from inventory
    inventoryData = inventoryData.filter(m => m.id !== selectedMedicineForDeletion.id);
    
    // Store deletion record (in real app, send to server)
    console.log('Deletion Record:', deletionRecord);
    
    // Reset selection
    selectedMedicineForDeletion = null;
    
    // Show success message
    alert('Medicine has been successfully deleted from inventory. Deletion record has been logged for audit purposes.');
    
    // Navigate back to inventory
    showScreen('medicine-inventory-screen');
    
    // Refresh inventory display
    filterInventory();
}

// Orders management
function filterOrders() {
    const statusFilter = document.getElementById('order-status-filter').value;
    const priorityFilter = document.getElementById('priority-filter').value;
    const dateFilter = document.getElementById('order-date-filter').value;
    
    let filteredOrders = ordersData.filter(order => {
        const matchesStatus = !statusFilter || order.status === statusFilter;
        const matchesPriority = !priorityFilter || order.priority === priorityFilter;
        const matchesDate = !dateFilter || order.date === dateFilter;
        
        return matchesStatus && matchesPriority && matchesDate;
    });
    
    renderOrdersList(filteredOrders);
    updateOrdersSummary(filteredOrders);
}

function renderOrdersList(orders) {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<div class="no-results">No orders found matching your criteria.</div>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => generateOrderHTML(order)).join('');
}

function generateOrderHTML(order) {
    const statusClass = order.status.replace('-', '');
    const priorityClass = order.priority;
    
    return `
        <div class="order-item" data-status="${order.status}" data-priority="${order.priority}">
            <div class="order-header">
                <div class="order-info">
                    <h4>Order #${order.id}</h4>
                    <span class="order-status ${statusClass}">${getStatusText(order.status)}</span>
                    <span class="priority-badge ${priorityClass}">${order.priority}</span>
                </div>
                <div class="order-meta">
                    <div class="order-date">${formatDate(order.date)} - ${order.time}</div>
                    <div class="consultation-id">Consultation ID: ${order.consultationId}</div>
                    ${order.status === 'completed' ? `<div class="completion-time">Completed: ${formatDate(order.completedDate)} - ${order.completedTime}</div>` : ''}
                </div>
            </div>
            
            <div class="patient-section">
                <h5>Patient Information</h5>
                <div class="patient-details">
                    <div class="patient-basic">
                        <p><strong>Name:</strong> ${order.patient.name}</p>
                        <p><strong>Age:</strong> ${order.patient.age} Years | <strong>Gender:</strong> ${order.patient.gender}</p>
                        <p><strong>Patient ID:</strong> ${order.patient.patientId}</p>
                    </div>
                    <div class="patient-contact">
                        <p><strong>Mobile:</strong> ${order.patient.mobile}</p>
                        <p><strong>Address:</strong> ${order.patient.address}</p>
                    </div>
                </div>
            </div>
            
            <div class="prescription-section">
                <h5>Prescription by ${order.doctor.name} (${order.doctor.qualification})</h5>
                <div class="doctor-info">
                    <p><strong>Registration:</strong> ${order.doctor.registration} | <strong>Date:</strong> ${formatDate(order.date)}</p>
                    <p><strong>Diagnosis:</strong> ${order.doctor.diagnosis}</p>
                </div>
                
                <div class="prescribed-medicines">
                    ${order.medicines.map(medicine => `
                        <div class="prescribed-item">
                            <div class="medicine-name">
                                <strong>${medicine.name}</strong>
                                <span class="availability ${medicine.availability}">${getAvailabilityText(medicine.availability)}</span>
                            </div>
                            <p class="dosage">Dosage: ${medicine.dosage}</p>
                            <p class="quantity">Quantity Required: ${medicine.quantity} ${medicine.unit}</p>
                            <p class="instructions">Special Instructions: ${medicine.instructions}</p>
                        </div>
                    `).join('')}
                </div>
                
                ${order.notes ? `
                    <div class="prescription-notes">
                        <p><strong>Additional Notes:</strong> ${order.notes}</p>
                    </div>
                ` : ''}
            </div>
            
            ${order.billing ? `
                <div class="order-billing">
                    <div class="billing-details">
                        <p><strong>Subtotal:</strong> ₹${order.billing.subtotal.toFixed(2)}</p>
                        <p><strong>GST (12%):</strong> ₹${order.billing.gst.toFixed(2)}</p>
                        <p><strong>Total Amount:</strong> ₹${order.billing.total.toFixed(2)}</p>
                    </div>
                    <div class="payment-status">
                        <span class="payment-${order.billing.paymentStatus}">${getPaymentStatusText(order.billing.paymentStatus)}</span>
                    </div>
                </div>
            ` : ''}
            
            ${order.status === 'completed' && order.summary ? `
                <div class="order-summary">
                    <p><strong>Items Dispensed:</strong> ${order.summary.items}</p>
                    <p><strong>Total Amount Paid:</strong> ₹${order.summary.totalPaid}</p>
                    <p><strong>Payment Method:</strong> ${order.summary.paymentMethod}</p>
                </div>
            ` : ''}
            
            <div class="order-actions">
                ${generateOrderActionButtons(order)}
            </div>
        </div>
    `;
}

function generateOrderActionButtons(order) {
    switch (order.status) {
        case 'pending':
            return `
                <button class="btn-primary" onclick="processOrder('${order.id}')">Start Processing</button>
                <button class="btn-secondary" onclick="viewFullPrescription('${order.id}')">View Full Prescription</button>
                <button class="btn-secondary" onclick="contactPatient('${order.id}')">Contact Patient</button>
            `;
        case 'ready':
            return `
                <button class="btn-success" onclick="completeOrder('${order.id}')">Mark as Delivered</button>
                <button class="btn-secondary" onclick="printBill('${order.id}')">Print Bill</button>
                <button class="btn-secondary" onclick="sendSMS('${order.id}')">Send SMS</button>
            `;
        case 'completed':
            return `
                <button class="btn-secondary" onclick="viewOrderDetails('${order.id}')">View Details</button>
                <button class="btn-secondary" onclick="reprintBill('${order.id}')">Reprint Bill</button>
            `;
        default:
            return '';
    }
}

function getStatusText(status) {
    const statusTexts = {
        'pending': 'Pending Review',
        'in-progress': 'In Progress',
        'ready': 'Ready for Pickup',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
    };
    return statusTexts[status] || status;
}

function getAvailabilityText(availability) {
    const availabilityTexts = {
        'in-stock': '✓ In Stock',
        'prepared': '✓ Prepared',
        'out-of-stock': '✗ Out of Stock',
        'partial': '⚠ Partial Stock'
    };
    return availabilityTexts[availability] || availability;
}

function getPaymentStatusText(status) {
    const statusTexts = {
        'pending': 'Payment Pending',
        'paid': 'Payment Completed',
        'partial': 'Partial Payment'
    };
    return statusTexts[status] || status;
}

function updateOrdersSummary(orders) {
    document.getElementById('total-orders').textContent = orders.length;
    document.getElementById('pending-orders').textContent = orders.filter(o => o.status === 'pending').length;
    document.getElementById('ready-orders').textContent = orders.filter(o => o.status === 'ready').length;
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('completed-today').textContent = orders.filter(o => o.status === 'completed' && o.date === today).length;
}

function refreshOrders() {
    filterOrders();
    alert('Orders refreshed');
}

function processOrder(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (order) {
        order.status = 'in-progress';
        alert(`Processing started for Order #${orderId}`);
        filterOrders();
    }
}

function completeOrder(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (order && confirm(`Mark Order #${orderId} as delivered?`)) {
        order.status = 'completed';
        order.completedDate = new Date().toISOString().split('T')[0];
        order.completedTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        alert(`Order #${orderId} marked as delivered`);
        filterOrders();
    }
}

function viewFullPrescription(orderId) {
    alert(`View full prescription for Order #${orderId}`);
}

function contactPatient(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (order) {
        alert(`Contact patient: ${order.patient.name} at ${order.patient.mobile}`);
    }
}

function printBill(orderId) {
    alert(`Print bill for Order #${orderId}`);
}

function sendSMS(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (order) {
        alert(`SMS sent to ${order.patient.mobile} for Order #${orderId}`);
    }
}

function viewOrderDetails(orderId) {
    alert(`View details for Order #${orderId}`);
}

function reprintBill(orderId) {
    alert(`Reprint bill for Order #${orderId}`);
}

// Reports functions
function generateInventoryReport() {
    alert('Generating inventory report...');
}

function generateSalesReport() {
    alert('Generating sales report...');
}

function generateExpiryReport() {
    alert('Generating expiry report...');
}

function generateDeletedItemsReport() {
    alert('Generating deleted items report...');
}

// Settings functions
function manageUsers() {
    alert('User management functionality will be implemented');
}

function systemPreferences() {
    alert('System preferences functionality will be implemented');
}

function backupData() {
    alert('Backup & restore functionality will be implemented');
}

function auditLogs() {
    alert('Audit logs functionality will be implemented');
}

// Initialize inventory and orders display when screens are shown
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for screen changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active')) {
                    if (target.id === 'medicine-inventory-screen') {
                        renderInventoryList(inventoryData);
                    } else if (target.id === 'pharmacy-orders-screen') {
                        renderOrdersList(ordersData);
                        updateOrdersSummary(ordersData);
                    } else if (target.id === 'delete-medicine-screen') {
                        renderDeleteMedicineList(inventoryData);
                    }
                }
            }
        });
    });
    
    // Observe all screens for class changes
    document.querySelectorAll('.screen').forEach(screen => {
        observer.observe(screen, { attributes: true });
    });
});

// Performance optimization for low-end devices
function optimizeForLowEndDevices() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        document.body.classList.add('low-performance');
        
        // Reduce animations
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

// Initialize optimizations and demo functionality
optimizeForLowEndDevices();

// Initialize demo functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDemo();
});