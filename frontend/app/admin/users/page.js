'use client';

import AdminLayout from '@/components/AdminLayout';
import { mockUsers } from '@/data/mock';
import { useState } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Gerenciar Usuários</h1>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar por usuário ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Usuário</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Horas Jogadas</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Membro desde</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                  {user.hoursPlayed}h
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <button className="text-blue-600 hover:underline">Ver</button>
                  <button className="text-orange-600 hover:underline">Editar</button>
                  <button className="text-red-600 hover:underline">Banir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Total de Usuários</p>
          <p className="text-3xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Usuários Ativos</p>
          <p className="text-3xl font-bold text-green-600">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Total de Horas</p>
          <p className="text-3xl font-bold text-gray-900">
            {users.reduce((acc, u) => acc + u.hoursPlayed, 0)}h
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
