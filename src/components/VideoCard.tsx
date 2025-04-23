import { Video } from '../types';
import "../styles/VideoCard.css";

type VideoCardProps = {
  video: Video;
  setSelectedVideo: (video: Video | null) => void;
};
function toEmbeddableUrl(url: string): string {
    if (url.includes('youtube.com/watch')) {
      const match = url.match(/v=([^&]+)/);
      const videoId = match?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
  
    // Add more rules here for Vimeo, etc. if needed
    return url;
    
  }
export function VideoCard({ video, setSelectedVideo }: VideoCardProps) {
    return (
        <div className="video-card" onClick={() => setSelectedVideo(video)}>
            <div className="video-card-thumbnail" role="button">
                <iframe
                    className="video-card-iframe"
                    src={toEmbeddableUrl(video.video_url)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="video-card-info">
                <h3 className="video-card-title">{video.title}</h3>
                <p className="video-card-description">{video.description}</p>
            </div>
        </div>
    );
}
export default VideoCard;