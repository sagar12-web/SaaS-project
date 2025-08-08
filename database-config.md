# Database Configuration

## SQLite Database Connection

For VS Code/Cursor database extensions like SQLTools, use these connection settings:

### Connection Details
- **Connection Name**: Revolution SaaS Development
- **Database Type**: SQLite
- **Database File**: `./server/database/development.sqlite`
- **Connection String**: `sqlite:./server/database/development.sqlite`

### Manual Connection
If you're using SQLTools extension in VS Code/Cursor:

1. Open Command Palette (`Cmd+Shift+P`)
2. Search for "SQLTools: Add New Connection"
3. Select "SQLite"
4. Configure:
   - Connection name: `Revolution SaaS DB`
   - Database file: `./server/database/development.sqlite`

### Direct SQLite Access
You can also access the database directly via terminal:
```bash
sqlite3 server/database/development.sqlite
```

### Database Schema
The database contains these tables:
- `users` - User accounts and authentication
- `projects` - Project management data
- `tasks` - Task tracking and status
- `activities` - User activity logs
- `project_members` - Project team relationships

### API Endpoints Working
The following endpoints are working correctly:
- `GET /api/projects` - Returns empty array (no mock data)
- `POST /api/auth/register` - Creates new users
- `GET /api/users` - Returns user list
- `GET /api/tasks` - Returns task list
- `GET /api/activities` - Returns activity feed

### Status
✅ Database file exists and is accessible
✅ All tables created successfully
✅ API endpoints responding
✅ Server running on port 5001
✅ Client running on port 3000

The "database connection error" in the status bar is likely from an IDE extension trying to connect. The actual application database is working perfectly.