import React, { useState, useEffect } from "react";
import { render, Text, Box, useStdout, useInput, useApp } from "ink";

const useTerminalSize = () => {
	const { stdout } = useStdout();
	const tty = stdout as NodeJS.WriteStream;
	const [size, setSize] = useState({
		columns: tty.columns,
		rows: tty.rows,
	});
	useEffect(() => {
		const onResize = () =>
			setSize({ columns: tty.columns, rows: tty.rows });
		stdout.on("resize", onResize);
		return () => {
			stdout.off("resize", onResize);
		};
	}, [stdout]);

	return size;
};

const App = () => {
	const { columns, rows } = useTerminalSize();
	const { exit } = useApp();

	useInput((input) => {
		if (input === "q") exit();
	});

	return (
		<Box
			width={columns}
			height={rows}
			justifyContent="center"
			alignItems="center"
		>
			<Text color="green" bold>
				Centred Text
			</Text>
		</Box>
	);
};

// enter alternate screen, restore on exit
process.stdout.write("\x1b[?1049h");
const { waitUntilExit } = render(<App />);
await waitUntilExit();
process.stdout.write("\x1b[?1049l");
