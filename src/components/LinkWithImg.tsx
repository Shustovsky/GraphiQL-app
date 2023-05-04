interface LinkWithImgProps {
  title: string;
  href: string;
  src: string;
}

export function LinkWithImg({ title, href, src }: LinkWithImgProps): JSX.Element {
  return (
    <a
      className="flex items-center gap-1 transition-all duration-700 hover:text-green-500 font-bold"
      href={href}
    >
      <img src={src} alt={`${title} img`} className="h-6" />
      {title}
    </a>
  );
}
