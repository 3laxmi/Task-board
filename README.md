# Task Board Application

A modern, responsive task management application built with React and TypeScript. Features drag-and-drop functionality, persistent storage, and a complete authentication system.

## 🚀 Live Demo

[Deployed Application URL] - *To be updated after deployment*

## ✨ Features

### Authentication
- Static login with hardcoded credentials
- Email: `intern@demo.com`
- Password: `intern123`
- "Remember me" functionality using localStorage
- Protected routes with automatic redirect
- Secure logout with session cleanup

### Task Management
- **CRUD Operations**: Create, read, update, and delete tasks
- **Drag & Drop**: Move tasks between columns (Todo, Doing, Done)
- **Task Properties**:
  - Title (required)
  - Description
  - Priority (Low, Medium, High)
  - Due Date
  - Tags (comma-separated)
  - Created timestamp

### Advanced Features
- **Search**: Find tasks by title
- **Filter**: Filter tasks by priority level
- **Sort**: Automatic sorting by due date (empty dates last)
- **Activity Log**: Track all task operations with timestamps
- **Reset Board**: Clear all data with confirmation
- **Responsive Design**: Works on desktop and mobile devices

### Data Persistence
- All data persists across browser sessions using localStorage
- Graceful handling of missing or corrupted storage
- Safe fallbacks for empty states

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **Drag & Drop**: @hello-pangea/dnd
- **Storage**: localStorage API
- **Testing**: Jest + React Testing Library
- **Styling**: Inline styles (component-scoped)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Extract the project files**
   ```bash
   # Extract the ZIP file to your desired location
   cd taskboard-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Use the demo credentials to login

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (not recommended)

## 🧪 Testing

The application includes comprehensive tests covering:

1. **Authentication Logic** (`useAuth.test.ts`)
   - Valid/invalid login attempts
   - Logout functionality
   - Session persistence

2. **Storage Operations** (`storage.test.ts`)
   - Data persistence and retrieval
   - Error handling for corrupted data
   - Empty state management

3. **Component Rendering** (`TaskCard.test.tsx`)
   - Task information display
   - User interaction handling
   - Event callback execution

Run tests with:
```bash
npm test
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Login.tsx        # Authentication form
│   ├── TaskBoard.tsx    # Main board with drag-and-drop
│   ├── TaskCard.tsx     # Individual task display
│   ├── TaskForm.tsx     # Task creation/editing modal
│   └── ProtectedRoute.tsx # Route protection wrapper
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication state management
│   └── useTasks.ts      # Task operations and activity logging
├── types/               # TypeScript type definitions
│   └── index.ts         # Task, User, and ActivityLog interfaces
├── utils/               # Utility functions
│   └── storage.ts       # localStorage abstraction layer
├── __tests__/           # Test files
│   ├── useAuth.test.ts
│   ├── storage.test.ts
│   └── TaskCard.test.tsx
├── App.tsx              # Main application component
├── App.css              # Global styles
└── index.tsx            # Application entry point
```

## 🎯 Key Implementation Details

### State Management
- **Custom Hooks**: `useAuth` and `useTasks` for clean separation of concerns
- **Local State**: React useState for UI state management
- **Persistent State**: localStorage for data that survives page refreshes

### Component Architecture
- **Reusable Components**: TaskCard, TaskForm designed for reusability
- **Single Responsibility**: Each component has a focused purpose
- **Props Interface**: TypeScript interfaces ensure type safety

### Data Flow
1. User actions trigger hook functions
2. Hooks update local state and localStorage
3. Components re-render with updated data
4. Activity log captures all operations

### Error Handling
- Form validation with user-friendly error messages
- Safe localStorage operations with try-catch blocks
- Graceful degradation for missing data

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect GitHub repository for automatic deployments
- **GitHub Pages**: Use `gh-pages` package for static hosting
- **AWS S3**: Upload build files to S3 bucket with static hosting

### Environment Considerations
- No backend dependencies - purely client-side application
- All data stored locally in browser
- No API keys or sensitive configuration required

## 🔒 Security Notes

- Credentials are hardcoded for demo purposes only
- In production, implement proper authentication with secure backend
- localStorage data is accessible to any script on the domain
- Consider encryption for sensitive data in real applications

## 🎨 Design Decisions

### UI/UX
- **Clean Interface**: Minimal design focusing on functionality
- **Visual Feedback**: Color-coded priorities, drag states
- **Responsive Layout**: Flexbox for adaptive column layout
- **Accessibility**: Proper button labels and keyboard navigation

### Performance
- **Memoization**: useMemo for filtered/sorted task lists
- **Efficient Updates**: Targeted state updates to minimize re-renders
- **Lazy Loading**: Components loaded only when needed

### Maintainability
- **TypeScript**: Strong typing prevents runtime errors
- **Modular Structure**: Clear separation of concerns
- **Consistent Patterns**: Similar patterns across components
- **Documentation**: Comprehensive comments and README

## 🐛 Known Limitations

- Data is lost if localStorage is cleared
- No real-time collaboration features
- Limited to single-user scenarios
- No data backup or export functionality

## 🔮 Future Enhancements

- Backend integration with user accounts
- Real-time collaboration with WebSockets
- Advanced filtering and search options
- Task templates and bulk operations
- Data export/import functionality
- Mobile app version

## 📝 License

This project is created for educational purposes as part of a frontend internship assignment.

---

**Demo Credentials:**
- Email: `intern@demo.com`
- Password: `intern123`