import React, { useState, useEffect } from "react";
import { Camera } from "./camera";
import { Root, Button, GlobalStyle } from "./styles";
import uploadToS3 from "./helpers/uploadToS3";
import "./App.css";
import updateDB from "./helpers/uploadToDb";

function App({
  recognizeBucket = false,
  previousStep,
  triggerNextStep = () => {}
}) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState(null);
  const [base64Img, setBase64Img] = useState("");
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState("idle");

  const phoneNumber = previousStep ? previousStep.value : "";

  const paramPhone = (details && details.phone) || `${new Date().getTime()}`;

  async function s3Upload() {
    try {
      setStatus("uploading");
      const s3Url = await uploadToS3(
        phoneNumber ? phoneNumber : paramPhone,
        "image/jpeg",
        base64Img,
        recognizeBucket ? "hackathonramcocompare" : 0
      );
      triggerNextStep({ value: s3Url });
      console.log(s3Url);
      if (recognizeBucket && details.name && details.phone) {
        updateDB([details.name, details.phone]);
      }
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

  useEffect(() => {
    const url = new URL(window.location);
    const name = url.searchParams.get("name");
    const phone = url.searchParams.get("phone");
    console.log(name, phone);
    setDetails({ name, phone });
  }, []);

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
