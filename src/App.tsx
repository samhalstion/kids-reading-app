import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { MapScreen } from "./screens/MapScreen";
import { LessonScreen } from "./screens/LessonScreen";
import { CollectionScreen } from "./screens/CollectionScreen";
import { ParentScreen } from "./screens/ParentScreen";
import { primeSpeech } from "./lib/speech";
import { useProgress } from "./store/progress";

export default function App() {
  const dyslexic = useProgress((s) => s.settings.dyslexicFont);

  // Unlock Web Speech on the first user gesture (required by mobile Safari).
  useEffect(() => {
    const onFirst = () => {
      primeSpeech();
      window.removeEventListener("pointerdown", onFirst);
    };
    window.addEventListener("pointerdown", onFirst);
    return () => window.removeEventListener("pointerdown", onFirst);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-purple-100 via-indigo-50 to-white ${
        dyslexic ? "font-dyslexic" : "font-reader"
      }`}
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/lesson/:lessonId" element={<LessonScreen />} />
          <Route path="/collection" element={<CollectionScreen />} />
          <Route path="/parent" element={<ParentScreen />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
