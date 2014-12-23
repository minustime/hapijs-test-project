FROM debian:wheezy

# Install memcached
RUN apt-get update
RUN apt-get install -y --no-install-recommends \
    memcached  \
    supervisor

# Create user that will run memcached
RUN useradd memcached

# Setup system configuration files
ADD config/supervisor.conf /etc/supervisor/conf.d/default.conf

EXPOSE 11211

ENTRYPOINT ["supervisord"]