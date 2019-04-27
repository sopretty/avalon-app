
from python/
> docker build -t avalon-pkg -f docker/Dockerfile .

# créer et rentre dans un container
> docker run -it -p 4000:80 avalon-pkg

# rentrer dans un container
> docker exec -it [container] bash
