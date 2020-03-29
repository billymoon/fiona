pipeline {
   agent any

   stages {
      stage('env') {
         steps {
            sh 'env'
         }
      }

      stage('test') {
         agent {
           docker {
             image 'node:12-alpine'
           }
         }
         steps {
            sh 'node --verison'
            sh 'yarn'
            sh 'yarn test'
         }
      }
   }
}

