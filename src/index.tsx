import React from 'react'
// import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './App'
import { createRoot } from 'react-dom/client'
// import { defineCustomElements } from '@ionic/pwa-elements/loader'

// for MUI (datepicker used)
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const container = document.getElementById('root') as Element
const root = createRoot(container)
root.render(<App />)

// https://capacitorjs.com/docs/v2/web/pwa-elements
// Needed to show camera elements when running on web page
// defineCustomElements(window)
