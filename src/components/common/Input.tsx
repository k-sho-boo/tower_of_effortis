interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'password';
  className?: string;
  autoFocus?: boolean;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

const Input = ({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  className = '',
  autoFocus = false,
  onKeyPress
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`game-input ${className}`}
      autoFocus={autoFocus}
      onKeyPress={onKeyPress}
    />
  );
};

export default Input;