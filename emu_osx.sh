# !/bin/sh

# emulate osx with docker
# https://hub.docker.com/r/sickcodes/docker-osx


docker run -it \
    -e RAM=8 \
    -e CORES=2 \
    --device /dev/kvm \
    -p 50922:10022 \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    sickcodes/docker-osx:latest

# docker build -t docker-osx .