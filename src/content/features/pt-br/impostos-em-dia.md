---
name: Impostos em dia
slug: impostos-em-dia
tagline: Um relatório mensal pronto para o contador.
summary: Um relatório mensal para MEI, Simples Nacional ou carnê-leão, pronto para mandar ao contador sem planilha.
intro: Um relatório por mês com tudo o que entrou, convertido e emitido. Para MEI, Simples Nacional ou carnê-leão, sem planilha.
benefits:
  - Aviso quando você se aproxima do limite do MEI
  - "Carnê-leão: o valor do mês calculado para você conferir"
  - Acesso só de leitura para o contador
linkLabel: Conhecer os relatórios
hero:
  title: O mês fechado, sem planilha
  lead: Tudo o que entrou, foi convertido e virou nota fiscal, num relatório pronto para você e para o seu contador.
  secondary:
    label: Ver preços
    route: pricing
heroCard:
  kind: vignette
problem:
  title: A planilha do mês é onde o imposto se complica
  beforeLabel: "Planilha do mês"
  afterLabel: "Relatório da Travessia"
  points:
    - label: Números espalhados
      detail: Faturas, câmbios e notas ficam em lugares diferentes e precisam ser somados à mão.
      before: "faturas.xlsx · cambio.pdf · notas por e-mail"
      beforeMono: true
      after:
        kind: "chips"
        primary: "Relatório de outubro"
        items:
          - "6 faturas"
          - "4 conversões"
          - "6 notas"
    - label: Limite do MEI
      detail: Sem acompanhar, você só percebe que passou do limite quando já é tarde.
      before: "Limite do MEI: ?"
      after:
        kind: "meter"
        label: "Receita de 2026"
        value: "R$ 58,3 mil de R$ 81 mil"
        fraction: 0.72
    - label: Carnê-leão
      detail: Quem recebe como pessoa física precisa calcular e pagar todo mês, com o câmbio certo.
      before: "Câmbio do dia: procurar no site do Banco Central"
      after:
        kind: "figure"
        value: "R$ 1.284,20"
        note: "Carnê-leão de outubro, com o câmbio de cada pagamento"
steps:
  - title: Tudo entra sozinho
    detail: Faturas, pagamentos, conversões e notas fiscais ficam no mesmo lugar, com o câmbio de cada dia.
    screen:
      kind: "status"
      title: "Outubro"
      rows:
        - label: "Fatura nº 0041 paga"
          value: "US$ 1,500.00"
        - label: "Conversão para reais"
          value: "R$ 8.120,40"
        - label: "Nota fiscal nº 318"
          value: "Emitida"
          highlight: true
  - title: O relatório fecha o mês
    detail: No primeiro dia útil, sai o relatório do mês no formato do seu regime, MEI, Simples Nacional ou carnê-leão.
    screen:
      kind: "status"
      title: "Relatório de outubro · MEI"
      rows:
        - label: "Receita do mês"
          value: "R$ 10.834,60"
        - label: "Notas emitidas"
          value: "6"
        - label: "Limite do MEI usado"
          value: "72%"
      total:
        label: "Pronto para o contador"
        value: "PDF"
  - title: O contador recebe
    detail: Você manda o relatório com um clique, ou deixa o envio automático.
    screen:
      kind: "message"
      from: "Travessia"
      to: "para Marta Lima, contadora"
      subject: "Relatório de outubro · Ana Ribeiro"
      body: "Receita, conversões e notas do mês, no formato do MEI."
      actions:
        - "Abrir relatório"
        - "PDF"
faqTitle: Perguntas sobre impostos
integrationsLabel: "Integrações com contabilidade:"
integrations:
  - livro-caixa
  - balanco-facil
  - contai
vignette:
  kind: report
  title: Receita de 2026
  meta: MEI · limite R$ 81 mil
  bars:
    - 0.4
    - 0.55
    - 0.48
    - 0.7
    - 0.62
    - 0.8
    - 0.74
    - 0.58
    - 0.86
    - 1
  footer:
    label: Relatório de outubro
    value: Pronto para o contador
order: 4
translationKey: taxes-up-to-date
---

Carnê-leão é o recolhimento mensal do imposto de renda de quem recebe como pessoa física.
