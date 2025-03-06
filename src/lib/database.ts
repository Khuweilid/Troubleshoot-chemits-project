// Database connection configuration

// MySQL connection details for XAMPP
export const dbConfig = {
  host: "localhost",
  user: "root",
  password: "", // Default XAMPP MySQL password is empty
  database: "Troubleshoot_chemist", // Matches the PHP connection
  port: 3306,
};

// This is a placeholder for actual database connection
// In a real application, you would use a library like mysql2 or typeorm

/*
To set up the database with XAMPP:

1. Start XAMPP Control Panel and ensure Apache and MySQL services are running
2. Open phpMyAdmin at http://localhost/phpmyadmin
3. Create a new database named 'Troubleshoot_chemist'
4. Create necessary tables for your application
5. Install a MySQL client library in your project:
   npm install mysql2

Then you can implement actual database connection and queries.
*/
