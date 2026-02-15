import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cvService } from '../services/cvService';

// TanStack Query is used ONLY for the CV list page
export const useCVList = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['cvs'],
    queryFn: cvService.getMyCVs,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['cvs'] });

  return { ...query, invalidate };
};

// Plain fetch helpers for create/update/delete/single CV
export const useCVActions = () => {
  const [saving, setSaving] = useState(false);

  const createCV = useCallback(async (cvData) => {
    setSaving(true);
    try {
      return await cvService.createCV(cvData);
    } finally {
      setSaving(false);
    }
  }, []);

  const updateCV = useCallback(async ({ id, ...cvData }) => {
    setSaving(true);
    try {
      return await cvService.updateCV({ id, ...cvData });
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteCV = useCallback(async (id) => {
    return await cvService.deleteCV(id);
  }, []);

  return { createCV, updateCV, deleteCV, saving };
};
