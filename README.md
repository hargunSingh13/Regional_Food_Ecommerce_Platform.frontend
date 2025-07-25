# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Concept
- Designed and built a full‑stack web platform (MERN stack) to connect users with authentic regional food products from parent states across India.“Flavors of India” is an online marketplace designed to bring authentic, regional culinary specialties from across India directly to users' doorsteps. The platform acts as a bridge between local foodmakers in various states and consumers who crave traditional flavors. Shoppers can discover, explore, and purchase unique homemade products—like artisanal pickles, regional snacks, spice mixes, sweets, and handcrafted food items—while local producers gain access to a broader customer base.

Key Contributions

User Authentication & Security: Implemented registration and login flows using JWT, with passwords securely hashed using bcrypt and ensuring encryption of all sensitive data both in transit and at rest.

Secure Admin Panel: Designed a dedicated admin portal with role‑based access control (RBAC). Admin-specific routes were protected via JWT middleware that checks user.role === 'admin', ensuring only authorized personnel can manage sensitive operations 

Product Discovery & Filtering: Admins can CRUD products via the admin UI, while users browse and filter by region, cuisine, state, bestseller and dietary preferences.

Shopping Cart & Checkout: Users can add items, review orders, and pay via integrated payment gateway (e.g., Razorpay). Payment flows secured with HTTPS and no sensitive payment data stored server-side, aligning with best practices 

Backend & Database Architecture: Created RESTful APIs with Node.js/Express.js and structured a flexible MongoDB schema to support scalable product and user data.

Responsive UI/UX: Designed a responsive interface using React.js and Tailwind CSS, optimized for performance across desktop and mobile devices.

Technologies Used
Frontend: React.js, HTML5, Tailwind CSS
Backend: Node.js, Express.js, JWT, bcrypt
Database: MongoDB
Payments: Razorpay integration
Version Control & Deployment: GitHub, (deployed on Render/Vercel

- # frontend
npm install
npm run dev

# backend
npm install
npm start

# Live link  
