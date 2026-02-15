import { useState, useEffect, useCallback } from 'react';
import { cvService } from '../services/cvService';

export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const data = await cvService.getApplications();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const createApplication = async (appData) => {
    const data = await cvService.createApplication(appData);
    setApplications((prev) => [data, ...prev]);
    return data;
  };

  const updateApplication = async ({ id, ...appData }) => {
    const data = await cvService.updateApplication({ id, ...appData });
    setApplications((prev) => prev.map((a) => (a._id === id ? data : a)));
    return data;
  };

  const deleteApplication = async (id) => {
    await cvService.deleteApplication(id);
    setApplications((prev) => prev.filter((a) => a._id !== id));
  };

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    createApplication,
    updateApplication,
    deleteApplication,
  };
};
