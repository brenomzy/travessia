---
name: Automatic tax invoices
slug: automatic-tax-invoices
tagline: The export tax invoice (nota fiscal) is issued with every payment.
summary: Every payment issues the export tax invoice (nota fiscal), Brazil's official record of a service sold, in under 2 minutes with the right client details.
intro: Every payment you receive issues the export tax invoice in under 2 minutes, with the client's details already filled in.
benefits:
  - Works with MEI and Simples Nacional
  - Sent straight to your accountant
  - XML and PDF kept for 5 years
linkLabel: See tax invoices
hero:
  title: Your tax invoice issues itself
  lead: When a payment lands, Travessia issues the tax invoice (nota fiscal) with your client's details and sends a copy to your accountant.
  secondary:
    label: See pricing
    route: pricing
heroCard:
  kind: vignette
problem:
  title: Export tax invoices by hand are where mistakes happen
  beforeLabel: "City hall portal"
  afterLabel: "Travessia tax invoice"
  points:
    - label: Tricky fields
      detail: "Service code, the client's country and the amount in reais on the right date: one wrong detail and it bounces."
      before: "Service code: ? · Country: ?"
      after:
        kind: "chips"
        items:
          - "Code 1.07"
          - "United Kingdom"
          - "Nov 12 rate"
    - label: Lost time
      detail: Each one takes 15 to 30 minutes on the city hall portal.
      before: "15 to 30 min each"
      after:
        kind: "figure"
        value: "1 min 48 s"
        note: "from confirmed payment to issued tax invoice"
    - label: Accountant in the dark
      detail: Tax invoices arrive one by one by email, and month-end closing runs late.
      before: "Loose tax invoices, by email"
      after:
        kind: "progress"
        items:
          - "Issued"
          - "In your inbox"
        done: "With your accountant"
steps:
  - title: Your client pays
    detail: As soon as the payment is confirmed, Travessia already has the client and service details.
    screen:
      kind: "status"
      title: "Invoice #0042"
      rows:
        - label: "Paid by card"
          value: "Nov 12, 9:11 am"
          highlight: true
      total:
        label: "Received"
        value: "US$ 2,000.00"
  - title: The tax invoice is issued
    detail: The export tax invoice is issued in under 2 minutes with your city's tax office.
    screen:
      kind: "status"
      title: "Tax invoice #318"
      rows:
        - label: "Client"
          value: "Halden & Co."
        - label: "Service code"
          value: "1.07"
        - label: "Amount"
          value: "R$ 10,900.00"
        - label: "Issued"
          value: "9:13 am"
          highlight: true
  - title: Your accountant gets it
    detail: It goes to your email and your accountant's, with the day's exchange rate.
    screen:
      kind: "message"
      from: "Travessia"
      to: "to you and Marta Lima, accountant"
      subject: "Tax invoice #318 issued"
      body: "Export of services to Halden & Co., at the Nov 12 rate. PDF and XML attached."
      actions:
        - "View tax invoice"
        - "XML"
faqTitle: Questions about tax invoices
integrationsLabel: "Accounting integrations:"
integrations:
  - contai
  - ancora-contabil
  - nota-certa
vignette:
  kind: taxInvoice
  title: Tax invoice no. 318 issued
  meta: Export of services · Nov 12, 9:13
  rows:
    - label: Client
      value: Halden & Co.
    - label: Sent to accountant
      value: Yes
      highlight: true
order: 3
key: automatic-tax-invoices
---

Every payment you receive issues the matching export tax invoice.
