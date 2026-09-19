'use client';

import AdminLayout from '@/components/AdminLayout';
import { mockSessions } from '@/data/mock';
import { useState } from 'react';

export default function AdminSessions() {
  const [sessions, setSessions] = useState(mockSessions);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSessions = sessions.filter(session =>
    filterStatus === 'all' || session.status === filterStatus
  );

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Gerenciar Sessões</h1>
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-3">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            filterStatus === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            filterStatus === 'active'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Ativas
        </button>
        <button
          onClick={() => setFilterStatus('ended')}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            filterStatus === 'ended'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Encerradas
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">ID Sessão</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Usuário</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Jogo</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Servidor</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Duração</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredSessions.map(session => (
              <tr key={session.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono text-gray-900">#{session.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">Usuário {session.userId}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{session.gameName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{session.server}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{session.duration}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    session.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {session.status === 'active' ? '▶ Ativa' : '✓ Finalizada'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <button className="text-blue-600 hover:underline">Detalhes</button>
                  {session.status === 'active' && (
                    <button className="text-red-600 hover:underline">Encerrar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Total de Sessões</p>
          <p className="text-3xl font-bold text-gray-900">{sessions.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Ativas Agora</p>
          <p className="text-3xl font-bold text-green-600">
            {sessions.filter(s => s.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Encerradas</p>
          <p className="text-3xl font-bold text-gray-600">
            {sessions.filter(s => s.status === 'ended').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Tempo Total</p>
          <p className="text-3xl font-bold text-gray-900">
            {sessions.reduce((acc, s) => {
              const hours = parseInt(s.duration);
              return acc + hours;
            }, 0)}h
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
