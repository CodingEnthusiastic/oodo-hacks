# StockMaster

A modern inventory management system for businesses ready to leave manual tracking behind.

## Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AtharvThite/oodo-hacks.git
   cd oodo-hacks
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/stockmaster
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   NODE_ENV=development
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

#### Option 1: Run Both Backend and Frontend (Recommended)

**Terminal 1 - Start MongoDB** (if not running as a service)
```bash
mongod
```

**Terminal 2 - Start Backend**
```bash
cd backend
npm start
```
The backend will start on `http://localhost:5000`

**Terminal 3 - Start Frontend**
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

#### Option 2: Build for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```
The built files will be in the `frontend/build` directory.

### Project Structure

```
oodo-hacks/
├── backend/
│   ├── models/           # Database models (Product, Warehouse, Transfer, etc.)
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic (email, OTP, stock calculations)
│   ├── middleware/       # Authentication middleware
│   ├── utils/            # Utility functions
│   └── server.js         # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service calls
│   │   ├── store/        # Redux store configuration
│   │   └── App.jsx       # Main App component
│   ├── index.html        # HTML entry point
│   └── package.json      # Dependencies
└── README.md             # This file
```

### Key Features

- 📦 **Inventory Management** - Track stock across multiple warehouses
- 👥 **User Management** - Role-based access control
- 📊 **Reports & Analytics** - Comprehensive stock reports
- 🚚 **Operations** - Transfers, receipts, deliveries, and adjustments
- 🔐 **Security** - JWT authentication and OTP verification
- 📧 **Email Notifications** - Automated email alerts

### Available API Endpoints

- **Auth**: `/api/auth/login`, `/api/auth/register`, `/api/auth/verify-otp`
- **Products**: `/api/products` (GET, POST, PUT, DELETE)
- **Warehouses**: `/api/warehouses` (GET, POST, PUT, DELETE)
- **Transfers**: `/api/transfers` (GET, POST, PUT, DELETE)
- **Receipts**: `/api/receipts` (GET, POST, PUT, DELETE)
- **Deliveries**: `/api/deliveries` (GET, POST, PUT, DELETE)
- **Reports**: `/api/reports`
- **Adjustments**: `/api/adjustments` (GET, POST, PUT, DELETE)

### Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env` file

**Port Already in Use**
- Backend: Change `PORT` in `.env`
- Frontend: Set a different port with `npm run dev -- --port 3000`

**Dependencies Not Installing**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### Development

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Backend**: Node.js with Express
- **Database**: MongoDB

### Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

---

## Implementation Video

For a detailed walkthrough of the project features and implementation, watch the implementation video:

🎥 [Implementation Video Link](https://drive.google.com/file/d/1tZxWYyiwFjbX_bpAHvkjDa00cnEnr4VS/view?usp=drive_link)
