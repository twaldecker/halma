import app from '../../src/app';

describe('\'game\' service', () => {
  it('registered the service', () => {
    const service = app.service('game');
    expect(service).toBeTruthy();
  });
});
