# Projeto Big Data GovBR

O objetivo do projeto é processar os dados públicos em larga escala para obtermos melhores informações sobre como nosso governo atua.

O primeiro spike do projeto será processar o nível de água dos reservatórios do RJ.

# Organização do Projeto

## Big Data

Os dados obtidos do site estão na pasta `data/aguas-reservatorios-rj/*.html`. Estes são os arquivos gerados pelo botão "Exportar para Excel" do site da Ana.

TODO:

- [x] Obter os dados do site da Agência Nacional de Águas (ANA)
- [x] Converter os dados para um único .CSV
- [ ] Plotar o gráfico por reservatório
- [ ] Calcular média geral do Estado por dia, gerando um novo CSV
- [ ] Plotar o gráfico geral do Estado

### Documentação

#### Como gerar o CSV dos dados da ANA:

`Using virtualenvwrapper`:

```
$ mkvirtualenv aguas_data_rj
$ workon aguas_data_rj
$ pip install -r requirements.txt
$ cd src
$ PYTHONPATH=`pwd` python aguas_rj/data_aguas_rj/generate_csv.py
```

Este processador lê os arquivos em `data/aguas-reservatorios-rj/*.html` e escreve o resultado nos seguintes arquivos:

* `data/aguas-reservatorios-rj/output/schema.csv`: Contém uma linha com o significado de cada coluna
* `data/aguas-reservatorios-rj/output/all_data.csv`: Contém todos os dados dos 150 reservatórios do Estado do Rio de Janeiro. Neste processamento são geradas 114.630 linhas de informação
* Também gera as versões .gz dos mesmos arquivos (bem menores):
    - `data/aguas-reservatorios-rj/output/schema.csv.gz`
    - `data/aguas-reservatorios-rj/output/all_data.csv.gz`

## Site

O site é um django simples preparado para deploy no Heroku, por simplicidade e custos atuais.