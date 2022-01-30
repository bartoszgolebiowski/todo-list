#!/bin/bash

docker run --name todo-remix-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=todo -d postgres
