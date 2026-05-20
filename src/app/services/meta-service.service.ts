import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetaModel } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
  
  // Definimos el nombre de la colección tal como lo pide el PDF
  private collectionName = 'metas';

  // Inyectamos la dependencia de AngularFirestore en el constructor
  constructor(private firestore: AngularFirestore) { }

  /**
   * 1. OPERACIÓN DE LECTURA (Consultas)
   * Recupera todos los documentos de la colección 'metas'.
   * Usa pipe y map para extraer el ID único que genera Firestore junto con los datos del documento.
   */
  getMetas(): Observable<MetaModel[]> {
    return this.firestore.collection<MetaModel>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as MetaModel;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  /**
   * 2. OPERACIÓN DE ALTA (Agregar)
   * Recibe un objeto de tipo MetaModel (sin ID) y lo inserta en la colección de Firestore.
   */
  addMeta(nuevaMeta: MetaModel): Promise<any> {
    // Convertimos el objeto a un formato JSON plano para Firebase
    const metaPlana = { meta: nuevaMeta.meta };
    return this.firestore.collection(this.collectionName).add(metaPlana);
  }

  /**
   * 3. OPERACIÓN DE ELIMINACIÓN (Borrar)
   * Recibe el ID único de un documento y lo elimina físicamente de la colección.
   */
  deleteMeta(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
