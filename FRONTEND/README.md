## Features
- User authentication with email OTP verification
- Secure login and signup process with two-factor authentication
- Protected routes for authenticated users
- Add, view, and manage tasks
- Responsive design with light and dark mode support

## Environment Variables

### Backend Environment Variables
Create a `.env` file in the BACKEND directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
USER_EMAIL=your_gmail_address
USER_PASSWORD=your_gmail_app_password
PORT=3006
```

Note: For the email functionality to work, you need to:
1. Use a Gmail account
2. Generate an App Password (if you have 2FA enabled on your Google account)
   - Go to your Google Account > Security > App passwords
   - Select "Mail" as the app and "Other" as the device
   - Enter a name (e.g., "Todo App")
   - Click "Generate"
3. Use the generated password in the USER_PASSWORD environment variable 