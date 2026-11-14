---
name: International invoices
slug: international-invoices
tagline: Invoice in dollars, euros or pounds, in your client's language.
summary: In dollars, euros or pounds, in your client's language. They pay by card or bank transfer through your link.
intro: Create the invoice in dollars, euros or pounds, in your client's language. They get a link and pay by card or bank transfer, without signing up.
benefits:
  - Templates in English, Spanish and Portuguese
  - Automatic reminder on the due date
  - "Live status: sent, viewed, paid"
linkLabel: See invoices
hero:
  title: Invoices your client understands and pays
  lead: In dollars, euros or pounds, in their language, with a link to pay by card or bank transfer.
  secondary:
    label: See how clients pay
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
  title: An invoice in reais doesn't work for someone paying from abroad
  beforeLabel: "Invoice in reais"
  afterLabel: "Travessia invoice"
  points:
    - label: Currency and language
      detail: The client's finance team needs the amount in their currency and a document they can read and file.
      before: "R$ 10,900.00 · in Portuguese"
      after:
        kind: "figure"
        value: "US$ 2,000.00"
        tags:
          - "EN"
          - "ES"
          - "PT"
    - label: How to pay
      detail: Brazilian bank details confuse people. A link with card or local transfer solves it.
      before: "Bank 341 · Branch 1234 · Acct 56789-0"
      beforeMono: true
      after:
        kind: "chips"
        primary: "Pay US$ 2,000.00"
        items:
          - "Card"
          - "Bank transfer"
    - label: Knowing it's paid
      detail: With no status, you only find out when the money shows up, days later.
      before: "Status: —"
      after:
        kind: "progress"
        items:
          - "Sent"
          - "Viewed"
        done: "Paid · Nov 14, 9:11"
steps:
  - title: Build the invoice
    detail: Pick the client, currency and language. Services you've invoiced before come up as suggestions.
    screen:
      kind: "form"
      fields:
        - label: "Client"
          value: "Halden & Co., London"
        - label: "Currency"
          value: "USD"
        - label: "Language"
          value: "English"
      suggestion:
        label: "Suggestions"
        items:
          - label: "+ Interface design, October"
            value: "1,600.00"
  - title: Send the link
    detail: Your client gets an email with a link to the PDF invoice and the ways to pay.
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
  - title: Track it and get paid
    detail: See when they opened it and when they paid. The money lands in your balance in the invoice currency.
    screen:
      kind: "status"
      title: "Invoice #0042"
      rows:
        - label: "Sent"
          value: "Nov 12, 4:40 pm"
        - label: "Viewed"
          value: "Nov 13, 10:02 am"
        - label: "Paid"
          value: "Nov 14, 9:11 am"
          highlight: true
      total:
        label: "Dollar balance"
        value: "+ US$ 2,000.00"
faqTitle: Questions about invoices
integrationsLabel: "Integrations that help with invoicing:"
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

Travessia invoices come out in the client's language and in the agreed currency.
