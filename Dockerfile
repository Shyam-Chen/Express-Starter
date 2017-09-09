FROM buildpack-deps:jessie

ENV HOME /Backend-Starter-Kit

WORKDIR ${HOME}
ADD . $HOME

# git --
# RUN \
#   apt-get update && \
#   apt-get install -y git-core
# -- git

# node --
RUN \
  curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  apt-get update && \
  apt-get install -y nodejs

ENV PATH $HOME/.yarn/bin:$PATH
# -- node

# ruby --
# RUN \
#   apt-get update && \
#   apt-get install -y ruby && \
#   gem install dpl
# -- ruby

# heroku --
# RUN \
#   echo "deb http://toolbelt.heroku.com/ubuntu ./" > /etc/apt/sources.list.d/heroku.list && \
#   wget -O- https://toolbelt.heroku.com/apt/release.key | apt-key add - && \
#   apt-get update && apt-get install -y heroku-toolbelt
# -- heroku

RUN rm -rf /var/lib/apt/lists/*

RUN yarn

EXPOSE 3000
