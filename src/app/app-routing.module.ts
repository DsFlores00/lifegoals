import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. Importamos los componentes que acabas de generar
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// 2. Definimos el mapeo de las rutas de la aplicación
const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'about', 
    component: AboutComponent 
  },
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  }, // Redirección por defecto
  { 
    path: '**', 
    redirectTo: '/home' 
  }                  // Comodín para rutas inexistentes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
