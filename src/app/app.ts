import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pruebafrontend');

   items: MenuItem[] = [
    {
      label: 'películas',
      icon: 'pi pi-user',
      routerLink: ['/movies']
    },
    {
      label: 'Clima',
      icon: 'pi pi-moon',
      routerLink: ['/clima']
    },
   
  ];
}
