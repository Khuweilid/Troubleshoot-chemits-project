# Setting Up Troubleshoot Chemist with XAMPP

## Prerequisites

- XAMPP installed on your system (Download from [https://www.apachefriends.org/](https://www.apachefriends.org/))
- Node.js and npm installed

## Automatic Setup

Run the setup script to automatically configure XAMPP:

```bash
# On Linux/macOS
./setup-xampp.sh

# On Windows (using Git Bash or similar)
./setup-xampp.sh
```

This script will:
1. Create necessary directories in XAMPP's htdocs folder
2. Copy PHP files to the correct locations
3. Create the database and tables

## Manual Setup

If the automatic setup doesn't work, follow these steps:

### Step 1: Start XAMPP Services

1. Open XAMPP Control Panel
2. Start Apache and MySQL services
3. Verify both services are running (green indicators)

### Step 2: Create the Database

1. Open your web browser and navigate to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
2. Click on "New" in the left sidebar to create a new database
3. Enter "Troubleshoot_chemist" as the database name and click "Create"

### Step 3: Import Database Schema

1. Select the "Troubleshoot_chemist" database from the left sidebar
2. Click on the "Import" tab at the top
3. Click "Choose File" and select the `src/sql/users.sql` file from the project
4. Click "Go" to import the schema

### Step 4: Set Up PHP Files

1. Copy the PHP files to your XAMPP htdocs directory:
   - Create a folder: `C:/xampp/htdocs/troubleshoot-chemist/`
   - Create subfolders: `api` and `lib`
   - Copy `src/api/*.php` to `C:/xampp/htdocs/troubleshoot-chemist/api/`
   - Copy `src/lib/php-connection.php` to `C:/xampp/htdocs/troubleshoot-chemist/lib/`

## Running the Application

After setup is complete:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the URL shown in the terminal

## Login Credentials

- Default admin account:
  - Email: khuwabdul@yahoo.com
  - Password: Khuw@210498

- You can also register new users through the sign-up page

## Troubleshooting

If you encounter issues:

1. Make sure XAMPP's Apache and MySQL services are running
2. Check that the database was created correctly
3. Verify that the PHP files were copied to the correct locations
4. Check the browser console for any error messages
