import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Movie } from './features/movie/movie';

export const routes: Routes = [
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'movies', component: Movie },
    { path: 'clima', component: Home },
];
