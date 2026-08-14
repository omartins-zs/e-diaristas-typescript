import theme from './theme';

describe('theme', () => {
  it('define as cores primárias e secundárias esperadas', () => {
    expect(theme.palette.primary.main).toBe('#6B2AEE');
    expect(theme.palette.secondary.main).toBe('#02E7D9');
  });

  it('define a fonte padrão como Poppins', () => {
    expect(theme.typography.fontFamily).toBe('Poppins');
  });

  it('define o raio de borda padrão', () => {
    expect(theme.shape.borderRadius).toBe(3);
  });
});
