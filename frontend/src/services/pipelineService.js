import { useMutation } from '@tanstack/react-query';
import { getApiUrl, API_CONFIG } from '../config';

/**
 * React Query hook for parsing pipeline
 * Handles loading, error, and success states automatically
 */
export const useParsePipelineMutation = () => {
  return useMutation({
    mutationFn: async ({ nodes, edges }) => {
      try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.PARSE_PIPELINE), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nodes, edges }),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || `Request failed with ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Pipeline parse error:', error);
        throw error;
      }
    },
    retry: 1,
  });
};
