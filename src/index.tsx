import React from 'react'

import './normalize.css'
import './index.css'
import App from './App'
import { createRoot } from 'react-dom/client'
import { defineCustomElements } from '@ionic/pwa-elements/loader'

// for MUI (datepicker used)
// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/400.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'

const container = document.getElementById('root') as Element
const root = createRoot(container)
root.render(<App />)

// this allows us to show the custom pwa elements,
// for example when uploading a picture
void defineCustomElements(window)
