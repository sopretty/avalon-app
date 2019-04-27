FROM ubuntu:18.04

MAINTAINER Romain Thierry-Laumont "romain.thierry@safety-line.fr"

ENV WEBSERVICEHOST 0.0.0.0
ENV WEBSERVICEPORT 5000
ENV DBHOST rethinkdb
ENV DBPORT 28015

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
	/root/miniconda2/bin/pip install --upgrade setuptools

COPY avalon_pkg/ Avalon/avalon_pkg
COPY app/ Avalon/app
COPY data/ Avalon/data

WORKDIR Avalon

RUN cd avalon_pkg && \
	/root/miniconda2/bin/pip install -r requirements.txt && \
	/root/miniconda2/bin/python setup.py install

CMD ["sh", "-c", "/root/miniconda2/bin/python app/app.py"]

# CMD ["sh", "-c", "/root/miniconda2/bin/python app/app.py ${WEBSERVICEHOST} ${WEBSERVICEPORT} ${DBHOST} ${DBPORT}"]