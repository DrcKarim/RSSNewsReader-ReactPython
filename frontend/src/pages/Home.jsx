// src/pages/Home.jsx
import FeedList from '../components/FeedList';

/* <aside className="sidebar">

           </aside>  */

export default function Home() {
    return (
        <div style={{ display: 'flex', flex: 1 }}>
            <FeedList />
        </div>
    );
}