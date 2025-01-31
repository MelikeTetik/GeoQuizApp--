
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import { countriesData } from "../data/countries";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const [flag, setFlag] = useState("");
  const [score, setScore] = useState(0);
  const [questionType, setQuestionType] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const getRandomQuestion = () => {
    setIsCorrect(null); // Yeni soru geldiğinde rengi sıfırla
    const countryNames = Object.keys(countriesData);
    const randomCountry =
      countryNames[Math.floor(Math.random() * countryNames.length)];
    const countryInfo = countriesData[randomCountry];

    const questionTypes = ["capital", "country", "flag"];
    const randomType =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];

    setQuestionType(randomType);
    setMarkerPosition(countryInfo.position);
    setFlag(countryInfo.flag);

    if (randomType === "capital") {
      setQuestion(`${randomCountry} ülkesinin başkenti nedir?`);
      setCorrectAnswer(countryInfo.capital);
    } else if (randomType === "country") {
      setQuestion(`${countryInfo.capital} şehri hangi ülkenin başkentidir?`);
      setCorrectAnswer(randomCountry);
    } else {
      setQuestion(
        `<img src="${countryInfo.flag}" alt="Bayrak" style="width:40px; vertical-align:middle;" /> Bu bayrak hangi ülkeye ait?`
      );
      setCorrectAnswer(randomCountry);
    }
  };

  const checkAnswer = () => {
    if (answer.trim() === "") {
      alert("⚠ Lütfen bir cevap girin!");
      return;
    }

    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
      setIsCorrect(true);
      alert(`✔ Doğru Cevap! Puanınız: ${score + 1}`);

      setTimeout(() => getRandomQuestion(), 1000);
    } else {
      setIsCorrect(false);
      alert(`❌ Yanlış Cevap! Doğru cevap: ${correctAnswer}`);
    }

    setAnswer("");
  };

  const locationIcon = L.divIcon({
    className: "custom-location",
    html: '<div style="font-size: 40px;">📍</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <div className="map-container">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        className="styled-map"
        style={{ height: "430px", width: "80%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={markerPosition} icon={locationIcon}>
          <Popup>
            <span
              dangerouslySetInnerHTML={{ __html: question }}
              className="fade-in"
            />
          </Popup>
        </Marker>
      </MapContainer>

      <input
        className={`input-box ${
          isCorrect === true
            ? "correct-answer"
            : isCorrect === false
            ? "wrong-answer"
            : ""
        }`}
        type="text"
        placeholder="Cevabınızı buraya yazın"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button className="check-btn" onClick={checkAnswer}>
        Cevabı Kontrol Et
      </button>
      <button className="new-question-btn" onClick={getRandomQuestion}>
        Yeni Soru
      </button>
      <h3>Puanınız: {score}</h3>
    </div>
  );
}
