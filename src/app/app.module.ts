import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Indispensable para el CRUD con [(ngModel)]

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 1. Importamos los componentes locales de la aplicación
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// 2. Importamos los módulos oficiales de Firebase para Angular
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// 3. Importamos el archivo de configuración del entorno (desarrollo/producción)
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent // Se declaran aquí para que el módulo les dé alcance
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Activamos directivas de formularios como ngModel en nuestras vistas

    // Inicializamos Firebase inyectándole el objeto de credenciales del environment
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule // Habilita la inyección de dependencias para usar la BD Firestore
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
