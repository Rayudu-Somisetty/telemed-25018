# TeleMed - Telemedicine App

A minimalistic telemedicine application designed for low-end devices with multi-language support (English, Hindi, Punjabi).

## Features

### 🌐 Multi-Language Support
- English, Hindi, and Punjabi language options
- Easy language selection on app startup

### 🔐 Authentication & Registration
- Login with Aadhar/ABHA number and password
- Document upload for verification (Aadhar card)
- OTP-based mobile verification
- Pre-filled user details from uploaded documents
- Comprehensive address form with cascading dropdowns

### 📱 User Dashboard
- Clean, intuitive interface
- Quick access to "Consult Doctor"
- Previous consultations history
- Bottom navigation (Dashboard, Consultations, More)

### 🏥 Consultation Flow
- Personal information display
- Comprehensive symptom checker form based on medical standards
- Follow-up consultation tracking
- Chief complaints, history, medications, and health records
- Query submission with character limits

### 💬 Video Consultation
- Simulated video call interface
- Audio/video toggle controls
- Real-time chat functionality
- Doctor profile display
- Call recording and prescription management

### 📋 Additional Features
- Past consultations with detailed records
- Settings and account management
- Password reset functionality
- Family member management
- Secure logout

## Technical Specifications

### 🎯 Optimized for Low-End Devices
- Minimal CSS and JavaScript
- Optimized images and assets
- Efficient DOM manipulation
- Performance monitoring for slow connections
- Progressive Web App capabilities

### 📱 Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Adaptive layouts for different screen sizes
- Accessible design principles

### 🔧 Technology Stack
- Pure HTML5, CSS3, and JavaScript
- No external dependencies for faster loading
- Service Worker ready for offline capabilities
- Cross-browser compatibility

## File Structure

```
telemed-25018/
├── index.html          # Main application file with all screens
├── styles.css          # Minimalistic styling optimized for performance
├── script.js           # Core JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. Open `index.html` in any modern web browser
2. Select your preferred language (English/Hindi/Punjabi)
3. Use the demo credentials or register a new account
4. Explore the complete consultation flow

## Demo Flow

### Registration Process
1. **Language Selection** → Choose from English, Hindi, or Punjabi
2. **Login/Register** → Use Aadhar/ABHA number or create new account
3. **Document Upload** → Upload Aadhar card for verification
4. **OTP Verification** → Verify mobile number (Demo OTP: 123456)
5. **Personal Details** → Review pre-filled information
6. **Address Details** → Complete address with cascading dropdowns
7. **Registration Complete** → Account created successfully

### Consultation Process
1. **Dashboard** → Access "Consult Doctor" button
2. **Symptom Checker** → Fill comprehensive medical form
3. **Consultation Options** → Choose "Consult Now" or "Book Appointment"
4. **Video Call** → Simulated consultation with doctor
5. **Chat** → Real-time messaging during consultation
6. **End Call** → Save consultation record

## Design Principles

### Minimalistic UI
- Clean, uncluttered interface
- Essential features only
- Fast loading times
- Intuitive navigation

### Accessibility
- High contrast colors
- Large touch targets
- Screen reader friendly
- Keyboard navigation support

### Performance
- Optimized for 2G/3G networks
- Minimal resource usage
- Efficient caching strategies
- Progressive loading

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 16+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Backend API integration
- [ ] Real video calling functionality
- [ ] Push notifications
- [ ] Offline mode capabilities
- [ ] Advanced symptom checking algorithms
- [ ] Integration with health records systems
- [ ] Payment gateway integration
- [ ] Doctor availability scheduling

## Contributing

This is a frontend prototype designed for demonstration purposes. For production use, implement proper backend services, security measures, and medical compliance standards.

## License

This project is created for educational and demonstration purposes.

---

**Note**: This is a frontend prototype. All consultation features are simulated and should not be used for actual medical consultations without proper backend integration and medical professional oversight.