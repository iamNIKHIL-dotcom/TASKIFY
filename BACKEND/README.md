# Taskify Backend

This is the backend server for the Taskify application, providing API endpoints for user authentication, OTP verification, and todo management.

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (local or Atlas)

### Installation
1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd BACKEND
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root of the BACKEND directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
USER_EMAIL=your_gmail_address
USER_PASSWORD=your_gmail_app_password
PORT=3006
```

### Setting up Gmail for OTP Verification

The application uses Gmail to send OTP verification emails. Follow these steps to set up your Gmail account for this purpose:

#### Option 1: Using App Passwords (Recommended if you have 2FA enabled)

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to Security > 2-Step Verification > App passwords
   - If you don't see App passwords, you might need to enable 2-Step Verification first
3. Select "Mail" as the app and "Other" as the device type
4. Enter a name (e.g., "Taskify App")
5. Click "Generate"
6. Copy the 16-character password that appears
7. Use this password in your `.env` file as `USER_PASSWORD`

#### Option 2: Allow Less Secure Apps (Not recommended, but simpler)

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to Security
3. Scroll down to "Less secure app access" and turn it ON
4. Use your regular Gmail password in your `.env` file as `USER_PASSWORD`

**Note**: Google is phasing out the "Less secure app access" option, so Option 1 is more future-proof.

#### Option 3: Use a dedicated email service

If you continue to have issues with Gmail, consider using a dedicated email service like SendGrid, Mailgun, or Amazon SES, which are designed for application email sending.

### Troubleshooting Email Issues

If you're still experiencing email sending issues:

1. Check that your Gmail credentials are correct
2. Ensure you're using an App Password if you have 2FA enabled
3. Check for any security alerts in your Gmail account
4. Try logging in to your Gmail account and look for any security notifications
5. Temporarily disable any advanced security features in your Google account for testing

### Starting the Server
Run the following command to start the server:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3006).

## API Endpoints

### Authentication
- `POST /user/signup-init`: Initiate signup process
- `POST /user/signup-verify`: Verify OTP and complete signup
- `POST /user/signin-init`: Initiate signin process
- `POST /user/signin-verify`: Verify OTP and complete signin

### Todos
- `GET /todos`: Get all todos for authenticated user
- `POST /todos`: Create a new todo
- `PUT /todos/:id`: Update a todo
- `DELETE /todos/:id`: Delete a todo 