pipeline {
    agent any
    stages {
        stage('tests static') {
            steps {
                bat "sonar-scanner.bat -D"sonar.projectKey=prestalink-front" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.login=88ccabd0712f40345a3860259d803e208b526641""
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
    
