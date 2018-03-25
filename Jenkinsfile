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
        sh "npm i"
      }
    }

    stage ("test") {
      steps {
        sh "npm test"
        sh "npm test:coverage"
      }
    }
  }
}
