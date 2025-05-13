import styles from "./GoogleSearchButton.module.css";
import { FaGoogle } from "react-icons/fa6";

function GoogleSearchButton({ query }) {
	const handleClick = () => {
		if (!query) return;
		const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
		window.open(url, "_blank"); // Opens the search in a new tab
	};

	return <FaGoogle className={styles.icon} onClick={handleClick} disabled={!query} />;
}

export default GoogleSearchButton;
