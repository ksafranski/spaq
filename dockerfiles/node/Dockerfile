FROM mhart/alpine-node:6.9

# Utils
RUN apk add --update \
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

CMD ["/bin/bash"]
