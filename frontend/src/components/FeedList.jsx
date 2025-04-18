// src/components/FeedList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddFeedForm from './AddFeedForm';
import {getFeedItems, getFeeds} from "../services/api";
import { addFeed } from '../services/api';
import './FeedList.css';

export default function FeedList() {
    const [feeds, setFeeds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getFeeds().then((res) => setFeeds(res.data));
    }, []);

    const handleSelectFeed = (feed) => {
        setSelectedFeed(feed);
        getFeedItems(feed.id)
            .then((res) => setItems(res.data.items))
            .catch((err) => {
                console.error('Error loading items:', err);
                setItems([]);
            });
    };

    const filteredFeeds = feeds.filter((feed) =>
        feed.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddFeed = async (url) => {
        try {
            const res = await addFeed(url);
            const newFeed = res.data.feed;
            // Refresh feed list
            const updatedFeeds = await getFeeds();
            setFeeds(updatedFeeds.data);
            // Optionally auto-select the new feed
            handleSelectFeed(newFeed);
        } catch (err) {
            console.error('Failed to add feed:', err);
            alert('Invalid or unreachable RSS feed.');
        }
    };
    /*  <div style={{width: '280px', padding: '10px', overflowY: 'auto'}}> */
    return (
        <div style={{display: 'flex', height: 'calc(100vh - 60px)'}}>
            {/* Sidebar */}
            <div className="sidebar">
                <AddFeedForm onAdd={handleAddFeed}/>
                <input
                    type="text"
                    placeholder="Search feeds..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <ul className="feed-list">
                    {filteredFeeds.map((feed) => (
                        <li
                            key={feed.id}
                            className={`feed-item ${selectedFeed?.id === feed.id ? 'active' : ''}`}
                            onClick={() => handleSelectFeed(feed)}
                        >
                            {feed.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Feed content */}
            <div style={{flex: 1, padding: '20px', overflowY: 'auto'}}>
                <h2>{selectedFeed?.title}</h2>
                {items.length === 0 && <p>No items found or loading...</p>}
                {items.map((item) => (
                    <div key={item.id} style={{marginBottom: '20px'}}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <h3>{item.title}</h3>
                        </a>
                        <p>{item.description}</p>
                        <small>{new Date(item.pubDate).toLocaleString()}</small>
                        <hr/>
                    </div>
                ))}
            </div>
        </div>
    );
}