import React, { useState, useEffect } from "react";
import { Camera } from "./camera";
import { Root, Footer, GlobalStyle } from "./styles";
import uploadToS3 from "./helpers/uploadToS3";
import "./App.css";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState(null);

  async function s3Upload(base64) {
    try {
      const s3Url = await uploadToS3("", "image/jpeg", base64);
      console.log(s3Url);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (cardImage) {
      console.log("c", cardImage);
      const reader = new FileReader();
      reader.readAsDataURL(cardImage);
      reader.onloadend = function() {
        const base64data = reader.result;
        s3Upload(base64data);
        console.log(base64data);
      };
    }
  }, [cardImage]);

  return (
    <>
      <Root>
        {isCameraOpen && (
          <Camera
            onCapture={blob => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
          />
        )}

        <Footer>
          <button onClick={() => setIsCameraOpen(true)}>Open Camera</button>
          <button
            onClick={() => {
              setIsCameraOpen(false);
              setCardImage(undefined);
            }}
          >
            Close Camera
          </button>
        </Footer>
      </Root>
      <GlobalStyle />
    </>
  );
}

export default App;
