import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "America/Los_Angeles",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="tabular-nums font-medium text-foreground">{time || "--:--:--"}</span>
      <span className="text-muted-foreground">Los Angeles</span>
    </div>
  );
}