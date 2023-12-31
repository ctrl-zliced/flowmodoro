import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import {
    Grid,
    Typography as Text,
    Fab,
    useTheme,
} from "@mui/material";

import Stopwatch from "./components/Stopwatch";
import PaletteIcon from "@mui/icons-material/Palette";
import { BarChart } from "@mui/icons-material";

function Hello() {
    const [time, setTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const [breakTime, setBreakTime] = React.useState(0);
    const [isBreak, setIsBreak] = React.useState(false);
    const backgrounds = ["bg-bebi", "bg-1", "bg-2"];
    const [background, setBackground] = React.useState(0);
    const theme = useTheme();
    const [themeButtonDisabled, setThemeButtonDisabled] = React.useState(false);
    const [showStats, setShowStats] = React.useState(false);

    const handleBackgroundChange = async () => {
        // Disable button to prevent multiple clicks
        setThemeButtonDisabled(true);

        if (background < backgrounds.length - 1) {
            setBackground(background + 1);
        } else {
            setBackground(0);
        }

        // Add a delay of 1 second
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Re-enable button
        // button.disabled = false;o
        setThemeButtonDisabled(false);
    };

    return (
        // root container
        <div
            className={`h-screen w-screen p-10 flex justify-center items-start drag
            ${backgrounds[background]}
      `}
        >
            <Grid
                className="drag"
                style={{ maxWidth: 350, maxHeight: 72 }}
                container
                spacing={2}
            >
                {/* stopwatch title */}
                <Grid item xs={12}>
                    <Text
                        color="white"
                        variant="subtitle2"
                        textAlign={"center"}
                    >
                        {isRunning ? "🌊" : isBreak ? "🔋" : "🐳"}
                    </Text>
                </Grid>

                {/* max size of stopwatch: 320*72 */}
                {/* stopwatch */}
                <Grid item xs={12}>
                    <Stopwatch
                        time={time}
                        setTime={setTime}
                        isRunning={isRunning}
                        setIsRunning={setIsRunning}
                        isBreak={isBreak}
                        setIsBreak={setIsBreak}
                        breakTime={breakTime}
                        setBreakTime={setBreakTime}
                        showStats={showStats}
                        setShowStats={setShowStats}
                    />
                </Grid>

                <Grid item xs={8}>
                    {/* <Stats /> */}
                </Grid>
                <Grid item xs={8}></Grid>
                <Fab
                    disabled={themeButtonDisabled}
                    onClick={() => handleBackgroundChange()}
                    size="small"
                    style={{
                        position: "fixed",
                        top: 20,
                        right: 20,
                        color: "white",
                        backgroundColor: theme.palette.secondary.main,
                    }}
                >
                    <PaletteIcon />
                </Fab>
                <Fab
                    disabled={themeButtonDisabled}
                    onClick={() => setShowStats(!showStats)}
                    size="small"
                    style={{
                        position: "fixed",
                        top: 70,
                        right: 20,
                        color: "white",
                        backgroundColor: showStats ? theme.palette.secondary.main : theme.palette.grey[800],
                    }}
                >
                    <BarChart />
                </Fab>
            </Grid>
        </div>
    );
}

export default function App() {
    return <Hello />;
}
