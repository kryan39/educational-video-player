import { useState } from 'react';
import { getComments, addComment } from '../services/commentService';
import '../styles/CommentSection.css';

type Props = {
    videoId: string;
};

export function CommentSection({ videoId }: Props) {
    const [userId, setUserId] = useState('');
    const [comments, setComments] = useState(() => getComments(videoId));
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        const newComment = addComment(videoId, text, userId);
        setComments((prev) => [newComment, ...prev]);
        setText('');
        setUserId('');
    };

    return (
        <div className="comments-container">
            
            <h3>Comments</h3>
            <div className="comment-section">
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <ul>
                        {comments.map((c) => (
                            <li key={c.id} className="comment-item">
                                <div className="comment-text">{c.text}</div>
                                <div className="comment-meta">
                                    {c.user_id} • {new Date(c.timestamp).toLocaleString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <form className="comment-form" onSubmit={handleSubmit}>
                <input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your name or user_id"
                    className="comment-input"
                    required
                />
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                    className="comment-input"
                    required
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default CommentSection;
