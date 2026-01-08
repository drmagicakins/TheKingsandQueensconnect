import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import QuestionDetail from "./pages/QuestionDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/questions/:id" element={<QuestionDetail />} />
    </Routes>
  );
}

export default App;
