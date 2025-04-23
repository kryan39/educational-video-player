import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { Video, VideoFormData } from "../types";
import { getVideos, createVideos } from "../services/videoService";
import { USER_ID } from "../constants";
import { FormModal } from "../components/FormModal";
import { VideoCard } from "../components/VideoCard";
import { SelectedVideoModal } from "../components/SelectedVideoModal";
import "../styles/HomePage.css";

export function HomePage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    useEffect(() => {
        getVideos(USER_ID)
            .then((data) => {
                // Initialize comments as an empty array for each video
                const videosWithComments = data.map((video) => ({
                    ...video,
                    comments: video.comments || [], 
                }));
                setVideos(videosWithComments);
            })
            .catch((err) => {
                setError(err.message);
                setVideos([]); // Ensure videos is always an array
            });
    }, []);

    // generating a id for the video so that comments can be associated with the video
    const handleAddVideo = async (data: VideoFormData) => {
        try {
    
            // Generate a unique ID for the video
            const videoId = uuidv4();
    
            // Add the video with the generated ID and User ID
            await createVideos({ ...data, user_id: USER_ID, id: videoId });
    
            // Update the state locally by appending the new video
            setVideos((prevVideos) => [
                ...prevVideos,
                { ...data, user_id: USER_ID, id: videoId }, // Add the new video
            ]);
    
            setModalOpen(false);
        } catch (error) {
            console.error("Failed to create video", error);
        }
    };

    //Converts a YouTube video URL into an embeddable URL format.
    function toEmbeddableUrl(url: string): string {
        if (url.includes('youtube.com/watch')) {
            const match = url.match(/v=([^&]+)/);
            const videoId = match?.[1];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        }
        return url;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Discover Educational Videos</h1>
                <button className="add-video-button" onClick={() => setModalOpen(true)}>
                    Add Video
                </button>
            </header>
            <div className="video-grid">
                {videos.length === 0 ? (
                    <div className="empty-videos">
                        <p>No videos found</p>
                    </div>
                ) : (
                    videos.map((video, index) => (
                        <VideoCard
                            key={index}
                            video={video}
                            setSelectedVideo={setSelectedVideo}
                        />
                    ))
                )}
            </div>
            {selectedVideo && (
                <SelectedVideoModal
                    selectedVideo={selectedVideo}
                    onBack={() => setSelectedVideo(null)}
                    toEmbeddableUrl={toEmbeddableUrl}
                />
            )}
            <FormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                mode="add"
                onSubmit={handleAddVideo}
            />
        </div>
    );
}

export default HomePage;