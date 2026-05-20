function currentQuarterBadge(): string {
  const now = new Date();
  const m = now.getMonth();
  const y = now.getFullYear();
  const q = m < 3 ? 1 : m < 6 ? 2 : m < 9 ? 3 : 4;
  return `Q${q} ${y}`;
}

export function Topbar() {
  return (
    <div className="topbar">
      <span className="tbadge">{currentQuarterBadge()}</span>
    </div>
  );
}
