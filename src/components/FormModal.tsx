import { useState } from "react";
import { VideoFormData } from "../types";
import "../styles/FormModal.css";

type FormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    initialValues?: {
        title?: string;
        description?: string;
        video_url?: string;
    };
    onSubmit: (data: VideoFormData) => Promise<void>;
}

export function FormModal({ isOpen, onClose, mode, initialValues, onSubmit }: FormModalProps) {
    const [title, setTitle] = useState(initialValues?.title || "");
    const [description, setDescription] = useState(initialValues?.description || "");
    const [videoUrl, setVideoURL] = useState(initialValues?.video_url || "");
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await onSubmit({ title, description, video_url:videoUrl});
        setTitle("");
        setDescription("");
        setVideoURL("");
        onClose();
    }

    if(!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                
                <h2>{mode === "add" ? "Add Video" : "Edit Video"}</h2>
                <form className="video-form" onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required/>
                    <label>Description</label>
                    <input type="textarea" value={description} onChange={(event) => setDescription(event.target.value)} required/>
                    <label>Video URL</label>
                    <input type="text" value={videoUrl} onChange={(event) => setVideoURL(event.target.value)} required/>
                    <div className="video-form-buttons">
                        <button type="submit" className="submit-button">{mode === "add" ? "Add Video" : "Update Video"}</button>
                        <button className="video-form-close-button" onClick={onClose}>Close</button>
                    </div>

                </form>
            </div>  
        </div>
    )
}

export default FormModal;