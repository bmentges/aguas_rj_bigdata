# Reservatórios de Águas do Estado do Rio de Janeiro

O objetivo do projeto será monitorar o nível de água dos reservatórios do RJ.

# Organização do Projeto

## Big Data

Os dados obtidos do site estão na pasta `data/aguas-reservatorios-rj/**/*.tar.gz`. Estes são os arquivos gerados pelo botão "Exportar para Excel" do site da Ana.

TODO:

- [x] Obter os dados do site da Agência Nacional de Águas (ANA)
- [x] Converter os dados para um único .CSV
- [x] Colocar os dados em produção (free por hora, muitas limitações)
- [ ] Plotar o gráfico por reservatório
- [ ] Calcular média geral do Estado por dia, gerando um novo CSV
- [ ] Plotar o gráfico geral do Estado

### Documentação

#### Python 3.6

O projeto usa o python 3.6 com todas as dependências descritas no `requirements.txt`

#### Os Dados do Projeto

Os dados foram e são obtidos do site da Agência Nacional de Águas. Para mais detalhes consulte o README dos dados:

https://github.com/bmentges/aguas_rj_bigdata/blob/master/data/README.md 

#### Como gerar o CSV dos dados da ANA e carregar no Banco de Dados:

##### Passo 1. Descompactar os arquivos de input:

```sh
// No diretório raiz do projeto:
$ 
$ cd data/aguas-reservatorios-rj/01-01-1993-TO-31-12-1999/
$ tar -zxvf all_raw_inputs_from_ANA.tar.gz
$ cd data/aguas-reservatorios-rj/01-01-2000-TO-31-12-2009/
$ tar -zxvf all_raw_inputs_from_ANA.tar.gz
$ cd data/aguas-reservatorios-rj/01-01-2010-TO-05-02-2018/
$ tar -zxvf all_raw_inputs_from_ANA.tar.gz
```
##### Passo 2. Rodar o gerador de csv 

`Usando o virtualenvwrapper`:

```sh
// No diretório do projeto:
$ mkvirtualenv aguas_data_rj
$ workon aguas_data_rj
$ pip install -r requirements.txt
$ cd src
$ PYTHONPATH=`pwd` python aguas_rj/data_aguas_rj/generate_csv.py
```

Este processador lê os arquivos em `data/aguas-reservatorios-rj/input/**/*.html` e escreve o resultado nos seguintes arquivos:

* `data/aguas-reservatorios-rj/output/schema.csv`: Contém uma linha com o significado de cada coluna
* `data/aguas-reservatorios-rj/output/all_data.csv`: Contém todos os dados dos 150 reservatórios do Estado do Rio de Janeiro. Neste processamento são geradas 1.237.940 linhas de informação do período entre 01-01-1993 até 05-02-2018.
* Também gera as versões compactadas em .gz dos mesmos arquivos (bem menores):
    - `data/aguas-reservatorios-rj/output/schema.csv.gz`
    - `data/aguas-reservatorios-rj/output/all_data.csv.gz`

##### Passo 3. Rodar os comandos que populam o banco de dados

`Usando o virtualenvwrapper`:

```sh
// No diretório do projeto
// ps: A ordem é importante
$ workon aguas_data_rj
$ cd site
$ python manage.py migrate
$ python manage.py load_reservatorios
$ python manage.py load_medicoes_rj
```

## Site

O site é um django simples preparado para deploy no Heroku, por simplicidade e custos atuais.