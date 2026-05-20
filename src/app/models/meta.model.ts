export class MetaModel {
  id?: string;     // Identificador único autogenerado por Firestore (opcional)
  meta: string;    // El texto descriptivo de nuestra meta en la vida

  constructor(meta: string, id?: string) {
    this.meta = meta;
    if (id) {
      this.id = id;
    }
  }
}
