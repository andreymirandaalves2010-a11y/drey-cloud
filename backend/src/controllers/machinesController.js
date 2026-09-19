const pool = require('../config/database');

const machinesController = {
  getAllMachines: async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [machines] = await connection.query(
        'SELECT id, name, cpu, gpu, ram, ip, status, last_heartbeat, created_at FROM cloud_machines'
      );
      await connection.release();

      res.json(machines);
    } catch (error) {
      console.error('Get machines error:', error);
      res.status(500).json({ error: 'Failed to fetch machines' });
    }
  },

  getMachineById: async (req, res) => {
    try {
      const { id } = req.params;
      const connection = await pool.getConnection();
      const [machines] = await connection.query(
        'SELECT * FROM cloud_machines WHERE id = ?',
        [id]
      );
      await connection.release();

      if (machines.length === 0) {
        return res.status(404).json({ error: 'Machine not found' });
      }

      res.json(machines[0]);
    } catch (error) {
      console.error('Get machine error:', error);
      res.status(500).json({ error: 'Failed to fetch machine' });
    }
  },

  createMachine: async (req, res) => {
    try {
      const { name, cpu, gpu, ram, ip } = req.body;

      if (!name || !ip) {
        return res.status(400).json({ error: 'Name and IP required' });
      }

      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO cloud_machines (name, cpu, gpu, ram, ip, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
        [name, cpu || null, gpu || null, ram || null, ip, 'offline']
      );
      await connection.release();

      res.status(201).json({
        message: 'Machine created',
        id: result.insertId,
      });
    } catch (error) {
      console.error('Create machine error:', error);
      res.status(500).json({ error: 'Failed to create machine' });
    }
  },

  updateMachine: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, cpu, gpu, ram, ip, status } = req.body;

      const connection = await pool.getConnection();
      await connection.query(
        'UPDATE cloud_machines SET name = ?, cpu = ?, gpu = ?, ram = ?, ip = ?, status = ? WHERE id = ?',
        [name, cpu, gpu, ram, ip, status, id]
      );
      await connection.release();

      res.json({ message: 'Machine updated' });
    } catch (error) {
      console.error('Update machine error:', error);
      res.status(500).json({ error: 'Failed to update machine' });
    }
  },

  deleteMachine: async (req, res) => {
    try {
      const { id } = req.params;

      const connection = await pool.getConnection();
      await connection.query('DELETE FROM cloud_machines WHERE id = ?', [id]);
      await connection.release();

      res.json({ message: 'Machine deleted' });
    } catch (error) {
      console.error('Delete machine error:', error);
      res.status(500).json({ error: 'Failed to delete machine' });
    }
  },

  heartbeat: async (req, res) => {
    try {
      const { machineId } = req.params;
      const { cpu_usage, ram_usage, gpu_usage, status, current_game, current_session } = req.body;

      const connection = await pool.getConnection();
      await connection.query(
        'UPDATE cloud_machines SET status = ?, last_heartbeat = NOW() WHERE id = ?',
        [status || 'online', machineId]
      );
      await connection.release();

      res.json({ message: 'Heartbeat received' });
    } catch (error) {
      console.error('Heartbeat error:', error);
      res.status(500).json({ error: 'Failed to process heartbeat' });
    }
  },
};

module.exports = machinesController;
