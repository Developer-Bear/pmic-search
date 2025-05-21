import { useNavigate } from "react-router-dom";
import { useState } from "react";
import resolutions from "../../data/resolutions.json";
import styles from "./ResolutionPage.module.css";
import { IoArrowBackCircle } from "react-icons/io5";
import CopyButton from "../SearchPage/CopyButton/CopyButton";

function ResolutionNotesList() {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

	const filteredResolutions = Object.entries(resolutions).filter(([_, { label }]) => label.toLowerCase().includes(searchQuery.toLowerCase()));

	return (
		<div className={styles.container}>
			<button
				className={styles.backButton}
				onClick={() => {
					setTimeout(() => navigate("/"), 150);
				}}
			>
				<IoArrowBackCircle /> <span>Back to Home</span>
			</button>

			<input type="text" placeholder="Search resolutions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={styles.searchInput} />

			{filteredResolutions.map(([key, { label, resolution }]) => (
				<div key={key} className={styles.resolutionContainer}>
					<div className={styles.titleWrapper}>
						<h3 className={styles.resolutionTitle}>{label}</h3>
						<CopyButton text={resolution} />
					</div>
					<p className={styles.resolutionDescription}>{resolution}</p>
				</div>
			))}
		</div>
	);
}

export default ResolutionNotesList;
