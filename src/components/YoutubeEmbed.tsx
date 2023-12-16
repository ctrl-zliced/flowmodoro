import React from 'react'

function YoutubeEmbed({ youtubeLink }: { youtubeLink: string }) {
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
    <div className="video-responsive mt-2 rounded-lg shadow-lg hover:scale-105">
    <iframe
      width="200"
      height="100"
      src={`https://www.youtube.com/embed/${embedId};controls=`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
  )
}

export default YoutubeEmbed