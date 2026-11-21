---
name: Taxes up to date
slug: taxes-up-to-date
tagline: A monthly report ready for your accountant.
summary: A monthly report for MEI, Simples Nacional or carnê-leão, ready to send to your accountant without a spreadsheet.
intro: One report a month with everything that came in, was converted and was invoiced. For MEI, Simples Nacional or carnê-leão, without a spreadsheet.
benefits:
  - A warning at 80% of the MEI limit
  - "Carnê-leão: the month's amount worked out for you to check"
  - Read-only access for your accountant
linkLabel: See the reports
hero:
  title: The month closed, no spreadsheet
  lead: Everything that came in, was converted and became a tax invoice, in one report ready for you and your accountant.
  secondary:
    label: See pricing
    route: pricing
heroCard:
  kind: vignette
problem:
  title: The monthly spreadsheet is where taxes get complicated
  beforeLabel: "Monthly spreadsheet"
  afterLabel: "Travessia report"
  points:
    - label: Scattered numbers
      detail: Invoices, rates and tax invoices live in different places and have to be added up by hand.
      before: "invoices.xlsx · rates.pdf · tax invoices by email"
      beforeMono: true
      after:
        kind: "chips"
        primary: "October report"
        items:
          - "5 invoices"
          - "4 conversions"
          - "5 tax invoices"
    - label: The MEI limit
      detail: If you don't track it, you only notice you've gone over when it's too late.
      before: "MEI limit: ?"
      after:
        kind: "meter"
        label: "2026 revenue"
        value: "R$ 58.3k of R$ 81k"
        fraction: 0.72
    - label: Carnê-leão
      detail: If you're paid as an individual, you work it out and pay every month, at the right rate.
      before: "Day's rate: look it up on the Central Bank site"
      after:
        kind: "figure"
        value: "R$ 1,284.20"
        note: "October's carnê-leão, at each payment's rate"
steps:
  - title: Everything comes in by itself
    detail: Invoices, payments, conversions and tax invoices sit in one place, with each day's exchange rate.
    screen:
      kind: "status"
      title: "October"
      rows:
        - label: "Invoice #0040 paid"
          value: "US$ 1,500.00"
        - label: "Converted to reais"
          value: "R$ 8,120.40"
        - label: "Tax invoice #315"
          value: "Issued"
          highlight: true
  - title: The report closes the month
    detail: On the first business day, the month's report comes out in your regime's format, MEI, Simples Nacional or carnê-leão.
    screen:
      kind: "status"
      title: "October report · Simples Nacional"
      rows:
        - label: "Month's revenue"
          value: "R$ 31,540.20"
        - label: "Tax invoices issued"
          value: "5"
        - label: "DAS slip"
          value: "Ready, due Nov 20"
      total:
        label: "Ready for your accountant"
        value: "PDF"
  - title: Your accountant gets it
    detail: Send the report in one click, or let it go out automatically.
    screen:
      kind: "message"
      from: "Travessia"
      to: "to Marta Lima, accountant"
      subject: "October report · Ana Ribeiro"
      body: "The month's revenue, conversions and tax invoices, in Simples Nacional format."
      actions:
        - "Open report"
        - "PDF"
faqTitle: Questions about taxes
integrationsLabel: "Accounting integrations:"
integrations:
  - livro-caixa
  - balanco-facil
  - contai
vignette:
  kind: report
  title: 2026 revenue
  meta: Simples Nacional
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
    label: October report
    value: Ready for your accountant
order: 4
key: taxes-up-to-date
---

MEI is Brazil's simplified sole-trader regime. Carnê-leão is the monthly income tax that individuals pay on money received from abroad.
