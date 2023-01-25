#ARG PHP_TAG=8.0
#ARG DOCKERFILE_PROJECT_NAME=CI_PROJECT_NAME
#ARG DOCKERFILE_COMMIT_BRANCH=master
FROM cypress/included:12.3.0

WORKDIR /e2e
COPY . /e2e
#RUN npm install cypress ; npm init ; (npm install common-tags@1.8.2 || npm init)
#ENTRYPOINT npx cypress run
