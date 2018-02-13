# Visão Geral

Este site servirá para visualização dos dados coletados da Agência Nacional das Águas. Também será um laboratório Django + REST + ReactJS.

## O Banco de Dados

Por enquanto estamos utilizando o sqlite3 para trabalhar os dados tanto localmente como em "produção" (os free-tier da vida)

## Setup Local

```bash
$ cd <project_dir>
$ cd site/
$ workon bigdata // criar este virtualenv com o virtualenvwrapper
$ pip install -r requirements.txt
$ cd frontend/
$ npm install
$ npm run build
$ cd ..
$ python manage.py collectstatic
$ python manage.py runserver
// O servidor estará disponível em http://localhost:8000/
```