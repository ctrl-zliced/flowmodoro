import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import {MorphReplace} from 'react-svg-morph';

import React, { useEffect } from "react";
import {
    Grid,
    Typography as Text,
    Fab,
    useTheme,
    TextField,
    Button,
} from "@mui/material";

import { useDebounce } from "usehooks-ts";
// import Stats from './components/Stats';
import Stopwatch from "./components/Stopwatch";
import PaletteIcon from "@mui/icons-material/Palette";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import YoutubeEmbed from "./components/YoutubeEmbed";
import waveSvg from "./components/waveSvg";
import waveSvg2 from "./components/waveSvg2";

function Hello() {
    const [time, setTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const [breakTime, setBreakTime] = React.useState(0);
    const [isBreak, setIsBreak] = React.useState(false);
    const [backgrounds, setBackgrounds] = React.useState([
        "bg-bebi",
        "bg-1",
        "bg-2",
    ]);
    const [background, setBackground] = React.useState(0);
    const theme = useTheme();
    const [themeButtonDisabled, setThemeButtonDisabled] = React.useState(false);
    const [isResizing, setIsResizing] = React.useState("");
    const debouncedValue = useDebounce(isResizing, 1000);

    const [hideYoutube, setHideYoutube] = React.useState(false);
    const [youtubeLink, setYoutubeLink] = React.useState("https://www.youtube.com/watch?v=lHpYyYtkmrw");
    const [youtubeInput, setYoutubeInput] = React.useState("");

    const handleYoutubeSubmit = () => {
      if (youtubeInput !== "" && youtubeInput !== youtubeLink) {
        setYoutubeLink(youtubeInput);
      } else {
        alert("Set a new link!");
      }
    }

    const handleBackgroundChange = async () => {
        // Disable button to prevent multiple clicks
        setThemeButtonDisabled(true);

        if (background < backgrounds.length - 1) {
            setBackground(background + 1);
        } else {
            setBackground(0);
        }

        // Add a delay of 1 second
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Re-enable button
        // button.disabled = false;o
        setThemeButtonDisabled(false);
    };

    useEffect(() => {
        console.log("resizing");
        setIsResizing("resize-animation-stopper");
    }, [debouncedValue]);

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     handleBackgroundChange();
    //   }, 1000);
    //   // clearInterval(interval);
    //   return () => clearInterval(interval);
    // }, [background]);

    return (
        // root container
        <div
            className={`${isResizing} h-screen w-screen p-10 flex justify-center items-start drag
      ${backgrounds[background]}`}
        >
            <Grid
                className="drag"
                style={{ maxWidth: 350, maxHeight: 72 }}
                container
                spacing={2}
            >
                {/* stopwatch title */}
                <Grid item xs={12}>
                    <Text variant="subtitle2" textAlign={"center"}>
                        {isRunning
                            ? "🌊 Flowing..."
                            : isBreak
                            ? "Recharging... 🔋"
                            : "🐳"}
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
            </Grid>
            <div
                className={`${
                    hideYoutube ? "hidden" : ""
                } absolute top-6 left-7 w-3/12`}
            >
              <TextField
                    label="Youtube"
                    size="small"
                    className="w-full"
                    variant="standard"
                    placeholder="paste yt link here"
                    onChange={(e) => setYoutubeInput(e.target.value)}
                />
                <Button onClick={() => handleYoutubeSubmit()} size="small" variant="text">
                    Submit
                </Button>
                
                <YoutubeEmbed youtubeLink={youtubeLink} />
            </div>
            {!hideYoutube ? (
                <VisibilityIcon
                    color="primary"
                    onClick={() => setHideYoutube(!hideYoutube)}
                    className={`absolute top-1 left-1 ${hideYoutube}`}
                />
            ) : (
                <VisibilityOffIcon
                    color="primary"
                    onClick={() => setHideYoutube(!hideYoutube)}
                    className={`absolute top-1 left-1 ${hideYoutube}`}
                />
            )}
        </div>
    );
}

export default function App() {
    return <Hello />;
}
