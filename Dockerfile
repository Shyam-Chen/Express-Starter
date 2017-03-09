FROM buildpack-deps:jessie

ENV HOME /Backend-Starter-Kit
ENV NODE 7
ENV DEBIAN_FRONTEND noninteractive
ENV PATH $HOME/.yarn/bin:$PATH

WORKDIR ${HOME}
ADD . $HOME

RUN curl -sL https://deb.nodesource.com/setup_$NODE.x | bash - && \
    curl -o- -L https://yarnpkg.com/install.sh | bash && \
    apt-get update && \
    apt-get install -y \
      nodejs \
      nginx \
      --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY . /Backend-Starter-Kit

RUN yarn

EXPOSE 8000
