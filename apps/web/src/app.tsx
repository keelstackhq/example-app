// Canary app: one-line edits here re-measure CI (hull v0.2.1, hoard cache).
import { Button, Card } from "@cascivo/react";
import { useState } from "preact/hooks";

export function App() {
  const [count, setCount] = useState(0);
  return (
    <Card>
      <h1>Hello from hull-canary</h1>
      <Button onClick={() => setCount(count + 1)}>Clicked {count} times</Button>
    </Card>
  );
}
