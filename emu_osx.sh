# !/bin/sh

# emulate osx with docker
# https://hub.docker.com/r/sickcodes/docker-osx


docker run -it \
    --device /dev/kvm \
    -e RAM=8 \
    -e SMP=4 \
    -e CORES=4 \
    -e EXTRA='-usb -device usb-host,hostbus=1,hostport=1' \
    -e INTERNAL_SSH_PORT=23 \
    -p 50922:10022 \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    -e "DISPLAY=${DISPLAY:-:0.0}" \
    -e GENERATE_UNIQUE=true \
    -e MASTER_PLIST_URL='https://raw.githubusercontent.com/sickcodes/osx-serial-generator/master/config-custom.plist' \
    sickcodes/docker-osx:monterey