import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MovieApiResult } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie-service';

@Component({
  imports: [TableModule, ButtonModule, DialogModule, FormsModule],
  selector: 'app-movie',
  styleUrl: './movie.css',
  templateUrl: './movie.html',
})
export class Movie implements OnInit {
  private readonly movieService = inject(MovieService);

  protected readonly allMovies = signal<MovieApiResult[]>([]);
  protected readonly filterValue = signal('');
  protected readonly selectedMovie = signal<MovieApiResult | null>(null);
  protected readonly openDialog = signal(false);

  protected readonly currentPage = signal(1);
  protected readonly totalPages = signal(1);
  protected readonly totalResults = signal(0);

  protected readonly displayedMovies = computed(() => {
    const query = this.filterValue().trim().toLowerCase();
    const movies = this.allMovies();

    if (!query) {
      return movies;
    }

    return movies.filter((movie) => {
      const title = (movie.title ?? movie.name ?? '').toLowerCase();
      const originalTitle = (movie.original_title ?? movie.original_name ?? '').toLowerCase();
      return title.includes(query) || originalTitle.includes(query);
    });
  });

  ngOnInit(): void {
    this.getAllMovies(this.currentPage());
  }

  getAllMovies(page = 1): void {
    this.movieService.getAllMovies(page).subscribe({
      next: (response) => {
        console.log('Respuesta de la API:', response);
        this.allMovies.set(response.results ?? []);
        this.currentPage.set(response.page ?? page);
        this.totalPages.set(response.total_pages ?? 1);
        this.totalResults.set(response.total_results ?? 0);
      },
      error: (error) => {
        console.error('Error al cargar películas:', error);
        this.allMovies.set([]);
        this.totalPages.set(1);
        this.totalResults.set(0);
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.getAllMovies(page);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  openMovie(movie: MovieApiResult): void {
    this.selectedMovie.set(movie);
    this.openDialog.set(true);
  }

  onSort(event: { field?: string; order?: number }): void {
    const field = event.field ?? 'id';
    const order = event.order ?? 1;

    const sortedMovies = [...this.allMovies()].sort((a, b) => {
      const left = this.getSortValue(a, field);
      const right = this.getSortValue(b, field);

      if (left < right) {
        return order === 1 ? -1 : 1;
      }

      if (left > right) {
        return order === 1 ? 1 : -1;
      }

      return 0;
    });

    this.allMovies.set(sortedMovies);
  }

  private getSortValue(movie: MovieApiResult, field: string): string | number {
    switch (field) {
      case 'id':
        return movie.id;
      case 'title':
        return movie.title ?? movie.name ?? '';
      case 'release_date':
        return movie.release_date ?? movie.first_air_date ?? '';
      case 'popularity':
        return movie.popularity ?? 0;
      default:
        return movie.id;
    }
  }

  closeDialog(): void {
    this.openDialog.set(false);
    this.selectedMovie.set(null);
  }
}
