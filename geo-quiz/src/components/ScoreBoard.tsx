const ScoreBoard = ({ score }: { score: number }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Skor: {score}</h2>
    </div>
  );
};

export default ScoreBoard;
