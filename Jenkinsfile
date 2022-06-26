pipeline {
    agent any
    stages {
        stage('livraison') {      
            steps { 
                bat "docker login --username 1901199891 --password Tunis19981998"
                bat "docker build -t 1901199891/prstalink-front ."
                bat "docker push 1901199891/prstalink-front"
            }
        }
    }    
    }
    
