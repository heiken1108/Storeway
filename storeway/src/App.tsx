import './App.css'
import AllStores from './Pages/AllStores'
import StorePage from './Pages/StorePage'
import Header from './Components/Header'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AllStores/>}/>
        <Route path="/store/:storeID" element={<StorePage/>}/>
      </Routes>
    </Router>
)}

export default App
