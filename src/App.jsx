import { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import partsData from "../data/data.json"; // Import the JSON file

function parsePartInfo(partString) {
	const regex = /^(\d+)\s*-\s*(.*)$/;
	const match = partString.match(regex);

	if (match) {
		const sevenElevenPartNumber = match[1]; // The number at the beginning
		let partName = match[2]; // The part name after "- "

		// Remove all occurrences of parentheses with numbers inside
		partName = partName.replace(/\s?\(\d+\)/g, "");

		return { sevenElevenPartNumber, partName };
	} else {
		return { sevenElevenPartNumber: null, partName: null }; // Return null if the format doesn't match
	}
}

function App() {
	const [matchingParts, setMatchingParts] = useState([]);
	const [searchTime, setSearchTime] = useState(null);

	const handleSearch = (query) => {
		if (!query) {
			setMatchingParts([]); // Clears the matching parts
			return;
		}

		const startTime = performance.now();

		const result = partsData?.result?.data?.partsSearch.filter((part) => part.name.toLowerCase().includes(query.toLowerCase()));

		const parsedParts = result.map((part) => ({
			...parsePartInfo(part.name),
			speedway_pmic: part.speedway_pmic,
		}));

		setMatchingParts(parsedParts);

		const endTime = performance.now();
		setSearchTime(endTime - startTime);
	};

	return (
		<div className={styles.container}>
			<SearchBar onSearch={handleSearch} />
			{searchTime !== null && (
				<p className={styles.searchData}>
					Searching {partsData.length} parts yielded {matchingParts.length} results
				</p>
			)}
			{searchTime !== null && (
				<p className={styles.searchTime}>
					Search executed in <span className={styles.timeNumber}>{searchTime.toFixed(2)}</span> ms
				</p>
			)}
			<div className={styles.results}>
				{matchingParts.length > 0 ? (
					matchingParts.map((part, index) => (
						<div key={index} className={styles.displayedPart}>
							<p>
								<strong>Part Name:</strong> {part.partName}
							</p>
							<p>
								<strong>SNOW Part Number:</strong> {part.sevenElevenPartNumber}
							</p>
							<p>
								<strong>SPWY PMIC Part Number:</strong> {part.speedway_pmic}
							</p>
						</div>
					))
				) : (
					<p className={styles.displayedPart}>No parts found</p>
				)}
			</div>
		</div>
	);
}

export default App;
