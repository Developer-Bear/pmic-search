import { useState } from "react";
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import partsData from "./data/data.json";
import GoogleSearchButton from "./components/GoogleSearchButton/GoogleSearchButton";

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

function sanitizeManufacturerNumber(num) {
	return num.replace(/\s*\(Speedway\)/, "");
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

		// Filter the parts based on whether the part name or manufacturer_num contains the query
		const result = partsData?.result?.data?.partsSearch.filter((part) => part.name.toLowerCase().includes(query.toLowerCase()) || part.manufacturer_num?.toLowerCase().includes(query.toLowerCase()));

		const parsedParts = result.map((part) => ({
			...parsePartInfo(part.name),
			speedway_pmic: part.speedway_pmic,
			manufacturer_num: part.manufacturer_num,
			part_num: sanitizeManufacturerNumber(part.part_num),
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
							<p>{part.partName}</p>
							<p>
								<strong>SNOW #:</strong> {part.sevenElevenPartNumber}
							</p>
							<p>
								<strong>SPWY PMIC #:</strong> {part.speedway_pmic}
							</p>
							<p>
								<strong>Manufacturer:</strong> {part.manufacturer_num}
							</p>
							<div className={styles.manufacturerNumWrapper}>
								<p>
									<strong>Manufacturer #:</strong> {part.part_num}
								</p>
								<GoogleSearchButton query={part.manufacturer_num + " " + part.part_num} />
							</div>
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
