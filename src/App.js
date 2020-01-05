import React, { useState, useEffect } from "react";
import { Camera } from "./camera";
import { Root, Button, GlobalStyle } from "./styles";
import uploadToS3 from "./helpers/uploadToS3";
import "./App.css";

function App(props) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState(null);
  const [base64Img, setBase64Img] = useState("");
  const [status, setStatus] = useState("idle");

  const phoneNumber = props.previousStep.value;

  async function s3Upload() {
    try {
      setStatus("uploading");
      const s3Url = await uploadToS3(phoneNumber, "image/jpeg", base64Img);
      props.triggerNextStep({ value: s3Url });
      console.log(s3Url);
    } catch (error) {
      setStatus("failure");
      console.log(error);
    } finally {
      setStatus("complete");
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
        console.log(base64data);
      };
    }
  }, [cardImage]);

  function closeCamera() {
    setIsCameraOpen(false);
    setCardImage(undefined);
  }

  if (status === "complete") return <h2>Upload successful</h2>;
  return (
    <>
      <Root>
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
        {cardImage && (
          <Button onClick={s3Upload} disabled={status === "uploading"}>
            {status !== "uploading" ? "Submit" : "Uploading"}
          </Button>
        )}
      </Root>
      <GlobalStyle />
    </>
  );
}

export default App;
