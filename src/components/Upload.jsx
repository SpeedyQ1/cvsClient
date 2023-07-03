import React from "react";
import { useEffect, useState, useRef } from "react";

const Upload = ({ setImageURL }) => {
  const cloud = useRef();
  const widget = useRef();
  useEffect(() => {
    cloud.current = window.cloudinary;
    widget.current = cloud.current.createUploadWidget(
      {
        cloudName: "dh9vg4uni",
        uploadPreset: "yt1kc7xd",
      },
      function (err, results) {
        if (!err && results && results.event == "success") {
          setImageURL(results.info.url);
        }
      }
    );
  }, []);

  return (
    <button
      className="upload-img-btn"
      type="button"
      onClick={() => widget.current.open()}
    >
      upload your image
    </button>
  );
};

export default Upload;
