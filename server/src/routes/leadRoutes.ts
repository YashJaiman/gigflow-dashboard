import { Router } from 'express';
import {
  createLead,
  updateLead,
  deleteLead,
  getLeads,
  getLead,
} from '../controllers/leadController.js';
import {
  createLeadValidation,
  updateLeadValidation,
  validateRequest,
} from '../validators/index.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// All lead routes require authentication
router.use(authenticate);

// GET leads with filters
router.get('/', getLeads);

// GET single lead
router.get('/:id', getLead);

// CREATE lead
router.post('/', createLeadValidation(), validateRequest, createLead);

// UPDATE lead
router.put('/:id', updateLeadValidation(), validateRequest, updateLead);

// DELETE lead (admin only)
router.delete('/:id', authorize('admin'), deleteLead);

export default router;
