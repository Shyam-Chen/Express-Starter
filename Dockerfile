FROM buildpack-deps:jessie

ENV HOME /Backend-Starter-Kit
ENV NODE 7
ENV DEBIAN_FRONTEND noninteractive
ENV PATH $HOME/.yarn/bin:$PATH
ENV HEROKU_API_KEY ${HEROKU_TOKEN}

WORKDIR ${HOME}
ADD . $HOME

# node
RUN curl -sL https://deb.nodesource.com/setup_$NODE.x | bash - && \
    curl -o- -L https://yarnpkg.com/install.sh | bash && \
    apt-get update && apt-get install -y nodejs

# heroku
RUN echo "deb http://toolbelt.heroku.com/ubuntu ./" > /etc/apt/sources.list.d/heroku.list && \
    wget -O- https://toolbelt.heroku.com/apt/release.key | apt-key add - && \
    apt-get update && apt-get install -y heroku-toolbelt

# cleanup
RUN rm -rf /var/lib/apt/lists/*

# install
RUN yarn

EXPOSE 8000
