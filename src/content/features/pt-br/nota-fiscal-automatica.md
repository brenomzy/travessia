---
name: Nota fiscal automática
slug: nota-fiscal-automatica
tagline: A nota fiscal de exportação sai sozinha a cada pagamento.
summary: Cada pagamento gera a nota fiscal de exportação de serviços em menos de 2 minutos, com os dados certos do cliente.
intro: Cada pagamento recebido gera a nota fiscal de exportação de serviços em menos de 2 minutos, com os dados do cliente já preenchidos.
benefits:
  - Funciona com MEI e Simples Nacional
  - Enviada direto para o seu contador
  - Arquivo XML e PDF guardados por 5 anos
linkLabel: Conhecer a nota fiscal
hero:
  title: A nota fiscal de exportação sai sozinha
  lead: Quando o pagamento entra, a Travessia emite a nota com os dados do cliente e manda uma cópia para o seu contador.
  secondary:
    label: Ver preços
    route: pricing
heroCard:
  kind: vignette
problem:
  title: Nota de exportação à mão é onde os erros aparecem
  beforeLabel: "Portal da prefeitura"
  afterLabel: "Nota da Travessia"
  points:
    - label: Campos difíceis
      detail: "Código do serviço, país do tomador e valor em reais na data certa: um detalhe errado e a nota volta."
      before: "Código do serviço: ? · País: ?"
      after:
        kind: "chips"
        items:
          - "Código 1.07"
          - "Reino Unido"
          - "Câmbio de 14/11"
    - label: Tempo perdido
      detail: Cada nota leva de 15 a 30 minutos no portal da prefeitura.
      before: "15 a 30 min por nota"
      after:
        kind: "figure"
        value: "1 min 48 s"
        note: "do pagamento confirmado à nota emitida"
    - label: Contador no escuro
      detail: As notas chegam soltas, por e-mail, e o fechamento do mês atrasa.
      before: "Notas soltas, por e-mail"
      after:
        kind: "progress"
        items:
          - "Emitida"
          - "No seu e-mail"
        done: "Com o contador"
steps:
  - title: O cliente paga
    detail: Assim que o pagamento é confirmado, a Travessia já tem os dados do cliente e do serviço.
    screen:
      kind: "status"
      title: "Fatura nº 0042"
      rows:
        - label: "Paga com cartão"
          value: "14 nov, 9h11"
          highlight: true
      total:
        label: "Recebido"
        value: "US$ 2,000.00"
  - title: A nota é emitida
    detail: A nota fiscal de exportação de serviços sai em menos de 2 minutos, na prefeitura da sua cidade.
    screen:
      kind: "status"
      title: "Nota fiscal nº 318"
      rows:
        - label: "Tomador"
          value: "Halden & Co."
        - label: "Código do serviço"
          value: "1.07"
        - label: "Valor"
          value: "R$ 10.834,60"
        - label: "Emitida"
          value: "9h13"
          highlight: true
  - title: O contador recebe
    detail: A nota vai para o seu e-mail e para o do seu contador, já com o câmbio do dia.
    screen:
      kind: "message"
      from: "Travessia"
      to: "para você e Marta Lima, contadora"
      subject: "Nota fiscal nº 318 emitida"
      body: "Exportação de serviços para Halden & Co., com o câmbio de 14/11. PDF e XML anexos."
      actions:
        - "Ver nota"
        - "XML"
faqTitle: Perguntas sobre nota fiscal
integrationsLabel: "Integrações com contadores:"
integrations:
  - contai
  - ancora-contabil
  - nota-certa
vignette:
  kind: taxInvoice
  title: Nota fiscal nº 318 emitida
  meta: Exportação de serviços · 15 nov, 9h13
  rows:
    - label: Tomador
      value: Halden & Co.
    - label: Enviada ao contador
      value: Sim
      highlight: true
order: 3
translationKey: automatic-tax-invoices
---

Cada pagamento recebido gera a nota fiscal de exportação de serviços correspondente.
