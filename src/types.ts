export enum AuthAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  READ = 'read'
}

export enum AuthPossession {
  ANY = 'any',
  OWN = 'own',
  OWN_ANY = 'own|any'
}
