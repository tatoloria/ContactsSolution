import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and return a token', () => {
    const dummyToken = { token: '12345' };
    const username = 'testuser';
    const password = 'password';

    service.login(username, password).subscribe(token => {
      expect(token).toEqual(dummyToken);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });
    req.flush(dummyToken);
  });

  it('should register a new user', () => {
    const user = {
      username: 'newuser',
      email: 'newuser@example.com',
      contacts: '',
      passwordHash: 'newpassword'
    };

    service.register(user).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service.apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
    req.flush({});
  });

  it('should store and retrieve a token', () => {
    const token = '12345';
    service.setToken(token);
    expect(service.getToken()).toBe(token);
  });

  it('should remove token on logout', () => {
    const token = '12345';
    service.setToken(token);
    service.logout();
    expect(service.getToken()).toBeNull();
  });

  it('should check if user is authenticated', () => {
    expect(service.isAuthenticated()).toBeFalse();
    service.setToken('12345');
    expect(service.isAuthenticated()).toBeTrue();
  });
});
