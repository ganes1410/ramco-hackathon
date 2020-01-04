import React, { useState, useEffect } from "react";
import { Camera } from "./camera";
import { Root, Button, GlobalStyle, Input } from "./styles";
import uploadToS3 from "./helpers/uploadToS3";
import "./App.css";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState(null);
  const [details, setDetails] = useState({ name: "", phoneNum: "" });

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
        // s3Upload(base64data);
        console.log(base64data);
      };
    }
  }, [cardImage]);

  function handleChange(event) {
    setDetails({ ...details, [event.target.name]: event.target.value });
  }
  return (
    <>
      <Root>
        <h1>Your Details</h1>
        <Input
          type="name"
          name="name"
          onChange={handleChange}
          placeholder="Name"
        />
        <Input
          type="number"
          name="phoneNum"
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <h2>Upload Picture</h2>

        {isCameraOpen ? (
          <>
            <Button
              onClick={() => {
                setIsCameraOpen(false);
                setCardImage(undefined);
              }}
              style={{ marginBottom: 12 }}
            >
              Close Camera
            </Button>
            <Camera
              onCapture={blob => setCardImage(blob)}
              onClear={() => setCardImage(undefined)}
            />
          </>
        ) : (
          <Button onClick={() => setIsCameraOpen(true)}>Open Camera</Button>
        )}
        {/* Show SUbmit only when picture is taken */}
        {cardImage && <Button>Submit</Button>}
      </Root>
      <GlobalStyle />
    </>
  );
}

export default App;
