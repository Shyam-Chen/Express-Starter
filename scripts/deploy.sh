#!/bin/bash

set -eux

docker-compose exec app dpl --provider=heroku --app=web-go-demo --api-key=${HEROKU_TOKEN} --strategy=git

# docker-compose exec app yarn run build

# docker-compose exec app git config user.email "shyamchen1994@gmail.com"
# docker-compose exec app git config user.name "Shyam Chen"
# docker-compose exec app git add -f dist
# docker-compose exec app git add .
# docker-compose exec app git commit -m "Deploy - ${TRAVIS_BUILD_NUMBER} (${TRAVIS_BUILD_ID})"

# docker-compose exec app git remote add heroku https://git.heroku.com/web-go-demo.git

# docker-compose exec app git remote -v

# cat > ~/.netrc <<EOF
# machine api.heroku.com
#   login ${HEROKU_CREDENTIALS_EMAIL}
#   password ${HEROKU_TOKEN}
# machine git.heroku.com
#   login ${HEROKU_CREDENTIALS_EMAIL}
#   password ${HEROKU_TOKEN}
# EOF

# chmod +x ~/.netrc

# docker-compose exec app git push "https://heroku:${HEROKU_TOKEN}@git.heroku.com/web-go-demo.git" master -f

# docker-compose exec app yarn run deploy
