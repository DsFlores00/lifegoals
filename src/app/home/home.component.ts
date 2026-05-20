import { Component, OnInit, OnDestroy } from '@angular/core';
import { MetaServiceService } from '../services/meta-service.service';
import { MetaModel } from '../models/meta.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Instanciamos un objeto limpio del modelo para enlazarlo al formulario de captura
  nuevaMeta: MetaModel = new MetaModel('');
  
  // Arreglo donde almacenaremos las metas recuperadas de la base de datos
  listaMetas: MetaModel[] = [];

  // Propiedad para gestionar la suscripción y evitar fugas de memoria (Memory Leaks)
  private metasSubscription!: Subscription;

  // Inyectamos nuestro servicio mediante inyección de dependencias
  constructor(private metaService: MetaServiceService) { }

  ngOnInit(): void {
    // Nos suscribimos al Observable para escuchar cambios en tiempo real
    this.metasSubscription = this.metaService.getMetas().subscribe({
      next: (data) => {
        this.listaMetas = data;
      },
      error: (err) => {
        console.error('Error al recuperar las metas desde Firestore:', err);
      }
    });
  }

  /**
   * Método para insertar una nueva meta
   */
  agregarMeta(): void {
    // Validación básica para evitar el envío de cadenas vacías o espacios en blanco
    if (!this.nuevaMeta.meta || this.nuevaMeta.meta.trim() === '') {
      return;
    }

    this.metaService.addMeta(this.nuevaMeta)
      .then(() => {
        // Limpiamos el formulario reinicializando el objeto modelo
        this.nuevaMeta = new MetaModel('');
      })
      .catch((error) => {
        console.error('Error al insertar la meta:', error);
      });
  }

  /**
   * Método para eliminar una meta específica mediante su ID único
   */
  borrarMeta(id: string | undefined): void {
    if (!id) {
      console.warn('No se puede eliminar: El documento no posee un ID válido.');
      return;
    }

    this.metaService.deleteMeta(id)
      .then(() => {
        // No es necesario removerlo del arreglo manualmente, 
        // la suscripción en tiempo real se encarga de actualizar la pantalla.
      })
      .catch((error) => {
        console.error('Error al intentar eliminar el documento:', error);
      });
  }

  ngOnDestroy(): void {
    // Desconectamos la escucha activa cuando el usuario cambia de componente (ej. va a About)
    if (this.metasSubscription) {
      this.metasSubscription.unsubscribe();
    }
  }
}

