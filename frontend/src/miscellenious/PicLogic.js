import React, { useState } from "react";
import { FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";

const UploadPicture = ({ setPicLoading, color, setPic }) => {
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setPicLoading(true);

    if (!file) {
      setPicLoading(false);
      return;
    }

    if (file.type === "image/jpeg" || file.type === "image/png") {
      let data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "WorldSamma");
      fetch("https://api.cloudinary.com/v1_1/dsdlgmgwi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          setPicLoading(false);
        });
    } else {
      setPicLoading(false);

      toast({
        title: "Invalid file type",
        status: "warning",
      });
    }
  };

  return (
    <FormControl id="pic">
      <FormLabel textColor={color} fontSize="small">Upload your Passport Photo</FormLabel>
      <Input
        type="file"
        p={1.5}
        textColor={color}
        fontSize="small"
        placeholder="Select a passport photo"
        accept="image/*"
        onChange={handleFileChange}
      />
    </FormControl>
  );
};

export default UploadPicture;
