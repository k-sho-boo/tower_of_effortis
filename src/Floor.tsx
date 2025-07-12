import { useParams } from 'react-router-dom';
import Layout from './components/common/Layout';
import GameStats from './components/GameStats';
import BattleField from './components/BattleField';
import GameController from './components/GameController';
import { useGameLogic } from './hooks/useGameLogic';
import { useTower } from './hooks/useTower';

const Floor = () => {
  const { towerId } = useParams<{ towerId: string }>();
  const { tower, isLoading, error } = useTower(towerId);
  const { gameState, handleAttack, addAttackPoint, canAttack } = useGameLogic(tower || undefined);

  if (isLoading) {
    return (
      <Layout showBackButton>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-game-primary"></div>
        </div>
      </Layout>
    );
  }

  if (error || !tower) {
    return (
      <Layout showBackButton>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-red-500 mb-4">エラー</h2>
          <p className="text-gray-400">{error || '塔が見つかりませんでした'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBackButton>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-game-primary mb-2">
            {tower.name}
          </h1>
          <p className="text-gray-400">
            フロア {gameState.currentFloor} を攻略中
          </p>
        </div>

        <GameStats
          attackPoint={gameState.attackPoint}
          currentFloor={gameState.currentFloor}
          monsterHp={gameState.monsterHp}
          monsterMaxHp={gameState.monsterMaxHp}
        />

        <BattleField
          isAttacking={gameState.isAttacking}
          isEnemyHit={gameState.isEnemyHit}
          monsterHp={gameState.monsterHp}
          currentFloor={gameState.currentFloor}
          lastDamage={gameState.lastDamage}
          showDamage={gameState.showDamage}
          tower={tower}
        />

        <GameController
          onAttack={handleAttack}
          onAddAP={() => addAttackPoint(10)}
          canAttack={canAttack}
          attackPoint={gameState.attackPoint}
        />
      </div>
    </Layout>
  );
};

export default Floor;