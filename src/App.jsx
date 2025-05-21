import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ResolutionPage from "./pages/ResolutionPage";

function App() {
	return (
		<div className={styles.container}>
			<ToastContainer />
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="/resolutions" element={<ResolutionPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
