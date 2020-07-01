
def COLOR_MAP = [
    'SUCCESS': 'good',
    'FAILURE': 'danger',
]

def BITBUCKET_STATUS_MAP = [
    'SUCCESS': 'SUCCESSFUL',
    'FAILURE': 'FAILED',
]

def notifyBitbucket(state) {
    bitbucketStatusNotify(buildState: state, repoSlug: 'kidsloop-canvas', commitId: env.GIT_COMMIT, buildDescription: STAGE_NAME)
}

pipeline {
    agent { label 'nodejs' && 'npm' }
    environment {
        CI = 'true'
    }
    stages {
        stage('Synchronize npm packages') {
            steps {
                notifyBitbucket('INPROGRESS')
                sh 'npm i'
            }
        }
        stage('Run unit tests') {
            steps {
                notifyBitbucket('INPROGRESS')
                sh 'npm run test:ci'
            }
        }
        stage('Build') {
            steps {
                notifyBitbucket('INPROGRESS')
                sh 'npm run build'
            }
        }
    }
    post {
        always {
            junit 'junit.xml'
            cobertura(coberturaReportFile: 'coverage/cobertura-coverage.xml')
            notifyBitbucket(BITBUCKET_STATUS_MAP[currentBuild.currentResult])
	        slackSend channel: '#kidsloop-live-ci',
	        color: COLOR_MAP[currentBuild.currentResult],
	        message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}"
	    }
    }
}