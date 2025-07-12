import Card from './common/Card';
import { getMonsterImageByFloor } from '../utils/monsterUtils';
import { getDefaultPlayerImage } from '../utils/playerUtils';
import type { Tower } from '../utils/models';

interface BattleFieldProps {
  isAttacking: boolean;
  isEnemyHit: boolean;
  monsterHp: number;
  currentFloor: number;
  lastDamage: number;
  showDamage: boolean;
  tower?: Tower;
}

const BattleField = ({ isAttacking, isEnemyHit, monsterHp, currentFloor, lastDamage, showDamage, tower }: BattleFieldProps) => {
  return (
    <Card className="relative h-96 overflow-hidden bg-gradient-to-b from-game-card to-game-bg">
      <div className="absolute inset-0 flex items-center justify-between px-8">
        {/* プレイヤー */}
        <div className={`relative transition-all duration-200 ${isAttacking ? 'translate-x-20' : ''}`}>
          <img 
            src={tower?.playerImage || getDefaultPlayerImage()} 
            alt="Player" 
            className="w-60 h-60 object-contain"
          />
        </div>

        {/* バトルエフェクト */}
        {isEnemyHit && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-damage">
            💥
          </div>
        )}

        {/* ダメージ表示 */}
        {showDamage && (
          <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 animate-damage-number pointer-events-none">
            <span className="text-4xl font-bold text-red-400 drop-shadow-lg">
              -{lastDamage}
            </span>
          </div>
        )}

        {/* モンスター */}
        <div className={`relative ${isEnemyHit ? 'animate-damage' : ''}`}>
          <img 
            src={getMonsterImageByFloor(currentFloor)} 
            alt="Monster" 
            className="w-72 h-72 object-contain"
          />
          <div className="text-center mt-2">
            <div className="bg-black/60 rounded px-3 py-1 inline-block">
              <span className="text-red-400 font-bold">HP: {monsterHp}</span>
            </div>
          </div>
          {monsterHp === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-levelup">🎉</div>
            </div>
          )}
        </div>
      </div>

      {/* フロア表示 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="bg-black/60 rounded-lg px-6 py-2">
          <span className="text-game-secondary font-bold text-lg">{currentFloor}F</span>
        </div>
      </div>
    </Card>
  );
};

export default BattleField;