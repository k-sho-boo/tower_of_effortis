import { forwardRef, useState } from "react";
import Modal from "./common/Modal";
import Input from "./common/Input";
import Button from "./common/Button";

interface TowerModalProps {
  handleSubmit: (name: string) => Promise<void>;
}

const TowerModal = forwardRef<HTMLDialogElement, TowerModalProps>(({ handleSubmit }, ref) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    try {
      await handleSubmit(name.trim());
      setName('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const close = () => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.close();
      setName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim() && !isSubmitting) {
      submit();
    }
  };

  return (
    <Modal ref={ref} title="新しい塔を作成">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            塔の名前
          </label>
          <Input
            value={name}
            onChange={setName}
            placeholder="例: 試練の塔"
            autoFocus
            onKeyPress={handleKeyPress}
          />
          <p className="mt-2 text-sm text-gray-500">
            この名前は後から変更できません
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            onClick={close}
            variant="secondary"
            disabled={isSubmitting}
          >
            キャンセル
          </Button>
          <Button
            onClick={submit}
            disabled={!name.trim() || isSubmitting}
          >
            {isSubmitting ? '作成中...' : '作成'}
          </Button>
        </div>
      </div>
    </Modal>
  );
});

TowerModal.displayName = 'TowerModal';

export default TowerModal;