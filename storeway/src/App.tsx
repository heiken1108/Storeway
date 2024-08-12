import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Header from './Components/Header/Header'
import AllStores from './Pages/AllStores'
import StorePage from './Pages/StorePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const queryClient = new QueryClient()

function App() {
	return (
		<Router>
			<Header />
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<AllStores />} />
					<Route path="/store/:storeID" element={<StorePage />} />
				</Routes>
			</QueryClientProvider>
		</Router>
	)
}

export default App
