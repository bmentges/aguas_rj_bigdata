# Sobre os Dados do Projeto

Os dados sobre os reservatórios foram obtidos através do seguinte link:

http://sar.ana.gov.br/MedicaoSin?dropDownListEstados=20&dropDownListReservatorios=19083&dataInicial=01%2F01%2F2016&dataFinal=03%2F02%2F2018&button=Buscar

Filtrando por cada reservatório obtive o "Baixar como Excel" que na verdade está em HTML. Internamente é a tabela do site.

## Crawler

Foi feito um crawler (Selenium) para baixar do site da ANA os dados sobre os reservatórios do Estado do Rio de Janeiro. 

São 150 reservatórios no Rio, e os dados foram baixados dos seguintes períodos:

* 01-01-1993 até 31-12-1999
* 01-01-2000 até 31-12-2009
* 01-01-2010 até 05-02-2018

Foi feito dessa forma para não sobrecarregar os servidores da ANA.

Com isso os HTMLs foram baixados para `data/aguas-reservatorios-rj/input/` nos seguintes subdiretórios:

* `01-01-1993-TO-31-12-1999`
* `01-01-2000-TO-31-12-2009`
* `01-01-2010-TO-05-02-2018`

Todos os arquivos totalizam 1.237.940 registros diários dos reservatórios de 1993 até 2018.

Do jeito que o crawler foi feito, é simples de manter um DELTA com as futuras atualizações.

## Como rodar o crawler:

No diretório `data/crawlers`:

* $ `python crawler.py`

