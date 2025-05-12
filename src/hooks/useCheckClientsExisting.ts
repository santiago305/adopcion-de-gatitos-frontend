import { useEffect, useState } from 'react';
import { checkExistingClient } from '@/services/clientsService';

export const useCheckExistingClient = () => {
  const [isClient, setIsClient] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientStatus = async () => {
      try {
        const exists = await checkExistingClient();
        setIsClient(exists); 
      } catch (error) {
        console.error('Error al comprobar la existencia del cliente:', error);
        setIsClient(false); 
      } finally {
        setLoading(false);
      }
    };

    fetchClientStatus();
  }, []);

  return { isClient, loading };
};
