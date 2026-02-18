import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetClientsQuery, useDeleteClientMutation } from '@/store/api/clientsApi';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Modal } from '@/components/ui/Modal';
import styles from './Clients.module.scss';

export function ClientsList() {
  const navigate = useNavigate();
  const { data: clients = [], isLoading } = useGetClientsQuery();
  const [deleteClient] = useDeleteClientMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && !client.isArchived;
  });

  const handleDelete = async () => {
    if (!clientToDelete) return;

    try {
      await deleteClient(clientToDelete).unwrap();
      setClientToDelete(null);
    } catch (error) {
      console.error('Failed to delete client:', error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
        <p>Loading clients...</p>
      </div>
    );
  }

  return (
    <div className={styles.clientsPage}>
      <div className={styles.header}>
        <div>
          <h1>Clients</h1>
          <p>Manage your clients and contacts</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/clients/new')}>
          + New Client
        </Button>
      </div>

      <Card variant="outlined" padding="lg">
        <input
          type="search"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </Card>

      {filteredClients.length === 0 ? (
        <Card>
          <div className={styles.empty}>
            <p>No clients found. Create your first client!</p>
            <Button variant="primary" onClick={() => navigate('/clients/new')}>
              + New Client
            </Button>
          </div>
        </Card>
      ) : (
        <div className={styles.grid}>
          {filteredClients.map((client) => (
            <Card key={client.id} variant="elevated" padding="lg">
              <div className={styles.clientCard}>
                <div
                  className={styles.avatar}
                  style={{ backgroundColor: client.color }}
                >
                  {client.name.charAt(0).toUpperCase()}
                </div>

                <div className={styles.content}>
                  <h3>{client.name}</h3>
                  {client.email && <p className={styles.email}>📧 {client.email}</p>}
                  {client.phone && <p className={styles.phone}>📱 {client.phone}</p>}

                  <div className={styles.actions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/clients/${client.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/clients/${client.id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setClientToDelete(client.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!clientToDelete}
        onClose={() => setClientToDelete(null)}
        title="Delete Client"
      >
        <p>Are you sure you want to delete this client? This action cannot be undone.</p>
        <div className={styles.modalActions}>
          <Button variant="secondary" onClick={() => setClientToDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
