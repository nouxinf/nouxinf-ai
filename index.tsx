import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";

function App() {
	return <text>Hello</text>;
}

const renderer = await createCliRenderer({ exitOnCtrlC: true });
createRoot(renderer).render(<App />);
