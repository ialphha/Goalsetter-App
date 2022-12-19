import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";

function App() {
	return (
		<>
			<Router>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<Dashboard />}></Route>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/register" element={<Register />}></Route>
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
