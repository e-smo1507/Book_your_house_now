
# Airbnb Listing Page Clone & Production Scale Architecture
Demo Link : https://vercel.com/esmoli-guptas-projects/airbnbclone/2EUmeBcqfXtGYgSq8VBBQKQpu1BF
A pixel-perfect, production-grade clone of the Airbnb listing page (**Romantic Jacuzzi 1BHK Candolim | Mirashya UG10**), engineered according to Playpower's technical assessment requirements.

---

## 🌟 Key Features & Views

### 1. Listing Page (Desktop View)
- **Header**: Airbnb logo, compact search capsule (*Anywhere · Any week · Add guests*), language selector, and user profile trigger.
- **Property Header**: Rating (4.92), 48 reviews, Superhost badge, location (*Candolim, Goa, India*), share button with clipboard feedback, and animated wishlist heart button.
- **5-Photo Hero Grid**: Airbnb desktop grid layout (1 large hero + 4 sub-photos) with hover dimming and floating *"Show all photos"* button.
- **Property Overview**: Host details, guest favorite laurel badge, highlights (High-speed Wi-Fi, Self check-in keypad, Superhost, Free cancellation), AirCover guarantee banner, and expandable space description.
- **Amenities Section**: Grid of amenities with icons + full categorized amenities popup dialog modal.
- **Interactive Dual-Month Calendar**: Date range selection engine, nights calculation, and date synchronization.
- **Sticky Reservation Card**:
  - Dynamic pricing calculation (₹5,490/night × N nights).
  - Cleaning fee, Airbnb service fee, and 12% GST tax breakdown.
  - Interactive guest selector popover (Adults, Children, Infants, Pets).
  - Reserve button with instant booking confirmation modal & celebration effects.
- **Reviews Section**: Overall score breakdown progress bars (Cleanliness, Accuracy, Communication, Location, Check-in, Value) and verified review cards with in-modal search.
- **Location Section**: Candolim Beach map representation with proximity callouts (500m to beach, restaurants, Fort Aguada).
- **Host Profile & Rules**: Mirashya Homes host card, response stats, message host modal, and house rules.

### 2. Photo Tour (Overlay View)
- Full-screen photo gallery accessible via *"Show all photos"* or hero photos.
- Sticky navigation with category pills (*Living room, Jacuzzi & Bath, Bedroom, Kitchen & Dining, Pool & Exterior*).
- Grouped room-by-room photo stream with high-res photography and descriptions.
- Clicking any photo transitions into the **Lightbox**.

### 3. Lightbox (Single Photo Viewer View)
- Dark overlay single-photo viewer.
- Real-time photo index counter (e.g. `3 / 12`).
- Previous / Next chevrons with smooth animations.
- **Full Keyboard Navigation**:
  - `ArrowLeft`: Previous photo
  - `ArrowRight`: Next photo
  - `Escape`: Close lightbox

### 4. Production System Architecture
- Interactive **System Architecture Modal** accessible from the top navigation bar.
- Dedicated `ARCHITECTURE.md` documenting multi-region scaling for 10M+ DAU, Redis Redlock for zero-overbooking, and Uber H3 geospatial search.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Date Engine**: date-fns
- **Animation**: CSS3 / Framer Motion / Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation & Run
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
airbnb-clone/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Top Airbnb navbar
│   │   ├── PropertyHeader.tsx      # Listing title, rating, share/save
│   │   ├── HeroGallery.tsx         # 5-photo desktop grid
│   │   ├── PropertyOverview.tsx    # Host specs, AirCover, description
│   │   ├── AmenitiesSection.tsx    # Amenities grid & popup modal
│   │   ├── CalendarSection.tsx     # 2-month interactive date picker
│   │   ├── ReservationCard.tsx     # Sticky booking widget with math
│   │   ├── ReviewsSection.tsx      # Ratings bars & verified reviews
│   │   ├── LocationSection.tsx     # Candolim map & neighborhood
│   │   ├── HostSection.tsx         # Host profile & message modal
│   │   ├── ThingsToKnow.tsx        # House rules & safety
│   │   ├── Footer.tsx              # Airbnb directory & legal footer
│   │   ├── PhotoTourModal.tsx      # Full-screen categorized photo tour
│   │   ├── LightboxModal.tsx       # Single-photo viewer with keyboard nav
│   │   └── ArchitectureModal.tsx   # System architecture interactive viewer
│   ├── data/
│   │   └── listingData.ts          # Authentic property photography & data
│   ├── types.ts                    # TypeScript data definitions
│   ├── App.tsx                     # Main application container
│   ├── main.tsx                    # React DOM entry
│   └── index.css                   # Tailwind styles & Airbnb theme
├── ARCHITECTURE.md                 # Production distributed scaling strategy
├── AI_WORKFLOW_LOGS.md             # AI subagent configs & prompt history
└── package.json
```

---
