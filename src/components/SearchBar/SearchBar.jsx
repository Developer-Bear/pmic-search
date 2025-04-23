import styles from "./SearchBar.module.css";
import { useState } from "react";

function SearchBar({ onSearch }) {
	const [query, setQuery] = useState("");

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input type="text" value={query} onChange={handleInputChange} placeholder="Search by part number or keyword" className={styles.input} />
			<button type="submit" className={styles.btn}>
				Search
			</button>
		</form>
	);
}

export default SearchBar;
