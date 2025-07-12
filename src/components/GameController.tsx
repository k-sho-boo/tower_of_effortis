import Button from './common/Button';
import Card from './common/Card';

interface GameControllerProps {
  onAttack: () => void;
  onAddAP: () => void;
  canAttack: boolean;
  attackPoint: number;
}

const GameController = ({ onAttack, onAddAP, canAttack, attackPoint }: GameControllerProps) => {
  return (
    <Card className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={onAttack}
          disabled={!canAttack}
          size="lg"
          className="w-full"
        >
          {!canAttack && attackPoint < 1 ? 'AP不足' : '攻撃 (1 AP)'}
        </Button>

        <Button
          onClick={onAddAP}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          10 AP 追加（テスト用）
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 opacity-50">
        <Button variant="secondary" disabled className="w-full">
          オート戦闘 (開発中)
        </Button>
        <Button variant="secondary" disabled className="w-full">
          まとめて攻撃 (開発中)
        </Button>
      </div>
    </Card>
  );
};

export default GameController;
