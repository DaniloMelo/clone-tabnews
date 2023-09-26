function calculadora(num1, operador, num2) {
  if (typeof num1 === "string" || typeof num2 === "string") {
    return "Impossível fazer operações em strings";
  }

  if (operador === "/" && num2 === 0) {
    return "Impossível dividir por 0";
  }

  if (operador === "+") {
    return num1 + num2;
  } else if (operador === "-") {
    return num1 - num2;
  } else if (operador === "*") {
    return num1 * num2;
  } else {
    return num1 / num2;
  }
}

exports.calc = calculadora;
