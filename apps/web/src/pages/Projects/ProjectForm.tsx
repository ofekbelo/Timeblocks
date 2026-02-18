import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProjectSchema,
  type CreateProjectInput,
} from '@timeblocks/shared/schemas';
import { ProjectStatus } from '@timeblocks/shared/types';
import { DEFAULT_COLORS } from '@timeblocks/shared/constants';
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetProjectQuery,
} from '@/store/api/projectsApi';
import { useGetClientsQuery } from '@/store/api/clientsApi';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import styles from './Projects.module.scss';

export function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(id!, {
    skip: !isEditing,
  });
  const { data: clients = [] } = useGetClientsQuery();

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      status: ProjectStatus.ACTIVE,
      color: DEFAULT_COLORS[0],
    },
  });

  const selectedColor = watch('color');

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        clientId: project.clientId || undefined,
        hourlyRate: project.hourlyRate || undefined,
        estimatedBudget: project.estimatedBudget || undefined,
        startDate: project.startDate || undefined,
        endDate: project.endDate || undefined,
        color: project.color,
        status: project.status as ProjectStatus,
      });
    }
  }, [project, reset]);

  const onSubmit = async (data: CreateProjectInput) => {
    try {
      if (isEditing) {
        await updateProject({ id: id!, data }).unwrap();
      } else {
        await createProject(data).unwrap();
      }
      navigate('/projects');
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  if (isEditing && isLoadingProject) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className={styles.formPage}>
      <div className={styles.header}>
        <h1>{isEditing ? 'Edit Project' : 'New Project'}</h1>
      </div>

      <Card variant="outlined" padding="lg">
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Project Name *</label>
            <Input
              id="name"
              {...register('name')}
              error={errors.name?.message}
              fullWidth
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="clientId">Client</label>
            <select
              id="clientId"
              {...register('clientId')}
              className={styles.select}
            >
              <option value="">No client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.clientId && (
              <span className={styles.error}>{errors.clientId.message}</span>
            )}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="hourlyRate">Hourly Rate ($)</label>
              <Input
                id="hourlyRate"
                type="number"
                step="0.01"
                {...register('hourlyRate', { valueAsNumber: true })}
                error={errors.hourlyRate?.message}
                fullWidth
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="estimatedBudget">Estimated Budget ($)</label>
              <Input
                id="estimatedBudget"
                type="number"
                step="0.01"
                {...register('estimatedBudget', { valueAsNumber: true })}
                error={errors.estimatedBudget?.message}
                fullWidth
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="startDate">Start Date</label>
              <Input
                id="startDate"
                type="date"
                {...register('startDate')}
                error={errors.startDate?.message}
                fullWidth
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="endDate">End Date</label>
              <Input
                id="endDate"
                type="date"
                {...register('endDate')}
                error={errors.endDate?.message}
                fullWidth
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="status">Status</label>
            <select id="status" {...register('status')} className={styles.select}>
              <option value={ProjectStatus.ACTIVE}>Active</option>
              <option value={ProjectStatus.ON_HOLD}>On Hold</option>
              <option value={ProjectStatus.COMPLETED}>Completed</option>
              <option value={ProjectStatus.ARCHIVED}>Archived</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Project Color</label>
            <div className={styles.colorPicker}>
              {DEFAULT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`${styles.colorButton} ${
                    selectedColor === color ? styles.selected : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setValue('color', color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/projects')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isCreating || isUpdating}
            >
              {isEditing ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
