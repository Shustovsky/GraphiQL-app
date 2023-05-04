interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 font-semibold  bg-sky-500 text-white hover:bg-green-500 transition-all duration-700"
    >
      {label}
    </button>
  );
}
