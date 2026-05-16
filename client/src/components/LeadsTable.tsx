import React from 'react';
import { Lead, LeadStatus, LeadSource } from '../types';
import { formatDate } from '../utils/formatters';
import { Button } from './Button';

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onEdit?: (lead: Lead) => void;
  onDelete?: (id: string) => void;
  canDelete?: boolean;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  isLoading,
  onEdit,
  onDelete,
  canDelete = false,
}) => {
  const getStatusColor = (status: LeadStatus): string => {
    switch (status) {
      case LeadStatus.NEW:
        return 'bg-blue-100 text-blue-800';
      case LeadStatus.CONTACTED:
        return 'bg-yellow-100 text-yellow-800';
      case LeadStatus.QUALIFIED:
        return 'bg-green-100 text-green-800';
      case LeadStatus.LOST:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading leads...</div>;
  }

  if (leads.length === 0) {
    return <div className="p-4 text-center text-gray-500">No leads found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs font-semibold text-gray-900 bg-gray-100">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Source</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
              <td className="px-6 py-4">{lead.email}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4">{lead.source}</td>
              <td className="px-6 py-4">{formatDate(lead.createdAt)}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  {onEdit && (
                    <Button variant="secondary" onClick={() => onEdit(lead)} className="text-xs">
                      Edit
                    </Button>
                  )}
                  {onDelete && canDelete && (
                    <Button variant="danger" onClick={() => onDelete(lead._id)} className="text-xs">
                      Delete
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
