# Setting Up Troubleshoot Chemist with XAMPP and PHP

## Prerequisites

- XAMPP installed on your system (Download from [https://www.apachefriends.org/](https://www.apachefriends.org/))
- Node.js and npm installed

## Step 1: Start XAMPP Services

1. Open XAMPP Control Panel
2. Start Apache and MySQL services
3. Verify both services are running (green indicators)

## Step 2: Set Up the Database

1. Open your web browser and navigate to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Verify that the 'Troubleshoot_chemist' database exists (or create it if it doesn't)
3. Import the database schema:
   - Select the "Troubleshoot_chemist" database from the left sidebar
   - Click on the "Import" tab at the top
   - Click "Choose File" and select the `database-setup-troubleshoot-chemist.sql` file from the project root
   - Click "Go" to import the schema

## Step 3: Set Up PHP Files

1. Copy the PHP files to your XAMPP htdocs directory:
   - Copy `src/lib/php-connection.php` to `C:/xampp/htdocs/troubleshoot-chemist/lib/`
   - Copy `src/api/db-api.php` to `C:/xampp/htdocs/troubleshoot-chemist/api/`
   - Make sure to create the necessary directories if they don't exist

## Step 4: Install MySQL Client for Node.js

In your project directory, run:

```bash
npm install mysql2
```

## Step 5: Configure the Application

The application is already configured to connect to the database with the following settings:

```typescript
export const dbConfig = {
  host: "localhost",
  user: "root",
  password: "", // Default XAMPP MySQL password is empty
  database: "Troubleshoot_chemist",
  port: 3306,
};
```

If your XAMPP MySQL uses different credentials, update these settings in `src/lib/database.ts`.

## Step 6: Start the Application

Run the development server:

```bash
npm run dev
```

## Testing the PHP API

You can test the PHP API by accessing the following URLs in your browser:

- http://localhost/troubleshoot-chemist/api/db-api.php?endpoint=users
- http://localhost/troubleshoot-chemist/api/db-api.php?endpoint=devices
- http://localhost/troubleshoot-chemist/api/db-api.php?endpoint=articles

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
