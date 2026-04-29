export default function Footer() {
  return (
    <footer className="text-center py-5 text-text-muted text-[14px] border-t border-glass-border bg-[rgba(11,15,25,0.8)] backdrop-blur-sm">
      <p>Projet ML Photo Guessing &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}
