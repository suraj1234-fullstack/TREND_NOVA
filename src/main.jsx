import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google';
const CLIENT_ID = "976544929945-qqnb1us9lqmoojtptc1rndcl8olqej6q.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId = {CLIENT_ID}>
  <StrictMode>
    <App />
  </StrictMode>,
  </GoogleOAuthProvider>
)
