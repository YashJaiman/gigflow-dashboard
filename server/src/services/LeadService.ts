import { Lead } from '../models/Lead.js';
import { ILead, LeadStatus, LeadSource, IFilterOptions, IPaginatedResponse } from '../types/index.js';
import { ApiError } from '../middleware/errorHandler.js';
import { PAGINATION } from '../constants/index.js';

export class LeadService {
  static async createLead(
    name: string,
    email: string,
    source: LeadSource,
    createdBy: string,
    status?: LeadStatus
  ): Promise<ILead> {
    const lead = new Lead({
      name,
      email,
      source,
      status: status || LeadStatus.NEW,
      createdBy,
    });

    await lead.save();
    return lead.toObject() as ILead;
  }

  static async updateLead(
    leadId: string,
    userId: string,
    updates: Partial<ILead>
  ): Promise<ILead> {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      throw new ApiError(404, 'Lead not found');
    }

    Object.assign(lead, updates);
    await lead.save();
    return lead.toObject() as ILead;
  }

  static async deleteLead(leadId: string): Promise<void> {
    const lead = await Lead.findByIdAndDelete(leadId);
    if (!lead) {
      throw new ApiError(404, 'Lead not found');
    }
  }

  static async getLeadById(leadId: string): Promise<ILead | null> {
    const lead = await Lead.findById(leadId);
    return lead ? (lead.toObject() as ILead) : null;
  }

  static async getLeads(
    userId: string,
    userRole: string,
    filters: IFilterOptions
  ): Promise<IPaginatedResponse<ILead>> {
    const page = filters.page || PAGINATION.DEFAULT_PAGE;
    const limit = filters.limit || PAGINATION.DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};

    // Only sales users can see their own leads; admins see all
    if (userRole === 'sales') {
      query.createdBy = userId;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.source) {
      query.source = filters.source;
    }

    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
      ];
    }

    const sortOption: Record<string, 1 | -1> = {};
    if (filters.sortBy === 'createdAt') {
      sortOption.createdAt = 1;
    } else if (filters.sortBy === '-createdAt') {
      sortOption.createdAt = -1;
    } else {
      sortOption.createdAt = -1; // Default: newest first
    }

    const [leads, totalResults] = await Promise.all([
      Lead.find(query).sort(sortOption).skip(skip).limit(limit),
      Lead.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalResults / limit);

    return {
      success: true,
      page,
      totalPages,
      totalResults,
      data: leads.map((lead) => lead.toObject() as ILead),
    };
  }
}
