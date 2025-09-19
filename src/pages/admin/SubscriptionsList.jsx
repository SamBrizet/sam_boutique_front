import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constantes/constantes';

const SubscriptionsList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/subscriptions`);
        setSubscriptions(response.data);
      } catch (err) {
        setError('Error al cargar las suscripciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <p>Cargando suscripciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Suscripciones</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Fecha de Suscripción</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub._id}>
              <td className="border border-gray-300 px-4 py-2">{sub.email}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(sub.created_at).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">{sub.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionsList;