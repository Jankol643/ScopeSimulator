// app/page.tsx

import ScopeView from "./components/Scopeview";

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Scope View Simulator</h1>
      <ScopeView />
    </div>
  );
}