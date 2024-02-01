import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Weather from "./pages/weather/Weather";
import Btns from "./components/Btns";

function App() {
  return(
    <>
    <Router>
    <Btns/>
    <Routes>
        <Route index element={<Chat />} />
        <Route  path="/chat" element= { <Chat/>}/>
        <Route  path="/weather" element={ <Weather/>} />
    </Routes>
  </Router>
  </>
  )
}

export default App;