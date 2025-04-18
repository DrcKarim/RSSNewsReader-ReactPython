import { useState } from 'react';
import './AddFeedForm.css';
import { addFeed } from '../services/api';

export default function AddFeedForm({ onAdd }) {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url.trim()) return;
        onAdd(url.trim());
        setUrl('');
    };

    return (
        <form className="add-feed-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add feed..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit">＋</button>
        </form>
    );
}