export default function StatusBadge({ status }) {
  const statusConfig = {
    available: {
      bg: 'bg-green-500',
      text: 'Disponível',
      icon: '✓',
    },
    maintenance: {
      bg: 'bg-yellow-500',
      text: 'Manutenção',
      icon: '⚙',
    },
    offline: {
      bg: 'bg-red-500',
      text: 'Offline',
      icon: '✕',
    },
    active: {
      bg: 'bg-blue-500',
      text: 'Ativo',
      icon: '●',
    },
    inactive: {
      bg: 'bg-gray-500',
      text: 'Inativo',
      icon: '○',
    },
    online: {
      bg: 'bg-green-500',
      text: 'Online',
      icon: '✓',
    },
    ended: {
      bg: 'bg-gray-500',
      text: 'Finalizado',
      icon: '✓',
    },
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <span
      className={`${config.bg} text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1`}
    >
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </span>
  );
}
