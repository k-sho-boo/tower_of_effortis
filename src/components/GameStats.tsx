import Card from './common/Card';

interface GameStatsProps {
  attackPoint: number;
  currentFloor: number;
  monsterHp: number;
  monsterMaxHp: number;
}

const GameStats = ({ attackPoint, currentFloor, monsterHp, monsterMaxHp }: GameStatsProps) => {
  const hpPercentage = (monsterHp / monsterMaxHp) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="text-center">
        <div className="text-gray-400 text-sm mb-1">アタックポイント</div>
        <div className="text-3xl font-bold text-game-primary">{attackPoint}</div>
        <div className="text-xs text-gray-500 mt-1">AP</div>
      </Card>
      
      <Card className="text-center">
        <div className="text-gray-400 text-sm mb-1">現在のフロア</div>
        <div className="text-3xl font-bold text-game-secondary">{currentFloor}</div>
        <div className="text-xs text-gray-500 mt-1">F</div>
      </Card>
      
      <Card className="text-center">
        <div className="text-gray-400 text-sm mb-1">モンスターHP</div>
        <div className="text-3xl font-bold text-game-text">{monsterHp}/{monsterMaxHp}</div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div 
            className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full transition-all duration-300"
            style={{ width: `${hpPercentage}%` }}
          />
        </div>
      </Card>
    </div>
  );
};

export default GameStats;