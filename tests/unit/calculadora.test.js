const calculadora = require("../../models/calculadora.js");

test("Calcular 'String' + Number deveria retornar 'Erro'", () => {
  const resultado = calculadora.calc("String", "+", 5);
  expect(resultado).toBe("Impossível fazer operações em strings");
});

test("Somar 5 + 5 deveria ser 10", () => {
  const resultado = calculadora.calc(5, "+", 5);
  expect(resultado).toBe(10);
});

test("Subtrair 5 - 5 deveria ser 0", () => {
  const resultado = calculadora.calc(5, "-", 5);
  expect(resultado).toBe(0);
});

test("Multiplicar 5 * 5 deveria ser 25", () => {
  const resultado = calculadora.calc(5, "*", 5);
  expect(resultado).toBe(25);
});

test("Dividir 5 / 5 deveria ser 1", () => {
  const resultado = calculadora.calc(5, "/", 5);
  expect(resultado).toBe(1);
});

test("Dividir 5 / 0 deveria retornar 'Impossível dividir por 0'", () => {
  const resultado = calculadora.calc(5, "/", 0);
  expect(resultado).toBe("Impossível dividir por 0");
});
