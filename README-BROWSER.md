# Running Troubleshoot Chemist in Browser Mode

This application can run in two modes:

1. **Browser Mode**: Uses mock data for development and testing in the browser
2. **XAMPP Mode**: Connects to a real MySQL database via XAMPP (see README-PHP-XAMPP.md)

## Browser Mode Setup

To run the application in browser mode (without database connection):

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Login Credentials

Use the following credentials to log in:

- Email: admin@example.com
- Password: password

## Features Available in Browser Mode

All features are available in browser mode, but they use mock data instead of real database data:

- Dashboard with network statistics
- Interactive troubleshooting guide
- Network sandbox environment
- Diagnostic tools
- Community forum
- Knowledge base

## Switching to XAMPP Mode

If you want to use real database connections, please follow the instructions in README-PHP-XAMPP.md to set up the XAMPP environment.
