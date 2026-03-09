import "@fontsource/inter";
import "@fontsource/manrope";
import "@fontsource/ramabhadra";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Main from './pages/main.page';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element = {<Main/>}/>
        <Route path='/pack' element = {<p>pack</p>}/>
        <Route path='/store' element = {<p>packList</p>}/>
        
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
