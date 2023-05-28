interface ButtonProps {
  label: string;
  onClick: () => void;
  rowStart?: string;
}

export function Button({ label, onClick, rowStart }: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 whitespace-nowrap font-semibold row-start-${rowStart} w-full bg-sky-500 text-white hover:bg-green-500 transition-all duration-700`}
    >
      {label}
    </button>
  );
}
