const os = require('os');
const machine = require('./machine');

async function collect() {
  const cpus = os.cpus();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  // Calculate CPU usage (simple average)
  let totalLoad = 0;
  cpus.forEach(cpu => {
    const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
    const idle = cpu.times.idle;
    totalLoad += (1 - idle / total) * 100;
  });
  const avgCpuUsage = Math.round(totalLoad / cpus.length);

  return {
    machine_id: process.env.MACHINE_ID || 1,
    status: 'online',
    cpu_usage: avgCpuUsage,
    cpu_cores: cpus.length,
    ram_usage: Math.round((usedMemory / totalMemory) * 100),
    ram_total_gb: Math.round(totalMemory / (1024 ** 3)),
    ram_free_gb: Math.round(freeMemory / (1024 ** 3)),
    gpu_usage: 0, // Would need additional libraries
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    uptime: Math.round(os.uptime()),
    current_game: null,
    current_session: null,
    timestamp: new Date().toISOString(),
  };
}

module.exports = { collect };
