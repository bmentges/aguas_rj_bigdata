# Visão Geral

Este site servirá para visualização dos dados coletados da Agência Nacional das Águas. Também será um laboratório Django + REST + ReactJS.

## O Banco de Dados

Por enquanto estamos utilizando o sqlite3 para trabalhar os dados tanto localmente como em "produção" (os free-tier da vida)

## Setup Local

```sh
// Dentro do diretório raiz do projeto...
$ pip install -r requirements.txt
$ cd site/
$ python manage.py migrate
$ python manage.py runserver
```