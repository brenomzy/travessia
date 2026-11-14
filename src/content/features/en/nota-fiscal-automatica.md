---
name: Automatic nota fiscal
slug: automatic-tax-invoices
tagline: The export nota fiscal (Brazil's service tax invoice) is issued with every payment.
summary: Every payment issues the export nota fiscal, Brazil's service tax invoice, in under 2 minutes with the right client details.
intro: Every payment you receive issues the export nota fiscal for services in under 2 minutes, with the client's details already filled in.
benefits:
  - Works with MEI and Simples Nacional
  - Sent straight to your accountant
  - XML and PDF kept for 5 years
linkLabel: See the nota fiscal
hero:
  title: The export nota fiscal issues itself
  lead: When a payment lands, Travessia issues the nota fiscal with your client's details and sends a copy to your accountant.
  secondary:
    label: See pricing
    route: pricing
heroCard:
  kind: vignette
problem:
  title: Export tax invoices by hand are where mistakes happen
  beforeLabel: "City hall portal"
  afterLabel: "Travessia nota fiscal"
  points:
    - label: Tricky fields
      detail: "Service code, the client's country and the amount in reais on the right date: one wrong detail and it bounces."
      before: "Service code: ? · Country: ?"
      after:
        kind: "chips"
        items:
          - "Code 1.07"
          - "United Kingdom"
          - "Nov 14 rate"
    - label: Lost time
      detail: Each one takes 15 to 30 minutes on the city hall portal.
      before: "15 to 30 min each"
      after:
        kind: "figure"
        value: "1 min 48 s"
        note: "from confirmed payment to issued nota"
    - label: Accountant in the dark
      detail: Tax invoices arrive one by one by email, and month-end closing runs late.
      before: "Loose notas, by email"
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
          value: "Nov 14, 9:11 am"
          highlight: true
      total:
        label: "Received"
        value: "US$ 2,000.00"
  - title: The nota fiscal is issued
    detail: The export nota fiscal is issued in under 2 minutes with your city's tax office.
    screen:
      kind: "status"
      title: "Nota fiscal #318"
      rows:
        - label: "Client"
          value: "Halden & Co."
        - label: "Service code"
          value: "1.07"
        - label: "Amount"
          value: "R$ 10,834.60"
        - label: "Issued"
          value: "9:13 am"
          highlight: true
  - title: Your accountant gets it
    detail: It goes to your email and your accountant's, with the day's exchange rate.
    screen:
      kind: "message"
      from: "Travessia"
      to: "to you and Marta Lima, accountant"
      subject: "Nota fiscal #318 issued"
      body: "Export of services to Halden & Co., at the Nov 14 rate. PDF and XML attached."
      actions:
        - "View nota"
        - "XML"
faqTitle: Questions about the nota fiscal
integrationsLabel: "Accounting integrations:"
integrations:
  - contai
  - ancora-contabil
  - nota-certa
vignette:
  kind: taxInvoice
  title: Nota fiscal no. 318 issued
  meta: Export of services · Nov 15, 9:13
  rows:
    - label: Client
      value: Halden & Co.
    - label: Sent to accountant
      value: Yes
      highlight: true
order: 3
translationKey: automatic-tax-invoices
---

Every payment you receive issues the matching export nota fiscal.
