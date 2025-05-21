import { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";

function CopyButton({ text }) {
	const [copied, setCopied] = useState(false);

	const copyToClipboard = (text) => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).then(() => {
				setCopied(true);
			});
		}
	};

	useEffect(() => {
		if (copied) {
			const timer = setTimeout(() => setCopied(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [copied]);

	return <div>{copied ? <span style={{ color: "green", fontStyle: "italic" }}>Copied!</span> : <FaCopy style={{ color: "#fff" }} onClick={() => copyToClipboard(text)} />}</div>;
}

export default CopyButton;
