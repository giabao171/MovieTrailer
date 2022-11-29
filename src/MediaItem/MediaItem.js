import React from 'react';

const MediaItem = ({ videoKey }) => {
    return (
        <iframe
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Video trailer"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widgetid=1`}
            id="widget2"
            className="absolute top-0 left-0 !w-full !h-full"
        ></iframe>
    );
};

export default MediaItem;
