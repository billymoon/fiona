pipeline {
  agent any

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
