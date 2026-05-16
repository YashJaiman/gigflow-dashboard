import React, { useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';
import { useLeadStore } from '../store/leadStore';
import { leadService } from '../services/leadService';
import { useDebouncedValue } from '../hooks/useDebounce';
import { useToast } from '../hooks/useToast';

import { LeadsTable } from '../components/LeadsTable';
import { LeadForm } from '../components/LeadForm';
import { Pagination } from '../components/Pagination';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { EmptyState } from '../components/EmptyState';
import { Toast } from '../components/Toast';

import { exportLeadsToCSV } from '../utils/exportCSV';

import {
  Lead,
  LeadStatus,
  LeadSource,
  CreateLeadPayload,
  UpdateLeadPayload,
} from '../types';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const { addToast } = useToast();

  const {
    leads,
    isLoading,
    page,
    totalPages,
    filters,
    setLeads,
    setLoading,
    setPagination,
    setFilters,
    addLead,
    updateLead,
    removeLead,
  } = useLeadStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [editingLead, setEditingLead] = useState<Lead | undefined>();

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [statusFilter, setStatusFilter] = useState('');

  const [sourceFilter, setSourceFilter] = useState('');

  const debouncedSearch = useDebouncedValue(searchTerm, 500);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await leadService.getLeads({
        ...filters,
        search: debouncedSearch,
        status: statusFilter as LeadStatus | undefined,
        source: sourceFilter as LeadSource | undefined,
      });

      setLeads(response.data);

      setPagination(
        response.page,
        response.totalPages,
        response.totalResults
      );
    } catch (error) {
      addToast('Failed to fetch leads', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, debouncedSearch, statusFilter, sourceFilter]);

  const handleCreateLead = async (data: CreateLeadPayload) => {
    try {
      const response = await leadService.createLead(data);

      if (response.data) {
        addLead(response.data);

        addToast('Lead created successfully', 'success');

        setIsCreateModalOpen(false);

        fetchLeads();
      }
    } catch (error) {
      addToast('Failed to create lead', 'error');
    }
  };

  const handleUpdateLead = async (data: UpdateLeadPayload) => {
    if (!editingLead) return;

    try {
      const response = await leadService.updateLead(
        editingLead._id,
        data
      );

      if (response.data) {
        updateLead(response.data);

        addToast('Lead updated successfully', 'success');

        setEditingLead(undefined);

        fetchLeads();
      }
    } catch (error) {
      addToast('Failed to update lead', 'error');
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await leadService.deleteLead(id);

      removeLead(id);

      addToast('Lead deleted successfully', 'success');

      setDeleteConfirmId(null);

      fetchLeads();
    } catch (error) {
      addToast('Failed to delete lead', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              GigFlow Dashboard
            </h1>

            <p className="text-gray-600">
              Welcome, {user?.name}
            </p>
          </div>

          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Leads Management
              </h2>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditingLead(undefined);
                    setIsCreateModalOpen(true);
                  }}
                >
                  + New Lead
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => exportLeadsToCSV(leads)}
                >
                  Export CSV
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

              <Select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                options={[
                  {
                    value: '',
                    label: 'All Status',
                  },

                  ...Object.values(LeadStatus).map(
                    (status) => ({
                      value: status,
                      label: status,
                    })
                  ),
                ]}
              />

              <Select
                value={sourceFilter}
                onChange={(e) =>
                  setSourceFilter(e.target.value)
                }
                options={[
                  {
                    value: '',
                    label: 'All Source',
                  },

                  ...Object.values(LeadSource).map(
                    (source) => ({
                      value: source,
                      label: source,
                    })
                  ),
                ]}
              />
            </div>
          </div>
        </Card>

        {/* Leads Table */}
        <Card className="mb-6">
          {isLoading ? (
            <Loading message="Loading leads..." />
          ) : leads.length === 0 ? (
            <EmptyState
              title="No leads found"
              description="Create your first lead to get started"
            />
          ) : (
            <>
              <LeadsTable
                leads={leads}
                isLoading={isLoading}
                onEdit={(lead) => {
                  setEditingLead(lead);

                  setIsCreateModalOpen(true);
                }}
                onDelete={(id) =>
                  setDeleteConfirmId(id)
                }
                canDelete={user?.role === 'admin'}
              />

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) =>
                  setFilters({
                    ...filters,
                    page: newPage,
                  })
                }
              />
            </>
          )}
        </Card>
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);

          setEditingLead(undefined);
        }}
        title={
          editingLead
            ? 'Edit Lead'
            : 'Create New Lead'
        }
        footer={
          <Button
            variant="secondary"
            onClick={() =>
              setIsCreateModalOpen(false)
            }
          >
            Cancel
          </Button>
        }
      >
        <LeadForm
          lead={editingLead}
          onSubmit={(data) => {
            if (editingLead) {
              handleUpdateLead(
                data as UpdateLeadPayload
              );
            } else {
              handleCreateLead(
                data as CreateLeadPayload
              );
            }

            setIsCreateModalOpen(false);

            setEditingLead(undefined);
          }}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() =>
          setDeleteConfirmId(null)
        }
        title="Delete Lead"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() =>
                setDeleteConfirmId(null)
              }
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={() =>
                deleteConfirmId &&
                handleDeleteLead(deleteConfirmId)
              }
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to delete
          this lead?
        </p>
      </Modal>

      {/* Toast */}
      <Toast />
    </div>
  );
};

export default DashboardPage;