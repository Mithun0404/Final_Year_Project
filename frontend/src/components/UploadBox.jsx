import { useState } from "react";
import axios from "axios";

import "../styles/UploadBox.css";
import ResultCard from "./ResultCard";

export default function UploadBox() {

    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        setFile(selectedFile);
        setImage(URL.createObjectURL(selectedFile));
        setResult(null);
    }

    async function predict() {

        if (!file) {
            alert("Please upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            setLoading(true);

            const response = await axios.post(
                "http://127.0.0.1:8000/predict",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setResult(response.data);

        } catch (error) {

            console.error(error);

            alert("Prediction failed.");

        } finally {

            setLoading(false);

        }

    }

    return (
    <div className="upload-container">

        <label className="upload-box">

            <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleChange}
            />

            {!image ? (

                <>

                    <div className="upload-icon">☁️</div>

                    <h2>Upload Mango Leaf Image</h2>

                    <p>
                        Drag & Drop an image here or click to browse
                    </p>

                    <span>Supports JPG, PNG, JPEG</span>

                </>

            ) : (

                <>

                    <img
                        src={image}
                        alt="Preview"
                        className="preview-image"
                    />

                    <div className="image-status">

                        ✅ Image loaded successfully

                    </div>

                </>

            )}

        </label>

        <button
            className="predict-btn"
            onClick={predict}
            disabled={loading}
        >
            {loading ? "Predicting..." : "🌿 Predict Disease"}
        </button>

        <ResultCard result={result}/>

    </div>
);
}