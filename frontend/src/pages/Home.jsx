// src/pages/Home.jsx
import FeedList from '../components/FeedList';

/* <aside className="sidebar">

           </aside>  */

export default function Home() {

    return (
        <div className="layout">
            <main className="content">
                <FeedList />
            </main>
        </div>
    );
}