import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Sidebar />
      <TopBar />
      <main
        className="pt-14"
        style={{ marginLeft: "240px", minHeight: "100vh" }}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
