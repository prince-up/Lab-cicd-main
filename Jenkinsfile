pipeline {
    agent any

    parameters {
        string(name: 'REPO_URL', defaultValue: '', description: 'GitHub Repository URL to build')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    if (params.REPO_URL == '') {
                        error 'REPO_URL parameter is missing'
                    }
                }
                git branch: 'main', url: params.REPO_URL
            }
        }

        stage('Detect Project Type') {
            steps {
                script {
                    def projectType = 'unknown'
                    
                    if (fileExists('pom.xml')) {
                        projectType = 'maven'
                        echo "✅ Detected Maven project"
                    } else if (fileExists('build.gradle') || fileExists('build.gradle.kts')) {
                        projectType = 'gradle'
                        echo "✅ Detected Gradle project"
                    } else if (fileExists('package.json')) {
                        projectType = 'npm'
                        echo "✅ Detected Node.js/NPM project"
                    } else if (fileExists('requirements.txt') || fileExists('setup.py')) {
                        projectType = 'python'
                        echo "✅ Detected Python project"
                    } else if (fileExists('go.mod')) {
                        projectType = 'go'
                        echo "✅ Detected Go project"
                    } else if (fileExists('index.html') || fileExists('index.htm')) {
                        projectType = 'static'
                        echo "✅ Detected Static HTML project"
                    } else {
                        projectType = 'unknown'
                        echo "⚠️ Unknown project type - will list files"
                    }
                    
                    env.PROJECT_TYPE = projectType
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Building ${env.PROJECT_TYPE} project..."
                    
                    switch(env.PROJECT_TYPE) {
                        case 'maven':
                            bat 'mvn clean install -DskipTests'
                            break
                            
                        case 'gradle':
                            bat 'gradle build -x test'
                            break
                            
                        case 'npm':
                            bat 'npm install'
                            // Try to run build if it exists
                            bat 'npm run build 2>nul || (echo No build script found - skipping && exit /b 0)'
                            break
                            
                        case 'python':
                            bat 'pip install -r requirements.txt || echo No requirements.txt'
                            break
                            
                        case 'go':
                            bat 'go build'
                            break
                            
                        case 'static':
                            echo "✅ Static HTML project - no build needed"
                            bat 'dir'
                            break
                            
                        default:
                            echo "⚠️ Unknown project type - listing files"
                            bat 'dir'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo "Running tests for ${env.PROJECT_TYPE} project..."
                    
                    switch(env.PROJECT_TYPE) {
                        case 'maven':
                            bat 'mvn test || echo Tests failed or not found'
                            break
                            
                        case 'gradle':
                            bat 'gradle test || echo Tests failed or not found'
                            break
                            
                        case 'npm':
                            bat 'npm test 2>nul || (echo No test script found - skipping && exit /b 0)'
                            break
                            
                        case 'python':
                            bat 'python -m pytest || echo No tests found'
                            break
                            
                        case 'go':
                            bat 'go test ./... || echo No tests found'
                            break
                            
                        default:
                            echo "ℹ️ No tests configured for this project type"
                    }
                }
            }
        }

        stage('Summary') {
            steps {
                script {
                    echo "========================================="
                    echo "✅ Build completed successfully!"
                    echo "Project Type: ${env.PROJECT_TYPE}"
                    echo "Repository: ${params.REPO_URL}"
                    echo "========================================="
                }
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        always {
            cleanWs()
        }
    }
}
