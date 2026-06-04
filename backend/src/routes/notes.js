import express from 'express';
import {
  generateNotes,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/generate', generateNotes);
router.get('/', getNotes);
router.get('/:id', getNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
