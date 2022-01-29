import { GameState } from './game.state';


const initialStateMock = jest.fn().mockReturnValue({
  platforms: [],
  coords: [],
  level: null,
  code: null,
  levels: []
})


describe('GameState', () => {
  it('should create an instance', () => {
    expect(new GameState(initialStateMock())).toBeTruthy();
  });
});
