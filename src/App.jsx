import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import partsData from "./data/data.json";
import GoogleSearchButton from "./components/GoogleSearchButton/GoogleSearchButton";
import { FaCopy } from "react-icons/fa";
import { Slide } from "react-toastify/unstyled";

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

function copyToClipboard(text) {
	if (navigator.clipboard) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				toast.success("Copied to Clipboard!", {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
					transition: Slide,
				});
			})
			.catch((err) => {
				console.error("Failed to copy:", err);
			});
	} else {
		// Fallback for older browsers
		const textarea = document.createElement("textarea");
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
		console.log("Copied using fallback method.");
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

		// Filter the parts based on whether the part name or manufacturer_num contains the query
		const result = partsData?.partsSearch.filter((part) => part.name.toLowerCase().includes(query.toLowerCase()) || part.manufacturer_num?.toLowerCase().includes(query.toLowerCase()));

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
							<p className={styles.part_title}>{part.partName}</p>
							<p>
								<span className={styles.line_label}>SNOW #:</span> <span className={styles.line_data}>{part.sevenElevenPartNumber}</span>
							</p>
							<p>
								<span className={styles.line_label}>SPWY PMIC #:</span> <span className={styles.line_data}>{part.speedway_pmic}</span>
							</p>
							<p>
								<span className={styles.line_label}>Manufacturer:</span> <span className={styles.line_data}>{part.manufacturer_num}</span>
							</p>
							<div className={styles.manufacturerNumWrapper}>
								<p>
									<span className={styles.line_label}>Manufacturer #:</span> <span className={styles.line_data}>{part.part_num}</span>
								</p>
								<GoogleSearchButton query={part.manufacturer_num + " " + part.part_num} />
								<FaCopy style={{ fontSize: "1.35rem" }} onClick={() => copyToClipboard(part.part_num)} />
							</div>
						</div>
					))
				) : (
					<p className={styles.displayedPart}>No parts found</p>
				)}
				<ToastContainer />
			</div>
		</div>
	);
}

export default App;
