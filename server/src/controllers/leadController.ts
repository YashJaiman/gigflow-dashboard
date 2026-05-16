import { Request, Response } from 'express';
import { LeadService } from '../services/LeadService.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiError } from '../middleware/errorHandler.js';
import { API_MESSAGES } from '../constants/index.js';
import { IFilterOptions, LeadSource, LeadStatus } from '../types/index.js';

export const createLead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new ApiError(401, API_MESSAGES.UNAUTHORIZED);
  }

  const { name, email, source, status } = req.body;

  const lead = await LeadService.createLead(
    name,
    email,
    source,
    req.user.userId,
    status
  );

  res.status(201).json({
    success: true,
    message: API_MESSAGES.LEAD_CREATED,
    data: lead,
  });
});

export const updateLead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new ApiError(401, API_MESSAGES.UNAUTHORIZED);
  }

  const { id } = req.params;
  const lead = await LeadService.updateLead(id, req.user.userId, req.body);

  res.status(200).json({
    success: true,
    message: API_MESSAGES.LEAD_UPDATED,
    data: lead,
  });
});

export const deleteLead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new ApiError(401, API_MESSAGES.UNAUTHORIZED);
  }

  const { id } = req.params;

  // Check if lead exists and belongs to user (sales) or user is admin
  const lead = await LeadService.getLeadById(id);
  if (!lead) {
    throw new ApiError(404, API_MESSAGES.LEAD_NOT_FOUND);
  }

  if (req.user.role === 'sales' && lead.createdBy !== req.user.userId) {
    throw new ApiError(403, API_MESSAGES.FORBIDDEN);
  }

  await LeadService.deleteLead(id);

  res.status(200).json({
    success: true,
    message: API_MESSAGES.LEAD_DELETED,
  });
});

export const getLeads = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new ApiError(401, API_MESSAGES.UNAUTHORIZED);
  }

  const filters: IFilterOptions = {
    status: req.query.status ? (req.query.status as LeadStatus) : undefined,
    source: req.query.source ? (req.query.source as LeadSource) : undefined,
    search: req.query.search as string | undefined,
    sortBy: req.query.sortBy ? (req.query.sortBy as 'createdAt' | '-createdAt') : undefined,
    page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
    limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
  };

  const result = await LeadService.getLeads(req.user.userId, req.user.role, filters);

  res.status(200).json(result);
});

export const getLead = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new ApiError(401, API_MESSAGES.UNAUTHORIZED);
  }

  const { id } = req.params;
  const lead = await LeadService.getLeadById(id);

  if (!lead) {
    throw new ApiError(404, API_MESSAGES.LEAD_NOT_FOUND);
  }

  if (req.user.role === 'sales' && lead.createdBy !== req.user.userId) {
    throw new ApiError(403, API_MESSAGES.FORBIDDEN);
  }

  res.status(200).json({
    success: true,
    message: API_MESSAGES.LEADS_FETCHED,
    data: lead,
  });
});
