import React from "react";
import { useDropzone } from "react-dropzone";
import "../../css/dropBox.css";

const Dropzone = ({ onDrop, accept }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });

  return (
    <div {...getRootProps()}>
      <input  {...getInputProps()} />
      <div className="dropBox">
        {isDragActive ? (
          <p>Release to drop the files here</p>
        ) : (
          <h1>
            Drop your images here 
          </h1>
        )}
      </div>
    </div>
  );
};

export default Dropzone;