export interface AuditLog {
  _id?: string;
  appId?: string;
  action: string;
  entityId?: string;
  entityType?: string;
  createdAt?: string;
  userEmail?: string;
  changedFields?: Record<string, unknown>;
  previousState?: Record<string, unknown>;
  [key: string]: unknown;
}
