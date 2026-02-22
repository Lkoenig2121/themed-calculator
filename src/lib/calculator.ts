/**
 * PEMDAS calculator: Parentheses, Exponents, Multiplication, Division, Addition, Subtraction
 * Evaluates math expressions with correct order of operations.
 */

type Token =
  | { type: "number"; value: number }
  | { type: "operator"; value: "+" | "-" | "*" | "/" | "^" }
  | { type: "paren"; value: "(" | ")" };

function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  const cleaned = expression.replace(/\s/g, "");
  let i = 0;

  while (i < cleaned.length) {
    const char = cleaned[i];

    if (char === "(" || char === ")") {
      tokens.push({ type: "paren", value: char });
      i++;
    } else if (char === "+" || char === "-" || char === "*" || char === "/" || char === "^") {
      tokens.push({ type: "operator", value: char });
      i++;
    } else if (/\d|\./.test(char)) {
      let num = "";
      while (i < cleaned.length && /[\d.]/.test(cleaned[i])) {
        num += cleaned[i];
        i++;
      }
      const n = parseFloat(num);
      if (isNaN(n)) return [];
      tokens.push({ type: "number", value: n });
    } else {
      i++;
    }
  }

  return tokens;
}

function parsePrimary(tokens: Token[], pos: { i: number }): number | null {
  if (pos.i >= tokens.length) return null;

  const token = tokens[pos.i];

  if (token.type === "number") {
    pos.i++;
    return token.value;
  }

  if (token.type === "paren" && token.value === "(") {
    pos.i++;
    const inner = parseExpression(tokens, pos);
    if (inner === null) return null;
    if (pos.i < tokens.length && tokens[pos.i].type === "paren" && tokens[pos.i].value === ")") {
      pos.i++;
    }
    return inner;
  }

  if (token.type === "operator" && (token.value === "+" || token.value === "-")) {
    const isNeg = token.value === "-";
    pos.i++;
    const right = parsePrimary(tokens, pos);
    if (right === null) return null;
    return isNeg ? -right : right;
  }

  return null;
}

function parseExponent(tokens: Token[], pos: { i: number }): number | null {
  let left = parsePrimary(tokens, pos);
  if (left === null) return null;

  while (pos.i < tokens.length) {
    const t = tokens[pos.i];
    if (t.type === "operator" && t.value === "^") {
      pos.i++;
      const right = parseExponent(tokens, pos);
      if (right === null) return null;
      left = Math.pow(left, right);
    } else {
      break;
    }
  }

  return left;
}

function parseMulDiv(tokens: Token[], pos: { i: number }): number | null {
  let left = parseExponent(tokens, pos);
  if (left === null) return null;

  while (pos.i < tokens.length) {
    const t = tokens[pos.i];
    if (t.type === "operator") {
      if (t.value === "*") {
        pos.i++;
        const right = parseExponent(tokens, pos);
        if (right === null) return null;
        left *= right;
      } else if (t.value === "/") {
        pos.i++;
        const right = parseExponent(tokens, pos);
        if (right === null) return null;
        if (right === 0) return NaN;
        left /= right;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return left;
}

function parseExpression(tokens: Token[], pos: { i: number }): number | null {
  let left = parseMulDiv(tokens, pos);
  if (left === null) return null;

  while (pos.i < tokens.length) {
    const t = tokens[pos.i];
    if (t.type === "operator" && (t.value === "+" || t.value === "-")) {
      pos.i++;
      const right = parseMulDiv(tokens, pos);
      if (right === null) return null;
      left = t.value === "+" ? left + right : left - right;
    } else {
      break;
    }
  }

  return left;
}

export function evaluate(expression: string): string {
  if (!expression.trim()) return "";

  const tokens = tokenize(expression);
  if (tokens.length === 0) return "Error";

  const pos = { i: 0 };
  const result = parseExpression(tokens, pos);

  if (result === null || pos.i < tokens.length) return "Error";
  if (Number.isNaN(result)) return "Error";
  if (!Number.isFinite(result)) return "Error";

  const formatted = Number.isInteger(result)
    ? result.toString()
    : parseFloat(result.toPrecision(14)).toString();

  return formatted;
}
