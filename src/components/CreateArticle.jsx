import React, { useState } from "react";
import axios from "axios";
import WritingForm from "./WritingForm";
import { Container, Image } from "semantic-ui-react";
import createHeaders from "../modules/headers";

const CreateArticle = () => {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmitHandler = async (e) => {
    try {
      e.persist();
      const category = document
        .getElementById("category")
        .firstElementChild.innerText.toLowerCase();
      let encodedImage;
      if (e.target.image.files[0]) {
        encodedImage = await toBase64(e.target.image.files[0]);
      }
      const response = await axios.post(
        "/articles",
        {
          title: e.target.title.value,
          body: e.target.body.value,
          image: encodedImage,
          category: category,
        },
        { headers: createHeaders() }
      );
      e.target.reset()
      setImagePreview("")
      setMessage(response.data.message);
      setTimeout(() => {setMessage("")}, 3000)
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <Container className="writing-container">
        <WritingForm
          onSubmitHandler={onSubmitHandler}
          handleUploadChange={handleUploadChange}
          message={message}
        />
      </Container>
      <Container className="writing-container">
        {imagePreview === "" ? null : (
          <>
            <p>Image Preview</p>
            <Image
              id="preview-image"
              style={{ display: "inline" }}
              src={imagePreview}
              alt="PreviewImage"
            />
          </>
        )}
      </Container>
    </>
  );
};

export default CreateArticle;
