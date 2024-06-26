import db from '../config/db.js'

// Get all users
export const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users')
    res.status(200).json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Error getting users' })
  }
}

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id])
    if (rows.length > 0) {
      res.status(200).json(rows[0])
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Error getting user' })
  }
}

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body
  try {
    await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role])
    res.status(201).json({ message: 'User created successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' })
  }
}

// Update user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params
  const { username, email, password, role } = req.body
  try {
    await db.query('UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?', [username, email, password, role, id])
    res.status(200).json({ message: 'User updated successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' })
  }
}

// Delete user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    await db.query('DELETE FROM users WHERE id = ?', [id])
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' })
  }
}
