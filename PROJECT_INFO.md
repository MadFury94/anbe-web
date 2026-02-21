# ANBE Nigeria Limited - Website

A modern, professional Next.js website for ANBE Nigeria Limited, an engineering solutions provider for the oil and gas sector.

## 🎨 Design Features

- **Professional Corporate Design**: Blue/orange color scheme tailored for the oil & gas industry
- **Responsive Layout**: Fully responsive across all devices
- **Smooth Animations**: Framer Motion animations for engaging user experience
- **Consistent Branding**: 1200px max-width containers matching Forward Falls design system
- **Modern UI**: Clean, professional interface with Tailwind CSS

## 📄 Pages

1. **Homepage** (`/`)
   - Hero section with key stats
   - About section
   - Services overview
   - Featured projects showcase
   - Call-to-action section

2. **About Page** (`/about`)
   - Company overview
   - Vision & Mission
   - Core values
   - Why choose ANBE
   - Company statistics

3. **Services Page** (`/services`)
   - Engineering Design
   - Project Management
   - Installation & Commissioning
   - Maintenance & Support
   - Consulting Services
   - Training & Development

4. **Projects Page** (`/projects`)
   - Featured projects grid
   - Project categories
   - Company statistics
   - Project status indicators

5. **Contact Page** (`/contact`)
   - Contact form with EmailJS integration
   - Contact details
   - Business hours
   - Service selection dropdown

## 🎨 Color Scheme

```css
--primary-blue: #003d7a      /* Main brand color */
--primary-orange: #ff6b35    /* Accent color */
--secondary-teal: #00a8a8    /* Supporting color */
--dark-navy: #001f3f         /* Dark backgrounds */
--light-grey: #f5f7fa        /* Light backgrounds */
--accent-gold: #d4af37       /* Premium accent */
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📧 EmailJS Setup

To enable the contact form:

1. Create an account at [emailjs.com](https://www.emailjs.com/)
2. Set up an email service
3. Create an email template with these fields:
   - `user_name`
   - `user_email`
   - `user_phone`
   - `service`
   - `message`
4. Update credentials in `app/contact/page.tsx`:
   ```typescript
   const result = await emailjs.sendForm(
       'YOUR_SERVICE_ID',
       'YOUR_TEMPLATE_ID',
       formRef.current!,
       'YOUR_PUBLIC_KEY'
   );
   ```

## 📸 Images

Add professional images to the `/public` folder:
- Company photos
- Project images
- Team photos
- Facility images
- Equipment photos

Current placeholder images from Forward Falls project are being used. Replace with actual ANBE images.

## 🔧 Customization

### Update Contact Information

Edit `components/Header.tsx`:
```typescript
<Mail size={14} className="text-primary-orange" />
<span>info@anbenigeria.com</span>

<Phone size={14} className="text-primary-orange" />
<span>+234 XXX XXX XXXX</span>
```

### Update Company Details

Edit content in:
- `app/about/page.tsx` - Company history and values
- `app/services/page.tsx` - Service descriptions
- `app/projects/page.tsx` - Project details

## 📦 Dependencies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- EmailJS Browser
- Sharp (image optimization)

## 🌐 Deployment

Deploy to Vercel:
```bash
vercel
```

Or build and deploy to any hosting platform:
```bash
npm run build
# Upload .next folder and run: npm start
```

## 📝 Notes

- Design inspired by Forward Falls Initiative website
- Adapted for corporate/industrial aesthetic
- Professional color scheme for oil & gas industry
- All components use consistent 1200px max-width
- Mobile-first responsive design
- SEO-friendly structure

## 🔗 Links

- Website: anbenigeria.com
- Email: info@anbenigeria.com
- Location: Lagos, Nigeria

---

Built with ❤️ using Next.js and Tailwind CSS
