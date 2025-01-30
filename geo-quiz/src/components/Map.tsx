import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import { countriesAndCapitals } from "../data/countries"; // Import data

export default function Home() {
  const [answer, setAnswer] = useState<string>(""); // User's answer
  const [question, setQuestion] = useState<string>(""); // Current question (country name)
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    51.505, -0.09,
  ]); // Default position

  // Function to generate a random country question
  const getRandomQuestion = () => {
    const countryNames = Object.keys(countriesAndCapitals);
    const randomCountry =
      countryNames[Math.floor(Math.random() * countryNames.length)];
    setQuestion(randomCountry);
    setMarkerPosition(countriesAndCapitals[randomCountry].position);
  };

  // Function to check the user's answer
  const checkAnswer = () => {
    const correctAnswer = countriesAndCapitals[question].capital;
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      alert("👍 Doğru Cevap!");
      setAnswer(""); // Reset answer
      getRandomQuestion(); // Generate new question
    } else {
      alert("👎 Yanlış Cevap! Tekrar deneyin.");
    }
  };

  // Custom map pin (📍)
  const locationIcon = L.divIcon({
    className: "custom-location",
    html: '<div style="font-size: 40px;">📍</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <div className="map-container">
      {/* Display question */}

      {/* Map with TileLayer */}
      <MapContainer
        center={[0, 0]} // Başlangıç merkezi 0,0 (Dünya merkezi)
        zoom={2} // Daha geniş bir görünüm için zoom seviyesi 2
        className="styled-map"
        style={{ height: "450px", width: "85%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marker with Popup */}
        <Marker position={markerPosition} icon={locationIcon}>
          <Popup>{`${question} başkentini yazın:`}</Popup>
        </Marker>
      </MapContainer>

      {/* User input for answer */}
      <input
        className="input-box"
        type="text"
        placeholder="Cevabınızı buraya yazın"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      {/* Buttons */}
      <button className="check-btn" onClick={checkAnswer}>
        Cevabı Kontrol Et
      </button>
      <button className="new-question-btn" onClick={getRandomQuestion}>
        Yeni Soru
      </button>
    </div>
  );
}
