import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function Home() {
	return (
		<div className={styles.container}>
			<h1>Welcome to the PMIC Lookup Tool</h1>
			<div className={styles.linksContainer}>
				<Link to="/search">
					<button className={styles.navButton}>Search for a Part</button>
				</Link>
				<Link to="/resolutions">
					<button className={styles.navButton}>Resolution Database</button>
				</Link>
			</div>
		</div>
	);
}

export default Home;
