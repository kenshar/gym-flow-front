# Gym Flow Frontend

This is the frontend for the Gym Flow application, built with React and Vite. It provides a modern user interface for gym members and admins to log workouts, view attendance, and access admin dashboards with charts and reports.

## Features
- User authentication and protected routes
- Workout logging and history
- Attendance tracking
- Admin dashboard with charts (Chart.js)
- Responsive and modern UI

### Feature Breakdown by Contributor

#### Authentication & Authorisation - Ken
- Secure user login and session management
- Role-based access control (Admin vs User routes)
- Protected route components
- Password reset functionality

#### Member Management (Admin) - Branice
- View all gym members
- Add new members
- Edit member details
- Member list with filtering

#### Workout Management - Allan
- Log new workouts with details
- View complete workout history
- Track workout progress
- Workout statistics and analytics

#### Attendance Tracking - Derrick
- Member check-in/check-out system
- Attendance history records
- Attendance patterns and reports
- Real-time attendance status

#### Admin Dashboard & Reports - Linda
- Comprehensive admin dashboard
- Data visualisation with Chart.js
- Summary reports
- Performance metrics and analytics

#### User Dashboard - Linda 
- Personal activity overview
- Quick stats and metrics
- Recent activities
- Progress tracking

## Technologies Used
- **React** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Chart.js** - Data visualization and charts
- **CSS Modules & CSS** - Styling

## Setup
1. **Clone the repository**
2. **Install dependencies:**
	```bash
	npm install
	```
3. **Run the development server:**
	```bash
	npm run dev
	```
	The app will be available at `http://localhost:5174` (or as configured by Vite).

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
VITE_API_BASE_URL=http://localhost:3001
```

## Project Structure
```
src/
├── admin/              # Admin-specific pages and components
│   ├── dashboard/      # Admin dashboard
│   ├── members/        # Member management
│   └── reports/        # Reporting features
├── api/                # API integration and axios configuration
├── auth/               # Authentication components and context
├── components/         # Shared components
├── routes/             # Route definitions and protections
├── shared/             # Shared utilities and components
│   ├── components/     # Global components (Navbar, etc.)
│   └── utils/          # Utility functions
├── user/               # User-specific features
│   ├── attendance/     # Attendance tracking
│   ├── dashboard/      # User dashboard
│   ├── reports/        # User reports
│   └── workouts/       # Workout logging and history
└── main.jsx            # Application entry point
```

## Contributors
- **Allan Ratemo** - Authentication & Authorization, Protected Routes
- **Branice Nashilu** - Member Management, Admin Dashboard
- **Derrick Koome** - Workout Management, Workout History
- **Kennedy Ng'ang'a** - Attendance Tracking, Check-in System
- **Linda Chepchieng** - Reports & Analytics, User Dashboard

---
## License
© 2026 Gym Flow. This project is licensed under the MIT License - see the LICENSE file for details.


© 2026 Gym Flow. This project is licensed under the MIT License - see the LICENSE file for details.

