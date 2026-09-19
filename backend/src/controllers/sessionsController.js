const pool = require('../config/database');

const sessionsController = {
  getSessions: async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [sessions] = await connection.query(
        'SELECT gs.id, gs.user_id, gs.game_id, gs.machine_id, g.name as game_name, gs.status, gs.start_time, gs.end_time FROM game_sessions gs LEFT JOIN games g ON gs.game_id = g.id WHERE gs.user_id = ? ORDER BY gs.start_time DESC',
        [req.user.id]
      );
      await connection.release();

      res.json(sessions);
    } catch (error) {
      console.error('Get sessions error:', error);
      res.status(500).json({ error: 'Failed to fetch sessions' });
    }
  },

  getSessionById: async (req, res) => {
    try {
      const { id } = req.params;
      const connection = await pool.getConnection();
      const [sessions] = await connection.query(
        'SELECT * FROM game_sessions WHERE id = ? AND user_id = ?',
        [id, req.user.id]
      );
      await connection.release();

      if (sessions.length === 0) {
        return res.status(404).json({ error: 'Session not found' });
      }

      res.json(sessions[0]);
    } catch (error) {
      console.error('Get session error:', error);
      res.status(500).json({ error: 'Failed to fetch session' });
    }
  },

  createSession: async (req, res) => {
    try {
      const { gameId } = req.body;
      const userId = req.user.id;

      if (!gameId) {
        return res.status(400).json({ error: 'Game ID required' });
      }

      const connection = await pool.getConnection();

      // Start transaction
      await connection.beginTransaction();

      try {
        // Check if game exists
        const [games] = await connection.query(
          'SELECT id FROM games WHERE id = ? AND status = "available"',
          [gameId]
        );

        if (games.length === 0) {
          await connection.rollback();
          return res.status(404).json({ error: 'Game not available' });
        }

        // Find available machine
        const [machines] = await connection.query(
          'SELECT id FROM cloud_machines WHERE status = "online" LIMIT 1 FOR UPDATE'
        );

        if (machines.length === 0) {
          await connection.rollback();
          return res.status(503).json({ error: 'No available machines' });
        }

        const machineId = machines[0].id;

        // Create session
        const [result] = await connection.query(
          'INSERT INTO game_sessions (user_id, game_id, machine_id, status, start_time) VALUES (?, ?, ?, ?, NOW())',
          [userId, gameId, machineId, 'active']
        );

        await connection.commit();
        await connection.release();

        res.status(201).json({
          message: 'Session created',
          sessionId: result.insertId,
          machineId,
        });
      } catch (error) {
        await connection.rollback();
        await connection.release();
        throw error;
      }
    } catch (error) {
      console.error('Create session error:', error);
      res.status(500).json({ error: 'Failed to create session' });
    }
  },

  stopSession: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const connection = await pool.getConnection();
      await connection.query(
        'UPDATE game_sessions SET status = "ended", end_time = NOW() WHERE id = ? AND user_id = ?',
        [id, userId]
      );
      await connection.release();

      res.json({ message: 'Session stopped' });
    } catch (error) {
      console.error('Stop session error:', error);
      res.status(500).json({ error: 'Failed to stop session' });
    }
  },
};

module.exports = sessionsController;
