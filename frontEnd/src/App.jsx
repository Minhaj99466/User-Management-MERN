import { BrowserRouter,Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes'




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/*' element={<UserRoutes/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}