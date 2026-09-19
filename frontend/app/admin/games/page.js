'use client';

import AdminLayout from '@/components/AdminLayout';
import { mockGames } from '@/data/mock';
import { useState } from 'react';

export default function AdminGames() {
  const [games, setGames] = useState(mockGames);
  const [showForm, setShowForm] = useState(false);

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Jogos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition"
        >
          + Novo Jogo
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Adicionar Novo Jogo</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome do Jogo"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
              <input
                type="text"
                placeholder="Slug"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <textarea
              placeholder="Descrição"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            ></textarea>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                <option>Gênero</option>
                <option>Action RPG</option>
                <option>RPG</option>
                <option>Adventure</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                <option value="available">Disponível</option>
                <option value="maintenance">Manutenção</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition">
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-300 text-gray-900 font-bold rounded-lg hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Título</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Gênero</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {games.map(game => (
              <tr key={game.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{game.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{game.genre}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{game.rating}★</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    game.status === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {game.status === 'available' ? 'Disponível' : 'Manutenção'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <button className="text-blue-600 hover:underline">Editar</button>
                  <button className="text-red-600 hover:underline">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
