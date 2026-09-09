import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedMovieResponse } from '../models/PaginatedMovieResponse.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Service()
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.themoviedb.org/3/trending/all/day';

  private readonly headers = new HttpHeaders({
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Zjc4NmExZWUzNzRlMzQ4OWNhN2UwMDNlYTU5NGZmZCIsIm5iZiI6MTc4ODkxNjI2MS4zODUsInN1YiI6IjZhYTBiMjI1Y2QxYjlkMTMwNzRmYzcxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P1sytxY6nIHslullI6Nc05gclUIHYf-BzW1MXFImI0A',
  });

  getAllMovies(page = 1): Observable<PaginatedMovieResponse> {
    const params = new HttpParams().set('language', 'en-US').set('page', page.toString());

    return this.http.get<PaginatedMovieResponse>(this.apiUrl, {
      headers: this.headers,
      params,
    });
  }
}
