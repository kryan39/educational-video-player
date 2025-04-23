import { Video } from "../types";
import { CommentSection } from "../components/CommentSection";
import "../styles/SelectedVideoModal.css";

interface SelectedVideoProps {
    selectedVideo: Video;
    onBack: () => void;
    toEmbeddableUrl: (url: string) => string;
}

export function SelectedVideoModal({ selectedVideo, onBack, toEmbeddableUrl }: SelectedVideoProps) {
    return (
        <div className="selected-video-overlay">
            <div className="selected-video-container">
                <button className="selected-video-back-button" onClick={onBack}>X</button>
                <div className="selected-video-content">
                    <h2>{selectedVideo.title}</h2>
                    <iframe
                        className="selected-video-iframe"
                        src={toEmbeddableUrl(selectedVideo.video_url)}
                        title={selectedVideo.title}
                        allowFullScreen
                        width="100%"
                        height="400px"
                    />
                    <p className="selected-video-description">{selectedVideo.description}</p>
                </div>
                <div className="selected-video-comments">
                    <CommentSection videoId={selectedVideo.id} />
                </div>
            </div>
        </div>
    );
};

export default SelectedVideoModal;
