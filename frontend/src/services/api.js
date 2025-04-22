// src/services/api.js
/*
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api', // adjust for your Django backend
});

export const getFeeds = () => API.get('/feeds/');
export const getFeedItems = (id) => API.get(`/feeds/${id}/items/`);

 */

// src/services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/', // change if using different port
});

// GET all feeds
export const getFeeds = () => API.get('/feeds');

// GET items for a feed
export const getFeedItems = (id) => API.get(`/items/?feed=${id}`);

// POST new feed URL
export const addFeed = (url) => API.post('/feeds/', { url });

// PATCH a feed
export const updateFeed = (id, data) => API.patch(`/feeds/${id}`, data);

// DELETE a feed
export const deleteFeed = (id) => API.delete(`/feeds/${id}/`);

// REFRESH a feed
export const refreshFeed = (id) => API.post(`/feeds/${id}/refresh/`);