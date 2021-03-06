import { screen } from '@testing-library/dom';
import Deck from 'cardHolders/deck';
import { ranks } from 'constants/ranks';
import { suits } from 'constants/suits';
import * as animate from 'utils/animate';

describe('Deck', () => {
  let deck: Deck;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (animate as any).default = (animations: animate.Animation[]) => {
      animations.forEach(({ onStart, onProgress, onEnd }) => {
        onStart?.();
        onProgress?.(0.996);
        onEnd?.();
      });
    };
  });

  beforeEach(() => {
    const elem = document.createElement('div');

    elem.setAttribute('data-testid', 'deck');
    document.body.append(elem);
    deck = new Deck(elem, suits, ranks);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should create deck', () => {
    expect(deck.count).toBe(52);
  });

  it('should show intro', () => {
    const { children: cards } = screen.getByTestId('deck');
    const transforms = Array.from(cards).map(
      (elem) => (elem as HTMLElement).style.transform
    );

    deck.intro();

    expect(transforms).not.toStrictEqual(
      Array.from(cards).map((elem) => (elem as HTMLElement).style.transform)
    );
  });

  it('should shuffle cards', () => {
    const { children: cards } = screen.getByTestId('deck');
    const transforms = Array.from(cards).map(
      (elem) => (elem as HTMLElement).style.transform
    );
    const foregrounds = Array.from(cards).map(
      (elem) => (elem as HTMLElement).style.zIndex
    );

    deck.shuffle();

    expect(transforms).not.toStrictEqual(
      Array.from(cards).map((elem) => (elem as HTMLElement).style.transform)
    );
    expect(foregrounds).not.toStrictEqual(
      Array.from(cards).map((elem) => (elem as HTMLElement).style.zIndex)
    );
  });

  it('should return top position', () => {
    expect(deck.getOffsetTop()).toStrictEqual(expect.any(Object));
  });
});
