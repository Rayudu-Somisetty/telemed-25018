# TeleMed - Quick Start Guide

## Running the Application

### Option 1: Using Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on either file and select "Open with Live Server"
   - `index.html` - Patient/User Interface
   - `doctor-dashboard.html` - Doctor Dashboard

### Option 2: Using Python HTTP Server
```bash
# Navigate to project directory
cd path/to/telemed-25018

# Start server
python -m http.server 8080

# Then open in browser:
# Patient Interface: http://localhost:8080/index.html
# Doctor Dashboard: http://localhost:8080/doctor-dashboard.html
```

### Option 3: Using Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Navigate to project directory and start
cd path/to/telemed-25018
http-server

# Then open in browser:
# Patient Interface: http://localhost:8080/index.html
# Doctor Dashboard: http://localhost:8080/doctor-dashboard.html
```

## Demo Credentials

### Doctor Login (if needed)
- License Number: `DOC123456`
- Password: `doctor123`

### Patient Login (if needed)
- Aadhar Number: `123456789012`
- Password: `patient123`

## Features

### Patient Interface (index.html)
- Multi-language support (English, Hindi, Punjabi)
- User registration with document upload
- OTP verification
- Symptom checker and consultation booking
- Video consultation simulation
- Consultation history

### Doctor Dashboard (doctor-dashboard.html)
- Availability toggle
- Appointments management
- Active consultations
- Patient information
- Notifications and alerts
- Analytics and reports
- Emergency consultation handling

## Files Structure
```
telemed-25018/
├── index.html              # Patient/User Interface
├── doctor-dashboard.html   # Doctor Dashboard
├── styles.css             # Patient Interface Styles
├── doctor-styles.css      # Doctor Dashboard Styles
├── script.js              # Patient Interface Logic
├── doctor-script.js       # Doctor Dashboard Logic
├── favicon.svg            # App Icon
├── sw.js                  # Service Worker for PWA
└── README-QUICKSTART.md   # This file
```

## Notes
- Both interfaces work independently
- No backend required - all data is simulated
- Optimized for low-end devices
- Progressive Web App capabilities included
- Cross-browser compatible
