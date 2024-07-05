import { useState } from 'react'
import './App.css'
import Preview from './pages/Preview'
import Layout from './components/Layout'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Container from './components/Container'
import Propertylistings from './pages/PropertyLiisting.jsx'
import PropertyDetails from './pages/Propertydeatils.jsx'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Container/>} >
      <Route path='' element={<Preview/>}/>
      <Route path='user' element={<Layout/>}>
           <Route path='home' element={<Home/>}></Route>
      </Route>
      <Route path='property' element={<Layout/>}>
        <Route path='listings' element={<Propertylistings/>}/>
        <Route path='details/:id' element={<PropertyDetails/>}/>
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
