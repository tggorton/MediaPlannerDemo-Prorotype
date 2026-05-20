export function Loader() {
  return (
    <div className="loader-wrap">
      <div className="loader-spinner" />
      <div className="loader-phrases">
        <div className="ld-phrase" style={{ animationDelay: '0s' }}>
          Loading roadmap data…
        </div>
        <div className="ld-phrase" style={{ animationDelay: '3s' }}>
          Crunching the numbers…
        </div>
        <div className="ld-phrase" style={{ animationDelay: '6s' }}>
          Almost there…
        </div>
      </div>
    </div>
  );
}
