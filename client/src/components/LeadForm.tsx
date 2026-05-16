import React, { useEffect, useState } from 'react';
import { Lead, LeadStatus, LeadSource, CreateLeadPayload, UpdateLeadPayload } from '../types';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from './Button';

interface LeadFormProps {
  lead?: Lead;
  onSubmit: (data: CreateLeadPayload | UpdateLeadPayload) => void;
  isLoading?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({ lead, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<CreateLeadPayload>({
    name: lead?.name || '',
    email: lead?.email || '',
    source: lead?.source || LeadSource.WEBSITE,
    status: lead?.status || LeadStatus.NEW,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.source) {
      newErrors.source = 'Source is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      <Select
        label="Source"
        value={formData.source}
        onChange={(e) => setFormData({ ...formData, source: e.target.value as LeadSource })}
        options={Object.values(LeadSource).map((src) => ({ value: src, label: src }))}
        error={errors.source}
      />
      <Select
        label="Status"
        value={formData.status || LeadStatus.NEW}
        onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
        options={Object.values(LeadStatus).map((sts) => ({ value: sts, label: sts }))}
      />
      <Button type="submit" isLoading={isLoading} className="w-full">
        {lead ? 'Update Lead' : 'Create Lead'}
      </Button>
    </form>
  );
};
