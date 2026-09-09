import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Movie } from './movie';
import { MovieService } from '../../core/services/movie-service';

describe('Movie', () => {
  let component: Movie;
  let fixture: ComponentFixture<Movie>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    movieService = jasmine.createSpyObj<MovieService>('MovieService', ['getAllMovies'], {
      getAllMovies: jasmine.createSpy().and.returnValue(
        of({
          page: 1,
          results: [],
          total_pages: 1,
          total_results: 0,
        })
      ),
    });

    await TestBed.configureTestingModule({
      imports: [Movie],
      providers: [{ provide: MovieService, useValue: movieService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Movie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    expect(movieService.getAllMovies).toHaveBeenCalledWith(1);
    expect(component['allMovies']()).toEqual([]);
  });
});
