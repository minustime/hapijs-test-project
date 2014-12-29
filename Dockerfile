FROM debian:wheezy

# Update OS, install base packages
RUN apt-get update
RUN apt-get install -y --no-install-recommends \
	ca-certificates \
	build-essential \
	rsync \
	supervisor \
	curl

# Install Node v0.10.33 and NPM v2.1.11
RUN curl -SLO "http://nodejs.org/dist/v0.10.33/node-v0.10.33-linux-x64.tar.gz" && \
	tar -xzf "node-v0.10.33-linux-x64.tar.gz" -C /usr/local --strip-components=1 && \
	rm "node-v0.10.33-linux-x64.tar.gz" && \
	npm install -g npm@2.1.11 && \
	npm cache clear

ENV WORKDIR /var/www/hapiproject 

WORKDIR ${WORKDIR}

# Compile node modules
ADD src/package.json /tmp/package.json
RUN cd /tmp && npm install && \
	rsync -a /tmp/node_modules ${WORKDIR}

# Add the project source
ADD src ${WORKDIR}

RUN cd ${WORKDIR} && \
	npm install --loglevel verbose

# Set default app configuration
RUN cp config/config.sample.json ${WORKDIR}/config/config.json

# Setup system configuration files
ADD extra/config/supervisor.conf /etc/supervisor/conf.d/default.conf

ENTRYPOINT ["supervisord"]