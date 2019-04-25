FROM ubuntu:18.04

MAINTAINER Romain Thierry-Laumont "romain.thierry@safety-line.fr"

# Python install
RUN apt-get update -y --no-install-recommends; \
    apt-get install -y --no-install-recommends wget python-setuptools python-pip build-essential bzip2 libssl-dev vim htop nano; \
    apt-get clean; \
	rm -rf /tmp/* /var/tmp/* /var/lib/apt/lists/*

RUN wget https://repo.continuum.io/miniconda/Miniconda2-latest-Linux-x86_64.sh -O ~/Miniconda2.sh; \
    /bin/bash -b -p -f ~/Miniconda2.sh -b $HOME/Miniconda2

# Install pip in miniconda
RUN /root/miniconda2/bin/conda install pip && \
	/root/miniconda2/bin/pip install --upgrade pip && \
	/root/miniconda2/bin/pip install --upgrade setuptools && \
	/root/miniconda2/bin/pip install Flask==0.12.2

COPY /web_service/ /root/

# docker run -it -d -p 8080:8080 -p 28015:28015 -p 29015:29015 rethinkdb

# from /avalon-app/python :
# docker build -t avalon-app -f docker/Dockerfile .
# docker run -it avalon-app
