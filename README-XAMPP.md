# Setting Up Troubleshoot Chemist with XAMPP

## Prerequisites

- XAMPP installed on your system (Download from [https://www.apachefriends.org/](https://www.apachefriends.org/))
- Node.js and npm installed

## Step 1: Start XAMPP Services

1. Open XAMPP Control Panel
2. Start Apache and MySQL services
3. Verify both services are running (green indicators)

## Step 2: Create the Database

1. Open your web browser and navigate to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Click on "New" in the left sidebar to create a new database
3. Enter "troubleshoot_chemist" as the database name and click "Create"

## Step 3: Import Database Schema

1. Select the "troubleshoot_chemist" database from the left sidebar
2. Click on the "Import" tab at the top
3. Click "Choose File" and select the `database-setup.sql` file from the project root
4. Click "Go" to import the schema

## Step 4: Install MySQL Client for Node.js

In your project directory, run:

```bash
npm install mysql2
```

## Step 5: Configure Database Connection

The database connection is already configured in `src/lib/database.ts`. If your XAMPP MySQL uses a different username or password, update the configuration:

```typescript
export const dbConfig = {
  host: 'localhost',
  user: 'root',        // Change if needed
  password: '',        // Change if needed
  database: 'troubleshoot_chemist',
  port: 3306           // Change if needed
};
```

## Step 6: Start the Application

Run the development server:

```bash
npm run dev
```

## Login Credentials

Use the following credentials to log in:

- Email: admin@example.com
- Password: password

## Database Structure

The application uses the following tables:

- `users`: User accounts and authentication
- `network_devices`: Network device inventory
- `network_issues`: Troubleshooting tickets
- `knowledge_articles`: Knowledge base content
- `forum_threads`: Community forum threads
- `forum_replies`: Replies to forum threads

## Implementing Real Database Queries

The current implementation uses mock data. To implement real database queries:

1. Update the methods in `src/lib/db-service.ts` to use actual MySQL queries
2. Use the mysql2 library to execute queries against your database

Example implementation:

```typescript
import mysql from 'mysql2/promise';
import { dbConfig } from './database';

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Example query method
async function getUserByEmail(email: string) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}
```
