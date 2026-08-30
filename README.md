# Dainik-Panchang 📅

![Version](https://img.shields.io/badge/version-1.1.1-orange.svg)

A comprehensive and user-friendly Panchang (Hindu lunar calendar) generator application built with modern web technologies. Generate, customize, and share daily panchang details with ease.

## Overview

Dainik-Panchang is a feature-rich web application designed to help users create detailed panchang (Hindu calendar) information for any date. Whether you're a Hindu priest, astrologer, or someone interested in Hindu traditions, this tool makes it easy to generate, customize, and share panchang details.

## Features

### Core Features
- **Panchang Information Input**: Manually enter all panchang details including:
  - Tithi (lunar day)
  - Tarikh (date formatting with Gujarati numerals)
  - Nakshatra (lunar mansion)
  - Yog (auspicious period)
  - Karan (half lunar day)
  - Sunrise and Sunset times
  - Aaj Ni Rashi (today's zodiac sign)
  - Din Mahima (day significance & festivals)

- **Date Management & Header Editing**: 
  - Interactive date picker with circular date selection
  - Automatic date formatting in Gujarati numerals (`૨૦૮૧`)
  - Customizable Vikram Samvat headers
  - 30-minute data persistence with localStorage

- **Image & PDF Generation**:
  - Generate beautifully formatted panchang card images
  - High-quality PDF document export
  - Multiple theme options with full Dark Mode support
  - Overlay selection (deity images, borders)

### Export & Sharing
- **Image Download**: Download generated panchang as PNG image
- **PDF Export**: Generate high-quality PDF documents
- **QR Code Generation**: Create QR codes containing full panchang details
- **Text Copying**: Copy formatted panchang text to clipboard
- **WhatsApp & Social Sharing**: Direct sharing via WhatsApp Web & Facebook
- **Top-Center Toast Notifications**: Clean non-intrusive action feedback

### Data Management
- **Image Upload & OCR**: Upload existing panchang images and automatically extract data using Tesseract.js
- **Data Persistence**: Form data is automatically saved to localStorage for 30 minutes
- **Auto-expiry**: Stored data automatically clears after 30 minutes of inactivity

### Multilingual & Dark Mode Support
- **Multilingual UI**: Gujarati (ગુજરાતી), Hindi (हिंदी), and English
- **Theme Support**: Seamless Light & Dark mode support across form inputs, dropdowns, and calendar pickers

### Responsive Design
- Mobile-friendly interface
- Tablet optimized layout
- Desktop full-featured experience
- Smooth responsive transitions

### Additional Features
- **Theme Customization**: Choose from multiple visual themes
- **Bold Field Selection**: Make specific fields bold in generated images
- **Dynamic Year Detection**: Festivals and muhurat timings automatically update based on current year
- **Seasonal Accuracy**: Sunrise/sunset times adjust based on season

## Technology Stack

- **Framework**: Next.js 14.2.35 (App Router)
- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS + shadcn/ui components
- **Package Manager**: pnpm 11.14.0 / npm
- **OCR**: Tesseract.js (for image text extraction)
- **QR Code**: qrcode library
- **PDF Generation**: jsPDF
- **UI Components**: Radix UI
- **State Management**: React Hooks + localStorage
- **Internationalization**: Custom language context

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm or npm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RitualPlanner/dainik-panchang.git
cd dainik-panchang
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage Guide

### Creating a Panchang

1. **Enter Panchang Details**:
   - Click on each field and enter the relevant information
   - Use the calendar picker for date selection
   - Add multiple "Din Mahima" entries as needed

2. **Customize Appearance**:
   - Select a theme from the theme selector
   - Add deity images or borders using the overlay selector
   - Mark specific fields as bold using the "Make Bold" dropdown

3. **Generate & Export**:
   - Click "Generate Image" to create a PNG
   - Click "Generate PDF" to create a PDF document
   - Click "Copy Text" to copy formatted text
   - Click "Generate QR" to create a scannable QR code

4. **Share Your Panchang**:
   - Use "Share on WhatsApp" to send via WhatsApp
   - Use "Share" button to access other sharing options

### Extracting Data from Images

1. Click "Load from Image"
2. Select a panchang image file
3. Wait for OCR processing to complete
4. Form fields will auto-populate with extracted data
5. Edit any fields as needed

### Data Persistence

- All form fields are automatically saved to localStorage
- Data persists for 30 minutes of inactivity
- Each field has its own 30-minute timer
- Updating a field resets its timer to 30 minutes

## Project Structure

```
├── app/
│   ├── components/          # Reusable React components
│   ├── contexts/           # React context providers
│   ├── data/               # Static data (festivals, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   ├── page.tsx            # Main application page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── package.json            # Project dependencies
└── README.md              # This file
```

## Key Components

- **DynamicFields**: Component for managing variable number of din mahima entries
- **QRCodeGenerator**: Generates QR codes from panchang data
- **ShareOptions**: Provides various sharing methods
- **ThemeSelector**: Allows users to select visual themes
- **MuhuratTimings**: Displays auspicious timings
- **LanguageSwitcher**: Toggles between supported languages

## Customization

### Adding New Languages

Edit the language context file to add new languages to the application.

### Modifying Themes

Update the theme selector component to add custom color schemes and visual themes.

### Extending Panchang Details

Add new fields to the form by modifying the FormData type and adding corresponding state variables.

## Performance Optimizations

- Responsive image generation prevents layout shifts
- Efficient localStorage usage with expiry timers
- Optimized OCR processing with Tesseract.js
- Lazy-loaded components for faster initial load

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast mode compatible
- Screen reader friendly

## Troubleshooting

### OCR Not Working
- Ensure image quality is clear
- Try with a different image
- Check browser console for errors

### PDF Not Generating
- Verify jsPDF library is loaded
- Try refreshing the page
- Check browser permissions

### QR Code Not Displaying
- Ensure form has valid data
- Try generating again
- Clear browser cache

## Future Enhancements

- Integration with professional panchang calculation APIs
- Advanced astrological features
- Batch processing for multiple dates
- Calendar sync capabilities
- Mobile app versions
- Print-ready templates

## License

This project is provided as-is for educational and personal use.

## Support

For issues, suggestions, or contributions, please open an issue in the project repository.

## Version History

### v1.0.0 (Current)
- Initial release
- Core panchang generation features
- Multilingual support
- QR code generation
- Image upload and OCR
- PDF export
- Responsive design
- Data persistence

---

Made with ❤️ for the Hindu community and astrology enthusiasts
