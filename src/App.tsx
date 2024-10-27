import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import type { DropEvent } from "@mirohq/websdk-types";

const { board } = miro;

function App() {
  const images = [,
    "https://i.ibb.co/0Ys5hgt/zukunvt-Icons-6-blau.png",
    "https://i.ibb.co/BzCJkpF/zukunvt-Icons-3-blau.png",
    "https://i.ibb.co/JFdCdTW/zukunvt-Icons-5-blau.png",
    "https://i.ibb.co/sbckKDR/zukunvt-Icons-1-blau.png",
    "https://i.ibb.co/0CsK7d3/zukunvt-Icons-2-balu.png",
    "https://i.ibb.co/xjN5rS5/zukunvt-Icons-4-blau.png",
    "https://i.ibb.co/4WwJ2Yk/zukunvt-Icons-7-blau.png",
    "https://i.ibb.co/YZXCN3j/zukunvt-smiley-icon-blue.png",
    
  ];

  const drop = async (e: DropEvent) => {
    const { x, y, target } = e;

    if (target instanceof HTMLImageElement) {
      const image = await board.createImage({ x, y, url: target.src });
      await board.viewport.zoomTo(image);
    }
  };

  // Register the drop event handler once.
  useEffect(() => {
    board.ui.on("drop", drop);
  }, []);

  return (
    <div className="main">
      {images.map((image, index) => {
        return (
          <img
            src={image}
            draggable={false}
            className="miro-draggable draggable-item"
            key={index}
          />
        );
      })}
    </div>
  );
}

// Render App
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
