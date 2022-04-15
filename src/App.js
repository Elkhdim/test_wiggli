import Home from "./components/Home";
import Type from "./components/Type";
import ViewPokemon from "./components/ViewPokemon";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";
function App() {
  return (
   
         
   
    
      <div className="container">
     <Header />
      <div className="body">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewPokemon/:name" element={<ViewPokemon />} />
          <Route path="/type/:id" element={<Type />} />
        </Routes>
        
      </div>
      <Footer />
      </div>
      
        
    

  );
}

export default App;
