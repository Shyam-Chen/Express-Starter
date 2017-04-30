FROM buildpack-deps:jessie

ENV HOME /Backend-Starter-Kit
ENV NODE 7
ENV DEBIAN_FRONTEND noninteractive
ENV PATH $HOME/.yarn/bin:$PATH

WORKDIR ${HOME}
ADD . $HOME

# node
RUN curl -sL https://deb.nodesource.com/setup_$NODE.x | bash - && \
    curl -o- -L https://yarnpkg.com/install.sh | bash && \
    apt-get update && apt-get install -y nodejs

# ruby
RUN apt-get update && apt-get install -y ruby && \
    gem install dpl

# cleanup
RUN rm -rf /var/lib/apt/lists/*

# install
RUN yarn

EXPOSE 8000
