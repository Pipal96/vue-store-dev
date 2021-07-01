#!/usr/bin/env sh

# Остановить публикацию при ошибке
set -e

# Сборка приложения
npm run build

# Переход в каталог сборки
cd dist

# Инициализация проекта и загрузка на GitHub
git init
git add .
git commit -m 'deploy'

git push -f https://github.com/Pipal96/vue-store.git master:gh-page

cd -
