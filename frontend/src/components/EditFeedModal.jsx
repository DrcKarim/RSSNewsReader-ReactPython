import React, { useState, useEffect } from 'react';
import './EditFeedModal.css';

export default function EditFeedModal({ feed, onSave, onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (feed) {
            setTitle(feed.title);
            setDescription(feed.description || '');
        }
    }, [feed]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, description });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h3>Edit Feed</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        rows={4}
                    />
                    <div className="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

