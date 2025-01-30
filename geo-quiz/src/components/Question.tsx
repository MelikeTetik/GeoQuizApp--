import { useState, useEffect } from "react";
import countries from "../app/data/countries.json";

const Question = ({ onAnswer }: { onAnswer: (answer: string) => void }) => {
  const [question, setQuestion] = useState<{
    country: string;
    capital: string;
  } | null>(null);

  useEffect(() => {
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    setQuestion(randomCountry);
  }, []);

  return (
    <div className="p-4 text-center">
      {question && (
        <p className="text-xl font-bold">
          "{question.capital}" hangi ülkenin başkentidir?
        </p>
      )}
      <button
        onClick={() => onAnswer(question?.country || "")}
        className="p-2 mt-3 bg-blue-500 text-white rounded"
      >
        Cevabı Kontrol Et
      </button>
    </div>
  );
};

export default Question;
