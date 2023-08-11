class CaixaDaLanchonete {
  #produtos = new Map();

  constructor() {
    this.#produtos.set("cafe", 3.0);
    this.#produtos.set("chantily", 1.5);
    this.#produtos.set("suco", 6.2);
    this.#produtos.set("sanduiche", 6.5);
    this.#produtos.set("queijo", 2.0);
    this.#produtos.set("salgado", 7.25);
    this.#produtos.set("combo1", 9.5);
    this.#produtos.set("combo2", 7.5);
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0;
    let invalido = false;
    let inexistente = false;
    let produtos = new Set();

    itens.forEach((item) => {
      const [codigo, qtd] = item.split(",");

      if (qtd < 1) {
        invalido = true;
        return;
      }

      if (this.#produtos.has(codigo)) {
        produtos.add(codigo);
        const custo = this.#produtos.get(codigo);
        total += custo * qtd;
      } else {
        inexistente = true;
        return;
      }
    });

    if (
      (produtos.has("queijo") && !produtos.has("sanduiche")) ||
      (produtos.has("chantily") && !produtos.has("cafe"))
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (invalido) {
      return "Quantidade inválida!";
    }

    if (inexistente) {
      return "Item inválido!";
    }

    if (metodoDePagamento === "dinheiro") {
      total = (total * 95) / 100;
    } else if (metodoDePagamento === "credito") {
      total = (total * 103) / 100;
    } else if (metodoDePagamento === "debito") {
    } else {
      return "Forma de pagamento inválida!";
    }

    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
