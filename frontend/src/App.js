import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <div className="layout">  {/* 🔧 Add this wrapper */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
