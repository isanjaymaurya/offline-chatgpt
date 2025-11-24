import { Route, Routes, BrowserRouter, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';

import ChatPage from './pages/ChatPage/ChatPage';
import Page404 from './pages/Page404/Page404';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/chat" replace />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/chat/:chatId" element={<ChatPage />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;