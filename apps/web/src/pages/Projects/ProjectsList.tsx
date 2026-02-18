import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProjectsQuery, useDeleteProjectMutation } from '@/store/api/projectsApi';
import { useGetClientsQuery } from '@/store/api/clientsApi';
import { ProjectStatus } from '@timeblocks/shared/types';
import { PROJECT_STATUS_LABELS } from '@timeblocks/shared/constants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { Modal } from '@/components/ui/Modal';
import styles from './Projects.module.scss';

export function ProjectsList() {
  const navigate = useNavigate();
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const { data: clients = [] } = useGetClientsQuery();
  const [deleteProject] = useDeleteProjectMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = !selectedClient || project.clientId === selectedClient;
    const matchesStatus = !selectedStatus || project.status === selectedStatus;
    return matchesSearch && matchesClient && matchesStatus && !project.isArchived;
  });

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProject(projectToDelete).unwrap();
      setProjectToDelete(null);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className={styles.projectsPage}>
      <div className={styles.header}>
        <div>
          <h1>Projects</h1>
          <p>Manage your projects and track time</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/projects/new')}>
          + New Project
        </Button>
      </div>

      <Card variant="outlined" padding="lg">
        <div className={styles.filters}>
          <input
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Clients</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Statuses</option>
            {Object.values(ProjectStatus).map((status) => (
              <option key={status} value={status}>
                {PROJECT_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {filteredProjects.length === 0 ? (
        <Card>
          <div className={styles.empty}>
            <p>No projects found. Create your first project!</p>
            <Button variant="primary" onClick={() => navigate('/projects/new')}>
              + New Project
            </Button>
          </div>
        </Card>
      ) : (
        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <Card key={project.id} variant="elevated" padding="lg">
              <div className={styles.projectCard}>
                <div
                  className={styles.colorBar}
                  style={{ backgroundColor: project.color }}
                />

                <div className={styles.content}>
                  <div className={styles.top}>
                    <h3>{project.name}</h3>
                    <Badge variant={project.status === 'ACTIVE' ? 'success' : 'gray'}>
                      {PROJECT_STATUS_LABELS[project.status]}
                    </Badge>
                  </div>

                  {project.client && (
                    <p className={styles.client}>
                      👤 {project.client.name}
                    </p>
                  )}

                  {project.hourlyRate && (
                    <p className={styles.rate}>
                      💰 ${project.hourlyRate}/hour
                    </p>
                  )}

                  <div className={styles.actions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/projects/${project.id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setProjectToDelete(project.id)}
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
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        title="Delete Project"
      >
        <p>Are you sure you want to delete this project? This action cannot be undone.</p>
        <div className={styles.modalActions}>
          <Button variant="secondary" onClick={() => setProjectToDelete(null)}>
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
