import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Preview from './pages/Preview'
import Layout from './components/Layout'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Container from './components/Container'
import Propertylistings from './pages/PropertyDetails'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Container/>} >
      <Route path='' element={<Preview/>}/>
      <Route path='user' element={<Layout/>}>
           <Route path='home' element={<Home/>}></Route>
           <Route path='property' element={<Propertylistings/>}/>
      </Route>
    </Route>
  ))


  return (
    <>
    <RouterProvider router={router} >
     </RouterProvider>
    </>
  )
}

export default App
