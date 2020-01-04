import React, { useState, useEffect } from "react";
import { Camera } from "./camera";
import { Root, Button, GlobalStyle, Input } from "./styles";
import uploadToS3 from "./helpers/uploadToS3";
import "./App.css";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState(null);
  const [details, setDetails] = useState({ name: "", phoneNum: "" });
  const [base64Img, setBase64Img] = useState("");

  async function s3Upload() {
    try {
      const s3Url = await uploadToS3("", "image/jpeg", base64Img);
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
        setBase64Img(base64data);
        // s3Upload(base64data);
        console.log(base64data);
      };
    }
  }, [cardImage]);

  function handleChange(event) {
    setDetails({ ...details, [event.target.name]: event.target.value });
  }

  function closeCamera() {
    setIsCameraOpen(false);
    setCardImage(undefined);
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
            <Button onClick={closeCamera} style={{ marginBottom: 12 }}>
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
        {cardImage && <Button onClick={s3Upload}>Submit</Button>}
      </Root>
      <GlobalStyle />
    </>
  );
}

export default App;
