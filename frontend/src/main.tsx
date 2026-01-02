
import React from 'react'
import ReactDOM from 'react-dom/client'
import { FirebaseProvider } from './lib/firebase/FirebaseContext'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>,
)
