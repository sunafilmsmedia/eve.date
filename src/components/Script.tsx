type ScriptProps = {
  children: React.ReactNode;
  className?: string;
};

export function Script({ children, className = "" }: ScriptProps) {
  return <span className={`font-script ${className}`}>{children}</span>;
}
