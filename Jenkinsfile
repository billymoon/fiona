pipeline {
  agent {
    docker {
      image "node:9-alpine"
    }
  }

  stages {
    stage ("init") {
      steps {
        sh "env"
        sh "npm i --production"
      }
    }

    stage ("test") {
      steps {
        sh "npm test"
        sh "npm run test:coverage"
      }
    }
  }
}
