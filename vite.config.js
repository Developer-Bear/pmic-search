import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	base: "./", // 👈 this is the important part
	plugins: [react()],
	build: {
		outDir: "dist", // default, but good to be explicit
	},
});
