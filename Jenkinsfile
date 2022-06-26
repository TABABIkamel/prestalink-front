pipeline {
    agent any
    stages {
        stage('tests static') {
            steps {
                bat "sonar-scanner.bat -D sonar.projectKey=prestalink-front -D sonar.sources=. -D sonar.host.url=http://localhost:9000 -D sonar.login=1ce2ccf9866d803f0d60d3608ab236ef347f0d47"
            }
        }
        stage('livraison') {      
            steps { 
                bat "docker login --username 1901199891 --password Tunis19981998"
                bat "docker build -t 1901199891/prstalink-front ."
                bat "docker push 1901199891/prstalink-front"
            }
        }
        
    }
        
    }
    
