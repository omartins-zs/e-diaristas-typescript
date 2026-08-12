describe('ApiService', () => {
  const originalEnv = process.env.NEXT_PUBLIC_API_URL;

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_URL = originalEnv;
    jest.resetModules();
  });

  it('usa http://127.0.0.1:8000 como baseURL padrão quando a env não é definida', () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    let ApiService: typeof import('./ApiService').ApiService;
    jest.isolateModules(() => {
      ApiService = require('./ApiService').ApiService;
    });
    expect(ApiService.defaults.baseURL).toBe('http://127.0.0.1:8000');
  });

  it('usa NEXT_PUBLIC_API_URL como baseURL quando definida', () => {
    process.env.NEXT_PUBLIC_API_URL = 'http://api.exemplo.com';
    let ApiService: typeof import('./ApiService').ApiService;
    jest.isolateModules(() => {
      ApiService = require('./ApiService').ApiService;
    });
    expect(ApiService.defaults.baseURL).toBe('http://api.exemplo.com');
  });

  it('configura o header Content-Type como application/json', () => {
    let ApiService: typeof import('./ApiService').ApiService;
    jest.isolateModules(() => {
      ApiService = require('./ApiService').ApiService;
    });
    expect(ApiService.defaults.headers['Content-Type']).toBe('application/json');
  });
});
