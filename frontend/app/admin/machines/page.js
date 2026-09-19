'use client';

import AdminLayout from '@/components/AdminLayout';
import { mockMachines } from '@/data/mock';
import { useState } from 'react';

export default function AdminMachines() {
  const [machines, setMachines] = useState(mockMachines);

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Máquinas</h1>
        <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition">
          + Nova Máquina
        </button>
      </div>

      {/* Grid de Máquinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {machines.map(machine => (
          <div key={machine.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{machine.name}</h3>
                <p className="text-sm text-gray-600">{machine.location}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                machine.status === 'online'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {machine.status === 'online' ? '● Online' : '● Offline'}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">CPU</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${machine.cpuUsage}%` }}
                  ></div>
                </div>
                <p className="text-sm font-semibold text-gray-900">{machine.cpuUsage}%</p>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-1">RAM</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${machine.memoryUsage}%` }}
                  ></div>
                </div>
                <p className="text-sm font-semibold text-gray-900">{machine.memoryUsage}%</p>
              </div>

              <div>
                <p className="text-xs text-gray-600">Usuários: {machine.activeUsers}/{machine.maxCapacity}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <button className="flex-1 py-2 text-sm bg-blue-100 text-blue-700 font-bold rounded hover:bg-blue-200 transition">
                Editar
              </button>
              <button className="flex-1 py-2 text-sm bg-red-100 text-red-700 font-bold rounded hover:bg-red-200 transition">
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Total de Máquinas</p>
            <p className="text-3xl font-bold text-gray-900">{machines.length}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Online</p>
            <p className="text-3xl font-bold text-green-600">
              {machines.filter(m => m.status === 'online').length}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Offline</p>
            <p className="text-3xl font-bold text-red-600">
              {machines.filter(m => m.status === 'offline').length}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Capacidade Total</p>
            <p className="text-3xl font-bold text-gray-900">
              {machines.reduce((acc, m) => acc + m.maxCapacity, 0)}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
