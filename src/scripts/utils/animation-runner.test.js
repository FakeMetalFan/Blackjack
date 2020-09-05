import { getAnimation } from './animation';
import { runAnimations } from './animation-runner.js';

describe('runAnimations', () => {
  let callbackSpy;

  beforeEach(() => callbackSpy = jest.fn());

  it('should return a Promise', () => {
    expect(runAnimations([])).toBeInstanceOf(Promise);
  });

  it('should not resolve a promise until all the animations have completed', () => {
    const spy = jest.fn();

    runAnimations([getAnimation({ duration: 50 })]).then(spy);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should resolve a promise upon all the animations completion', () => {
    expect(runAnimations([])).resolves.toBe(void 0);
  });

  it('should call "requestAnimationFrame" api', async () => {
    const spy = jest.spyOn(window, 'requestAnimationFrame');

    await runAnimations([]);

    expect(spy).toHaveBeenCalled();
  });

  it('should execute "onStart" callback', async () => {
    await runAnimations([getAnimation({ onStart: callbackSpy })]);

    expect(callbackSpy).toHaveBeenCalled();
  });

  it('should execute "onProgress" callback', async () => {
    await runAnimations([getAnimation({ onProgress: callbackSpy })]);

    expect(callbackSpy).toHaveBeenCalledWith(expect.any(Number));
  });

  it('should execute "onEnd" callback', async () => {
    const duration = 50;

    await runAnimations([
      getAnimation({ duration, onEnd: callbackSpy }),
      getAnimation(({ duration, delay: 50, onEnd: callbackSpy })),
    ]);

    expect(callbackSpy).toHaveBeenCalledTimes(2);
  });
});