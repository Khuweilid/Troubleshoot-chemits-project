#!/bin/bash

echo "Setting up Troubleshoot Chemist for XAMPP..."

# Check if XAMPP is installed
if [ ! -d "/opt/lampp" ] && [ ! -d "C:\xampp" ] && [ ! -d "/Applications/XAMPP" ]; then
  echo "Error: XAMPP not found. Please install XAMPP first."
  exit 1
fi

# Determine XAMPP path based on OS
if [ -d "/opt/lampp" ]; then
  XAMPP_PATH="/opt/lampp"
  echo "Found XAMPP at $XAMPP_PATH (Linux)"
elif [ -d "C:\xampp" ]; then
  XAMPP_PATH="C:\xampp"
  echo "Found XAMPP at $XAMPP_PATH (Windows)"
elif [ -d "/Applications/XAMPP" ]; then
  XAMPP_PATH="/Applications/XAMPP"
  echo "Found XAMPP at $XAMPP_PATH (macOS)"
fi

# Create directories in htdocs
echo "Creating directories in XAMPP htdocs..."
mkdir -p "$XAMPP_PATH/htdocs/troubleshoot-chemist/api"
mkdir -p "$XAMPP_PATH/htdocs/troubleshoot-chemist/lib"

# Copy PHP files
echo "Copying PHP files to XAMPP htdocs..."
cp src/api/*.php "$XAMPP_PATH/htdocs/troubleshoot-chemist/api/"
cp src/lib/php-connection.php "$XAMPP_PATH/htdocs/troubleshoot-chemist/lib/"

# Create database
echo "Creating database and tables..."

# For Linux/macOS
if [ -f "$XAMPP_PATH/bin/mysql" ]; then
  "$XAMPP_PATH/bin/mysql" -u root -e "CREATE DATABASE IF NOT EXISTS Troubleshoot_chemist;"
  "$XAMPP_PATH/bin/mysql" -u root Troubleshoot_chemist < src/sql/users.sql
# For Windows
elif [ -f "$XAMPP_PATH\mysql\bin\mysql.exe" ]; then
  "$XAMPP_PATH\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS Troubleshoot_chemist;"
  "$XAMPP_PATH\mysql\bin\mysql.exe" -u root Troubleshoot_chemist < src/sql/users.sql
fi

echo "Setup complete! You can now run the application with 'npm run dev'."
echo "Default login: admin@example.com / password"
