import { forwardRef } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  title?: string;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ children, title }, ref) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.close();
    }
  };

  return (
    <dialog 
      ref={ref} 
      className="game-modal"
      onClick={handleBackdropClick}
    >
      <div className="game-modal-content" onClick={(e) => e.stopPropagation()}>
        {title && (
          <h2 className="text-2xl font-bold mb-6 text-game-primary">{title}</h2>
        )}
        {children}
      </div>
    </dialog>
  );
});

Modal.displayName = 'Modal';

export default Modal;