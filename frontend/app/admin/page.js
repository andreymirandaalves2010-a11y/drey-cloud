"use client";
import Link from "next/link";
import { mockUsers, mockMachines, mockGames, mockSessions } from "@/data/mock";

export default function AdminDashboard() {
  const activeUsers = mockUsers.filter((u) => u.status === "active").length;
  const activeSessions = mockSessions.filter((s) => s.status === "active").length;
  const onlineMachines = mockMachines.filter((m) => m.status === "online").length;

  return (
    <main className="drey-page">
      <header className="drey-navbar">
        <div className="drey-container drey-nav-content">
          <Link href="/" className="drey-logo">DREY<span>CLOUD</span></Link>
          <nav className="drey-nav-links">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/games">Jogos</Link>
            <Link href="/admin">Admin</Link>
          </nav>
          <div className="drey-nav-actions">
            <Link href="/login" className="drey-btn drey-btn-outline">Sair</Link>
          </div>
        </div>
      </header>

      <section style={{ minHeight: "calc(100vh - 80px)", padding: "40px 20px" }}>
        <div className="drey-container">
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "30px" }}>
            🛡️ Painel Admin
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
            <div className="drey-stat-card">
              <div style={{ fontSize: "24px" }}>👥</div>
              <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>Usuários</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", marginTop: "5px" }}>{activeUsers}</p>
            </div>
            <div className="drey-stat-card">
              <div style={{ fontSize: "24px" }}>🎮</div>
              <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>Jogos</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", marginTop: "5px" }}>{mockGames.length}</p>
            </div>
            <div className="drey-stat-card">
              <div style={{ fontSize: "24px" }}>🖥️</div>
              <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>Máquinas</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", marginTop: "5px" }}>{onlineMachines}</p>
            </div>
            <div className="drey-stat-card">
              <div style={{ fontSize: "24px" }}>▶️</div>
              <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>Sessões</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", marginTop: "5px" }}>{activeSessions}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginTop: "40px" }}>
            <div className="drey-stat-card">
              <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}>👤 Usuários</h2>
              <table style={{ width: "100%", fontSize: "12px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #333" }}>
                    <th style={{ textAlign: "left", padding: "8px", color: "#0ff" }}>Usuário</th>
                    <th style={{ textAlign: "left", padding: "8px", color: "#0ff" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.slice(0, 5).map((user) => (
                    <tr key={user.id} style={{ borderBottom: "1px solid #222" }}>
                      <td style={{ padding: "8px" }}>{user.username}</td>
                      <td style={{ padding: "8px" }}>
                        <span style={{ padding: "3px 6px", fontSize: "10px", fontWeight: "bold", borderRadius: "3px", backgroundColor: user.status === "active" ? "#00cc66" : "#666", color: user.status === "active" ? "#000" : "#ccc" }}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="drey-stat-card">
              <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}>🖥️ Máquinas</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {mockMachines.map((machine) => (
                  <div key={machine.id} style={{ padding: "10px", backgroundColor: "#0a0a0a", borderRadius: "4px", border: "1px solid #222" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontWeight: "bold", fontSize: "12px" }}>{machine.name}</span>
                      <span style={{ padding: "2px 6px", fontSize: "10px", borderRadius: "3px", backgroundColor: machine.status === "online" ? "#00cc66" : "#cc0000", color: machine.status === "online" ? "#000" : "#fff" }}>
                        {machine.status}
                      </span>
                    </div>
                    <p style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>{machine.location}</p>
                    <div style={{ fontSize: "10px", color: "#aaa" }}>
                      CPU:{machine.cpuUsage}% | RAM:{machine.memoryUsage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="drey-footer">
        <div className="drey-container drey-footer-bottom">
          <p>© 2026 Drey Cloud</p>
        </div>
      </footer>
    </main>
  );
}