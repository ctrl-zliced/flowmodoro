import React from 'react'
import ReactPlayer from 'react-player';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import { Button, TextField } from '@mui/material';

function YoutubeEmbed() {
  const [hideYoutube, setHideYoutube] = React.useState(false);
  const [youtubeInput, setYoutubeInput] = React.useState("");
  const [youtubePlaying, setYoutubePlaying] = React.useState(false);
  const screenWidth = window.innerWidth;
  const [youtubeLink, setYoutubeLink] = React.useState(
    "https://www.youtube.com/watch?v=lHpYyYtkmrw"
  );
  const handleYoutubeSubmit = () => {
    if (youtubeInput !== "" && youtubeInput !== youtubeLink) {
        setYoutubeLink(youtubeInput);
    } else {
        alert("Set a new link!");
    }
    }

    const getEmbedId = (youtubeLink: string) => {
        const embedId = youtubeLink.split("=")[1];
        if (embedId.includes("&")) {
            return embedId.split("&")[0];
        } else {
            return embedId;
        }
    }
    const embedId = getEmbedId(youtubeLink);
    
  return (
    <div
    className={`absolute scale-0 sm:scale-100 bottom-32 sm:top-6 sm:left-7 sm:w-3/12`}
>
<div className="absolute top-2 left-2 sm:hidden">
              {youtubePlaying ?
              <MusicNoteIcon color="primary" onClick={() => setYoutubePlaying(!youtubePlaying)} />
              :
              <MusicOffIcon color="primary" onClick={() => setYoutubePlaying(!youtubePlaying)}/>
              }
            </div>
    {!hideYoutube ? (
        <VisibilityIcon
            color="primary"
            onClick={() => setHideYoutube(!hideYoutube)}
            className={`sm:absolute sm:top-1 sm:left-1 ${hideYoutube}`}
        />
    ) : (
        <VisibilityOffIcon
            color="primary"
            onClick={() => setHideYoutube(!hideYoutube)}
            className={`sm:absolute sm:top-1 sm:left-1 ${hideYoutube}`}
        />
    )}
    <div
        className={`${
            hideYoutube ? "-translate-x-52 translate-y-52 scale-0" : ""
        } sm:absolute top-7 left-7 transition-all duration-500`}
    >
        <TextField
            label="Youtube"
            color="primary"
            size="small"
            className="w-full"
            variant="standard"
            placeholder="paste yt link here"
            onChange={(e) => setYoutubeInput(e.target.value)}
        />
        <Button
            onClick={() => handleYoutubeSubmit()}
            size="small"
            variant="text"
        >
            Submit
        </Button>

        {/* <YoutubeEmbed youtubeLink={youtubeLink} /> */}
        <div
        style={{
            height: screenWidth * 0.2 * (9 / 16),
            width: screenWidth * 0.2,
            transition: "none",
        }}
         className="shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-all duration-150">
            <ReactPlayer
                height={screenWidth * 0.2 * (9 / 16)}
                width={screenWidth * 0.2}
                url={youtubeLink}
                playing={youtubePlaying}
            />
        </div>
    </div>
</div>
  )
}

export default YoutubeEmbed