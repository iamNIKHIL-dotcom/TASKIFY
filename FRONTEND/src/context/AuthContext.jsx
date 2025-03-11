import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [authStage, setAuthStage] = useState('initial'); // 'initial', 'verification'

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Reset auth stage when token is set (successful login/signup)
      setAuthStage('initial');
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  const initiateLogin = async (username, password) => {
    try {
      const response = await axios.post('/user/signin-init', { username, password });
      setVerificationEmail(response.data.email);
      setAuthStage('verification');
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Login initiation error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login initiation failed' 
      };
    }
  };

  const verifyLoginOtp = async (email, otp) => {
    try {
      const response = await axios.post('/user/signin-verify', { email, otp });
      setToken(response.data.token);
      // Auth stage will be reset in the useEffect when token changes
      return { success: true };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'OTP verification failed' 
      };
    }
  };

  const initiateSignup = async (username, email, password) => {
    try {
      const response = await axios.post('/user/signup-init', { username, email, password });
      setVerificationEmail(response.data.email);
      setAuthStage('verification');
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Signup initiation error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Signup initiation failed' 
      };
    }
  };

  const verifySignupOtp = async (email, otp) => {
    try {
      const response = await axios.post('/user/signup-verify', { email, otp });
      setToken(response.data.token);
      // Auth stage will be reset in the useEffect when token changes
      return { success: true };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'OTP verification failed' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthStage('initial');
  };

  const resetAuthStage = () => {
    setAuthStage('initial');
  };

  const value = {
    token,
    user,
    initiateLogin,
    verifyLoginOtp,
    initiateSignup,
    verifySignupOtp,
    logout,
    loading,
    verificationEmail,
    authStage,
    resetAuthStage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 