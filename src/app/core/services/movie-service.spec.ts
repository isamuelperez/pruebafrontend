import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie-service';
import { PaginatedMovieResponse } from '../models/PaginatedMovieResponse.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request trending movies for the selected page', () => {
    const page = 3;
    const mockResponse: PaginatedMovieResponse = {
      page,
      results: [],
      total_pages: 4,
      total_results: 0,
    };

    let response: PaginatedMovieResponse | undefined;

    service.getAllMovies(page).subscribe((data) => {
      response = data;
    });

    const req = httpMock.expectOne((request) =>
      request.method === 'GET' &&
      request.url === 'https://api.themoviedb.org/3/trending/all/day' &&
      request.params.get('language') === 'en-US' &&
      request.params.get('page') === page.toString()
    );

    expect(req.request.headers.get('Authorization')).toBeTruthy();

    req.flush(mockResponse);

    expect(response).toEqual(mockResponse);
  });
});
