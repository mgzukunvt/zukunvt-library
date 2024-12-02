import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Input from "./components/input";

import type { DropEvent } from "@mirohq/websdk-types";

const { board } = miro;

function App() {
  const [inputValue, setInputValue] = useState("");
  const images = [
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/3bf675f6-b0e2-4d00-9820-44e1284f9ae7/ZK_buttons_blue_2.png?content-type=image%2Fpng",
      name: "button blue 2",
      tags: ["button", "blue"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/9999c3db-feee-430e-83df-508296bdf474/ZK_buttons_blue_1.png?content-type=image%2Fpng",
      name: "button blue 1",
      tags: ["button", "blue"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/1845281c-864d-4238-bf44-a42acadbc55c/ZK_buttons_blue_4.png?content-type=image%2Fpng",
      name: "button blue 4",
      tags: ["button", "blue"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c1bd6206-8f37-44c9-96d7-3cc4bbffec27/ZK_buttons_blue_3.png?content-type=image%2Fpng",
      name: "button blue 3",
      tags: ["button", "blue"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/8643700c-9fc1-4a5a-af91-49e92f9eb10e/ZK_buttons_black_1.png?content-type=image%2Fpng",
      name: "button black 1",
      tags: ["button", "black"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e67068be-6087-482d-9146-846435638dec/ZK_buttons_black_4.png?content-type=image%2Fpng",
      name: "button black 4",
      tags: ["button", "black"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/93708295-92fc-4a44-a61d-45787f4d905d/ZK_buttons_black_2.png?content-type=image%2Fpng",
      name: "button black 2",
      tags: ["button", "black"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/423bab44-cc90-40eb-8e61-1f68d0d1917b/ZK_buttons_black_3.png?content-type=image%2Fpng",
      name: "button black 3",
      tags: ["button", "black"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/90c6980f-2eb3-4632-839c-a3259a675c49/ZK_illustrations_black-03.png?content-type=image%2Fpng",
      name: "illustration black 03",
      tags: ["illustration", "black"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/02544027-1e2a-40ac-ac89-69d154aaede5/ZK_illustrations_black-02.png?content-type=image%2Fpng",
      name: "illustration black 02",
      tags: ["illustration", "black"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/7c788f61-0193-4d6a-bef5-d2cc213ef5bd/ZK_illustrations_black-01.png?content-type=image%2Fpng",
      name: "illustration black 01",
      tags: ["illustration", "black"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/39f15ad7-7d6c-434b-82f8-f6cddb60af40/ZK_illustrations_blue-02.png?content-type=image%2Fpng",
      name: "illustration blue 02",
      tags: ["illustration", "blue"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d49b08bf-a27a-4afc-a38f-39b6404bdcde/ZK_illustrations_blue-03.png?content-type=image%2Fpng",
      name: "illustration blue 03",
      tags: ["illustration", "blue"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e4d449e6-1f03-471c-b834-ddaa1dc4cbd5/ZK_illustrations_blue-01.png?content-type=image%2Fpng",
      name: "illustration blue 01",
      tags: ["illustration", "blue"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/0bdc4e9d-73be-4aa6-a063-87706014b994/ZK_icon_special_black_1.png?content-type=image%2Fpng",
      name: "special icon black 1",
      tags: ["icon", "special", "black"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/ece40914-17a4-4a22-af8a-6b87ed109663/ZK_icon_special_black_2.png?content-type=image/png",
      name: "special icon black 2",
      tags: ["icon", "special", "black"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d58f39c8-4cad-4905-a88a-75a5308e0674/ZK_icon_special_black_3.png?content-type=image/png",
      name: "special icon black 3",
      tags: ["icon", "special", "black"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c6c4f566-5c72-4aff-ba9c-8666fbfc4c45/icon_special_blue_2.png?content-type=image%2Fpng",
      name: "special icon blue 2",
      tags: ["icon", "special", "blue"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4bd9d033-2c98-49ea-a748-4c7467eade50/icon_special_blue_1.png?content-type=image/png",
      name: "special icon blue 1",
      tags: ["icon", "special", "blue"],
    },
    {
      url: "https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/78e79844-521d-401e-84a4-64870129c0f8/icon_special_blue_3.png?content-type=image%2Fpng",
      name: "special icon blue 3",
      tags: ["icon", "special", "blue"],
    },
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
      <Input handleInputChange={(value) => setInputValue(value)} />
      {images
        .filter((o) => {
          return (
            o["name"].toLowerCase().includes(inputValue.toLowerCase()) ||
            o["tags"].some((value) => {
              return value.includes(inputValue.toLowerCase());
            })
          );
        })
        .map((image, index) => {
          return (
            <img
              src={image.url}
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
  document.getElementById("root")
);
