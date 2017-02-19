FROM mhart/alpine-node:6.9

# Utils
RUN apk add --update \
    git \
    make \
    gcc \
    bash \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

RUN npm i yarn -g

RUN npm i jspm -g

CMD ["/bin/bash"]
