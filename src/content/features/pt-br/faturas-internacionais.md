---
name: Faturas internacionais
slug: faturas-internacionais
tagline: Fature em dólar, euro ou libra, no idioma do cliente.
summary: Em dólar, euro ou libra, no idioma do cliente. Ele paga por cartão ou transferência num link seu.
intro: Crie a fatura em dólar, euro ou libra, no idioma do cliente. Ele recebe um link e paga por cartão ou transferência, sem criar conta.
benefits:
  - Modelos em inglês, espanhol e português
  - Lembrete automático no vencimento
  - "Status em tempo real: enviada, vista, paga"
linkLabel: Conhecer faturas
hero:
  title: Faturas que o seu cliente entende e paga
  lead: Em dólar, euro ou libra, no idioma dele, com um link para pagar por cartão ou transferência.
  secondary:
    label: Ver como o cliente paga
    route: forClients
heroCard:
  kind: invoice
  number: "Invoice #0042"
  from: Ana Ribeiro · Product design
  status: Paid · Nov 14
  billToLabel: Bill to
  billTo: Halden & Co., London
  lines:
    - label: Interface design, October
      amount: 1,600.00
    - label: Two revision rounds
      amount: "400.00"
  totalLabel: Total
  total: US$ 2,000.00
  methods:
    - Card
    - Bank transfer
problem:
  title: Uma fatura em reais não serve para quem paga lá fora
  beforeLabel: "Fatura em reais"
  afterLabel: "Fatura da Travessia"
  points:
    - label: Moeda e idioma
      detail: O financeiro do cliente precisa do valor na moeda dele e de um documento que consiga ler e arquivar.
      before: "R$ 10.900,00 · em português"
      after:
        kind: "figure"
        value: "US$ 2,000.00"
        tags:
          - "EN"
          - "ES"
          - "PT"
      afterLang: "en"
    - label: Como pagar
      detail: Dados bancários brasileiros confundem. Um link com cartão ou transferência local resolve.
      before: "Banco 341 · Ag. 1234 · CC 56789-0"
      beforeMono: true
      after:
        kind: "chips"
        primary: "Pay US$ 2,000.00"
        items:
          - "Card"
          - "Bank transfer"
      afterLang: "en"
    - label: Saber se pagou
      detail: Sem status, você descobre só quando o dinheiro aparece, dias depois.
      before: "Situação: —"
      after:
        kind: "progress"
        items:
          - "Enviada"
          - "Vista"
        done: "Paga · 14 nov, 9h11"
steps:
  - title: Monte a fatura
    detail: Escolha o cliente, a moeda e o idioma. Os serviços que você já faturou antes aparecem como sugestão.
    screen:
      kind: "form"
      fields:
        - label: "Cliente"
          value: "Halden & Co., London"
        - label: "Moeda"
          value: "USD"
        - label: "Idioma"
          value: "English"
      suggestion:
        label: "Sugestões"
        items:
          - label: "+ Interface design, October"
            value: "1,600.00"
  - title: Mande o link
    detail: O cliente recebe por e-mail um link com a fatura em PDF e as formas de pagamento.
    screen:
      kind: "message"
      lang: "en"
      from: "Ana Ribeiro"
      to: "to Halden & Co. accounts"
      subject: "Invoice #0042 · US$ 2,000.00"
      body: "Due Nov 14. Pay by card or bank transfer, no account needed."
      actions:
        - "Pay invoice"
        - "PDF"
  - title: Acompanhe e receba
    detail: Veja quando ele abriu e quando pagou. O valor entra no seu saldo na moeda da fatura.
    screen:
      kind: "status"
      title: "Fatura nº 0042"
      rows:
        - label: "Enviada"
          value: "12 nov, 16h40"
        - label: "Vista"
          value: "13 nov, 10h02"
        - label: "Paga"
          value: "14 nov, 9h11"
          highlight: true
      total:
        label: "Saldo em dólar"
        value: "+ US$ 2,000.00"
faqTitle: Perguntas sobre faturas
integrationsLabel: "Integrações que ajudam a faturar:"
integrations:
  - recibo-ja
  - pauta
  - agenda-brasa
vignette:
  kind: invoice
  title: "Invoice #0043"
  from: Ana Ribeiro · Product design
  languages:
    - EN
    - PT
  amount: € 1,500.00
  action: Send link
order: 1
translationKey: international-invoices
---

A fatura internacional da Travessia sai no idioma do cliente e na moeda combinada.
