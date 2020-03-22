import app from '../../src/app';

describe('\'connection\' service', () => {
  it('registered the service', () => {
    const service = app.service('connection');
    expect(service).toBeTruthy();
  });
});
