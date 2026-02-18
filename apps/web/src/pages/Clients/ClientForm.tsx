import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createClientSchema,
  type CreateClientInput,
} from '@timeblocks/shared/schemas';
import { DEFAULT_COLORS } from '@timeblocks/shared/constants';
import {
  useCreateClientMutation,
  useUpdateClientMutation,
  useGetClientQuery,
} from '@/store/api/clientsApi';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import styles from './Clients.module.scss';

export function ClientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { data: client, isLoading: isLoadingClient } = useGetClientQuery(id!, {
    skip: !isEditing,
  });

  const [createClient, { isLoading: isCreating }] = useCreateClientMutation();
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateClientInput>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      color: DEFAULT_COLORS[0],
    },
  });

  const selectedColor = watch('color');

  useEffect(() => {
    if (client) {
      reset({
        name: client.name,
        email: client.email || undefined,
        phone: client.phone || undefined,
        address: client.address || undefined,
        notes: client.notes || undefined,
        color: client.color,
      });
    }
  }, [client, reset]);

  const onSubmit = async (data: CreateClientInput) => {
    try {
      if (isEditing) {
        await updateClient({ id: id!, data }).unwrap();
      } else {
        await createClient(data).unwrap();
      }
      navigate('/clients');
    } catch (error) {
      console.error('Failed to save client:', error);
    }
  };

  if (isEditing && isLoadingClient) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
        <p>Loading client...</p>
      </div>
    );
  }

  return (
    <div className={styles.formPage}>
      <div className={styles.header}>
        <h1>{isEditing ? 'Edit Client' : 'New Client'}</h1>
      </div>

      <Card variant="outlined" padding="lg">
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Client Name *</label>
            <Input
              id="name"
              {...register('name')}
              error={errors.name?.message}
              fullWidth
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                fullWidth
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">Phone</label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                error={errors.phone?.message}
                fullWidth
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="address">Address</label>
            <Input
              id="address"
              {...register('address')}
              error={errors.address?.message}
              fullWidth
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              {...register('notes')}
              className={styles.textarea}
              rows={4}
              placeholder="Additional notes about this client..."
            />
            {errors.notes && (
              <span className={styles.error}>{errors.notes.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label>Client Color</label>
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
              onClick={() => navigate('/clients')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isCreating || isUpdating}
            >
              {isEditing ? 'Update Client' : 'Create Client'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
