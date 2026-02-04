import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Explorer from './pages/Explorer';
import CramMode from './components/CramMode';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/explorer/preview/root/0" replace />} />
        <Route path="/:mode/:type/:id" element={<Explorer />} />
        <Route path="/explorer/:mode/:type/:id" element={<Explorer />}/>
        <Route path="/explorer/:mode/:type/:id/card/:cardId" element={<Explorer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
