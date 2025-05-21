import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SearchPage.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import partsData from "../../data/data.json";
import GoogleSearchButton from "../../components/GoogleSearchButton/GoogleSearchButton";
import { FaCopy } from "react-icons/fa";
import { Slide } from "react-toastify/unstyled";
import { IoArrowBackCircle } from "react-icons/io5";

function parsePartInfo(partString) {
	const regex = /^(\d+)\s*-\s*(.*)$/;
	const match = partString.match(regex);

	if (match) {
		const sevenElevenPartNumber = match[1];
		let partName = match[2];
		partName = partName.replace(/\s?\(\d+\)/g, "");
		return { sevenElevenPartNumber, partName };
	}
	return { sevenElevenPartNumber: null, partName: null };
}

function sanitizeManufacturerNumber(num) {
	return num.replace(/\s*\(Speedway\)/, "");
}

function copyToClipboard(text) {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text).then(() => {
			toast.success("Copied to Clipboard!", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				theme: "dark",
				transition: Slide,
			});
		});
	}
}

function SearchPage() {
	const navigate = useNavigate(); // <-- initialize useNavigate

	const [matchingParts, setMatchingParts] = useState([]);
	const [searchTime, setSearchTime] = useState(null);

	const handleSearch = (query) => {
		if (!query) {
			setMatchingParts([]);
			return;
		}

		const startTime = performance.now();

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
			<button className={styles.backButton} onClick={() => navigate("/")}>
				<IoArrowBackCircle /> <span>Back to Home</span>
			</button>

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
								<span className={styles.line_label}>SNOW #:</span> {part.sevenElevenPartNumber}
							</p>
							<p>
								<span className={styles.line_label}>SPWY PMIC #:</span> {part.speedway_pmic}
							</p>
							<p>
								<span className={styles.line_label}>Manufacturer:</span> {part.manufacturer_num}
							</p>
							<div className={styles.manufacturerNumWrapper}>
								<p>
									<span className={styles.line_label}>Manufacturer #:</span> {part.part_num}
								</p>
								<GoogleSearchButton query={part.manufacturer_num + " " + part.part_num} />
								<FaCopy style={{ fontSize: "1.35rem" }} onClick={() => copyToClipboard(part.part_num)} />
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

export default SearchPage;
