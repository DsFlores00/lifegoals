import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  // Objeto estructurado con tu información de contacto profesional
  developerProfile = {
    name: 'Flores Aguilar Denisse',
    role: 'Estudiante de Ingenieria de Software',
    institution: 'Universidad Veracruzana',
    email: 'flores93@gmail.com',
    phone: '2721543043',                 
    github: 'https://github.com/DsFlores00',
    status: 'Estatus: Funcionando desde workflow'
  };

  constructor() { }

  ngOnInit(): void {
  }
}
