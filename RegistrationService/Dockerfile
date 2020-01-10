FROM node:boron
WORKDIR /var/www/html/nodeJs/yaml
RUN useradd -ms /bin/bash lokho
RUN chown -R lokho:lokho /var/www/html/nodeJs/yaml
USER lokho
WORKDIR /home/lokho
COPY package.json /var/www/html/nodeJs/yaml
COPY package-lock.json /var/www/html/nodeJs/yaml
RUN npm install
COPY . /var/www/html/nodeJs/yaml
EXPOSE 3000
CMD ["npm", "start" ]