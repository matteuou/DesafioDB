import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Rex - pessoa 1");
    expect(resultado.lista[1]).toBe("Fofo - abrigo");
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[0]).toBe("Mimi - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Rex - abrigo");
    expect(resultado.lista[3]).toBe("Bola - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });
});

describe("Abrigo de Animais - testes extras", () => {
  let abrigo;

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test("Deve retornar erro para animal inválido na ordem", () => {
    const resultado = abrigo.encontraPessoas(
      "BOLA,RATO",
      "LASER",
      "Rex, FakeAnimal"
    );
    expect(resultado).toEqual({ erro: "Animal inválido" });
  });

  test("Deve retornar erro para animal repetido na ordem", () => {
    const resultado = abrigo.encontraPessoas("BOLA,RATO", "LASER", "Rex,Rex");
    expect(resultado).toEqual({
      erro: "Animal selecionado mais de uma vez",
    });
  });

  test("Deve retonar erro para brinquedo inválido em brinquedosPessoa1", () => {
    const resultado = abrigo.encontraPessoas(
      "BOLA,RATOZINHO",
      "LASER",
      "Rex,Mimi"
    );
    expect(resultado).toEqual({ erro: "Brinquedo inválido" });
  });

  test("Deve retornar erro para brinquedo repetido em brinquedosPessoa2", () => {
    const resultado = abrigo.encontraPessoas(
      "BOLA,RATO",
      "LASER,LASER",
      "Rex,Mimi"
    );
    expect(resultado).toEqual({
      erro: "Brinquedo selecionado mais de uma vez",
    });
  });

  test("Pessoa 1 adota um animal quando possui brinquedos favoritos na ordem correta", () => {
    const resultado = abrigo.encontraPessoas("RATO,BOLA", "BOLA,RATO", "Rex");
    expect(resultado.lista).toContain("Rex - pessoa 1");
  });

  test("Pessoa 2 adota um animal quando possui brinquedos favoritos na ordem correta", () => {
    const resultado = abrigo.encontraPessoas("LASER", "RATO,BOLA", "Rex");
    expect(resultado.lista).toContain("Rex - pessoa 2");
  });

  test("Ninguém adota se brinquedos não estão na ordem correta", () => {
    const resultado = abrigo.encontraPessoas("BOLA,RATO", "BOLA,RATO", "Rex");
    expect(resultado.lista).toContain("Rex - abrigo");
  });

  test("Animal Loco só pode ser adotado se pessoa já adotou pelo menos 1 animal e possui brinquedo favorito", () => {
    const resultado1 = abrigo.encontraPessoas("SKATE", "", "Loco");
    expect(resultado1.lista).toContain("Loco - abrigo");

    const resultado2 = abrigo.encontraPessoas(
      "RATO,BOLA,SKATE",
      "",
      "Rex,Loco"
    );
    expect(resultado2.lista).toContain("Rex - pessoa 1");
    expect(resultado2.lista).toContain("Loco - pessoa 1");
  });

  test("Pessoa não pode adotar mais de três animais", () => {
    const brinquedosPessoa1 = "RATO,BOLA,CAIXA,NOVELO,LASER,SKATE";
    const brinquedosPessoa2 = "LASER";

    const ordemAnimais = "Rex,Mimi,Fofo,Zero,Bola,Bebe,Loco";

    const abrigo = new AbrigoAnimais();
    const resultado = abrigo.encontraPessoas(
      brinquedosPessoa1,
      brinquedosPessoa2,
      ordemAnimais
    );

    const adotadosPessoa1 = resultado.lista.filter((item) =>
      item.includes("pessoa 1")
    );

    expect(adotadosPessoa1.length).toBeLessThanOrEqual(3);
  });
});
