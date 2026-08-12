import { ValidationService } from './ValidationService';

describe('ValidationService.cep', () => {
  it('retorna false quando nenhum valor é informado (usa o default)', () => {
    expect(ValidationService.cep()).toBe(false);
  });

  it('retorna false para string vazia', () => {
    expect(ValidationService.cep('')).toBe(false);
  });

  it('retorna false quando há menos de 8 dígitos', () => {
    expect(ValidationService.cep('1234567')).toBe(false);
  });

  it('retorna false quando há mais de 8 dígitos', () => {
    expect(ValidationService.cep('123456789')).toBe(false);
  });

  it('ignora caracteres não numéricos ao validar', () => {
    expect(ValidationService.cep('12.345-678')).toBe(true);
  });

  it('retorna true para exatamente 8 dígitos numéricos', () => {
    expect(ValidationService.cep('12345678')).toBe(true);
  });
});
