
# Task Board Application

A modern task management application built with React. Features drag-and-drop functionality, persistent storage, and authentication.

##  Live Demo

[Deployed Application URL] -https://task-board-gamma-rosy.vercel.app/


##  Features

### Authentication
- Static login system
- **Email:** `intern@demo.com`
- **Password:** `intern123`
- Remember me functionality
- Protected routes
- Secure logout

### Task Management
- **Create** tasks with title, description, priority, due date, and tags
- **Edit** existing tasks
- **Delete** tasks with confirmation
- **Drag & Drop** tasks between columns (Todo, Doing, Done)
- **Search** tasks by title
- **Filter** tasks by priority (Low, Medium, High)
- **Sort** tasks by due date (empty dates appear last)

### Activity Tracking
- Real-time activity log
- Tracks task creation, editing, moving, and deletion
- Displays timestamps for all actions
- Shows last 10 activities

### Data Persistence
- All data saved in localStorage
- Survives page refresh
- Handles corrupted data gracefully
- Reset board option with confirmation

## Technology Stack

- **React 18** - UI framework
- **React Router v6** - Navigation
- **@hello-pangea/dnd** - Drag and drop
- **localStorage** - Data persistence
- **Jest + React Testing Library** - Testing

##  Installation

### Prerequisites
- Node.js (v16 or higher)
- npm

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open browser**
   - Navigate to `http://localhost:3000`
   - Login with demo credentials


## How to Use

### Login
1. Open the application
2. Enter email: `intern@demo.com`
3. Enter password: `intern123`
4. Check "Remember me" to stay logged in
5. Click Login

### Create Task
1. Click "+ New Task" button
2. Fill in task details:
   - Title (required)
   - Description (optional)
   - Priority (Low/Medium/High)
   - Due Date (optional)
   - Tags (comma-separated, optional)
3. Click "Create"

### Manage Tasks
- **Edit:** Click  edit  on task card
- **Delete:** Click Delete on task card
- **Move:** Drag task to different column
- **Search:** Type in search box to filter by title
- **Filter:** Select priority from dropdown

### Activity Log
- Click "Activity Log" button to view recent actions
- Shows last 10 activities with timestamps

### Reset Board
- Click "Reset Board" button
- Confirm to delete all tasks and activity logs

##  Testing

Run tests with:
```bash
npm test
```

**Test Coverage:**
- Authentication (login/logout)
- Storage operations (save/retrieve/error handling)
- Component rendering (TaskCard display and interactions)

##  Deployment

### Build for Production
```bash
npm run build
```

### Deploy to:
- **Vercel:** Connect GitHub repository


**Demo Credentials:**
- Email: `intern@demo.com`
- Password: `intern123`

