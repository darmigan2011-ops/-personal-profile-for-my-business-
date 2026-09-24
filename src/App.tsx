import React from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-ink text-white font-body overflow-x-hidden">
      <BackgroundVideo />
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
