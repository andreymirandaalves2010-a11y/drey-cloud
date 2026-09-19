"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao criar conta");
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Não foi possível conectar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="drey-page">
      <header className="drey-navbar">
        <div className="drey-container drey-nav-content">
          <Link href="/" className="drey-logo">
            DREY<span>CLOUD</span>
          </Link>

          <nav className="drey-nav-links">
            <a href="/">Inicio</a>
            <a href="/#como-funciona">Como funciona</a>
            <a href="/#recursos">Recursos</a>
          </nav>

          <div className="drey-nav-actions">
            <Link href="/login" className="drey-btn drey-btn-outline">
              Entrar
            </Link>
          </div>
        </div>
      </header>

      <section className="drey-hero">
        <div className="drey-hero-glow"></div>

        <div
          className="drey-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 80px)",
          }}
        >
          <div className="drey-auth-form">
            <div className="drey-auth-header">
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>
                gamepad
              </div>
              <h1>Criar Conta</h1>
              <p>Junte-se ao Drey Cloud</p>
            </div>

            {error && (
              <div className="drey-alert drey-alert-error">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="drey-auth-form-content">
              <div className="drey-form-group">
                <label htmlFor="name">Nome Completo</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome"
                  className="drey-input"
                />
              </div>

              <div className="drey-form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  className="drey-input"
                />
              </div>

              <div className="drey-form-group">
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="minimo 6 caracteres"
                  className="drey-input"
                />
              </div>

              <div className="drey-form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="repita a senha"
                  className="drey-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="drey-btn drey-btn-primary drey-btn-large"
                style={{ width: "100%", marginTop: "10px" }}
              >
                {loading ? "Criando..." : "Criar Conta"}
              </button>
            </form>

            <div className="drey-divider">ou</div>

            <div className="drey-auth-links">
              <Link href="/login" className="drey-link-primary">
                Ja tem conta Faca login
              </Link>
              <a href="#" className="drey-link-secondary">
                Recuperar senha
              </a>
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
