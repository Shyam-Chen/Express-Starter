FROM buildpack-deps:jessie

ENV HOME /Backend-Starter-Kit

WORKDIR ${HOME}
ADD . $HOME

# node
RUN \
  curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  apt-get update && apt-get install -y nodejs

ENV PATH $HOME/.yarn/bin:$PATH

# ruby
RUN \
  apt-get update && apt-get install -y ruby && \
  gem install dpl

# cleanup
RUN rm -rf /var/lib/apt/lists/*

# install
RUN yarn

EXPOSE 8000
