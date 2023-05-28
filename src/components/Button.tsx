interface ButtonProps {
  label: string;
  onClick: () => void;
  startRow?: number;
}

export function Button({ label, onClick, startRow }: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold row-start-${startRow} bg-sky-500 text-white hover:bg-green-500 transition-all duration-700`}
    >
      {label}
    </button>
  );
}
