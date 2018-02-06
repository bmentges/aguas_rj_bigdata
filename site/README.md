# Visão Geral

Este site servirá para visualização dos dados coletados da Agência Nacional das Águas. Também será um laboratório Django + REST + ReactJS.

## O Banco de Dados

É aqui que é definido o banco de dados a ser populado pelos dados coletados através do crawler do site da ANA (Agência Nacional das Águas)

Para configurar localmente, rode o seguinte comando:

```sh
$ export DATABASE_URL=postgres://user:password@localhost/aguas_rj
```

## Setup Local

```sh
// Dentro do diretório raiz do projeto...
$ pip install -r requirements.txt
$ cd site/
$ python manage.py migrate
$ python manage.py runserver
```