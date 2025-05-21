import { useNavigate } from "react-router-dom";
import resolutions from "../data/resolutions.json";
import styles from "./ResolutionPage.module.css";
import { IoArrowBackCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify/unstyled";
import { FaCopy } from "react-icons/fa";

function ResolutionNotesList() {
	const navigate = useNavigate();

	function copyResolutionText(text) {
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

			{Object.entries(resolutions).map(([key, { label, resolution }]) => (
				<div key={key} className={styles.resolutionContainer}>
					<div className={styles.titleWrapper}>
						<h3 className={styles.resolutionTitle}>{label}</h3>
						<FaCopy style={{ fontSize: "1.15rem" }} onClick={() => copyResolutionText(resolution)} />
					</div>
					<p className={styles.resolutionDescription}>{resolution}</p>
				</div>
			))}
		</div>
	);
}

export default ResolutionNotesList;
