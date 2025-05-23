import { useNavigate } from "react-router-dom";
import { useState } from "react";
import resolutions from "../../data/resolutions.json";
import styles from "./ResolutionPage.module.css";
import { IoArrowBackCircle } from "react-icons/io5";
import CopyButton from "../SearchPage/CopyButton/CopyButton";

function ResolutionNotesList() {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

	// State to track selected option index per resolution key
	const [selectedOptions, setSelectedOptions] = useState({});

	const filteredResolutions = Object.entries(resolutions).filter(([_, { title }]) => title.toLowerCase().includes(searchQuery.toLowerCase()));

	const handleOptionSelect = (resolutionKey, index) => {
		setSelectedOptions((prev) => ({
			...prev,
			[resolutionKey]: index,
		}));
	};

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

			{filteredResolutions.map(([key, { title, options }]) => {
				const selectedIndex = selectedOptions[key] ?? 0;
				const selectedResolution = options[selectedIndex];

				return (
					<div key={key} className={styles.resolutionContainer}>
						<div className={styles.titleWrapper}>
							<h3 className={styles.resolutionTitle}>{title}</h3>
							<CopyButton text={selectedResolution.resolution} />
						</div>
						<p className={styles.resolutionDescription}>{selectedResolution.resolution}</p>
						{options.length > 1 && (
							<div className={styles.buttonGroup}>
								{options.map(({ label }, index) => (
									<button key={label} onClick={() => handleOptionSelect(key, index)} className={index === selectedIndex ? styles.selectedButton : styles.optionButton}>
										{label}
									</button>
								))}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default ResolutionNotesList;
