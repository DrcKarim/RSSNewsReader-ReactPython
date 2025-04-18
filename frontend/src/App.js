import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
//import FeedPage from './pages/FeedPage';
import Navbar from './components/Navbar';
// <Route path="/feed/:id" element={<FeedPage/>}/>

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>}/>

                </Routes>
            </div>
        </Router>
);
}

export default App;
