export const mockMathRandom = (): void => {
  jest.spyOn(Math, 'random').mockReturnValueOnce(1).mockReturnValueOnce(2);
};
