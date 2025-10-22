interface NicknameProps {
  username: string;
  className?: string;
}

export default function Nickname({ username, className = "" }: NicknameProps) {
  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-primary-600 hover:text-primary-700 transition-colors duration-200 ${className}`}
    >
      @{username}
    </a>
  );
}
