import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lifegoals';

  // Definimos el arreglo de opciones para el menú de navegación
  menuOptions = [
    { label: 'Home', route: '/home' },
    { label: 'About', route: '/about' }
  ];
}
