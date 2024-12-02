## Create helm chart for app and service with ingress and nginx.

helm create node-app-chart
 
cd node-app-chart/

Configuration 
> values.yml

image:
  repository: rajeshecb70/nodeproject
  # This sets the pull policy for images.
  pullPolicy: IfNotPresent
  # Overrides the image tag whose default is the chart appVersion.
  tag: 3.0.0

service:
  # This sets the service type more information can be found here: https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types
  type: NodePort
  # This sets the ports more information can be found here: https://kubernetes.io/docs/concepts/services-networking/service/#field-spec-ports
  port: 80
  TargetPort: 3000
  Protocols: TCP
  name: node-app

>  Service.yml

apiVersion: v1
kind: Service
metadata:
  name: {{ include "node-app-chart.fullname" . }}
  labels:
    {{- include "node-app-chart.labels" . | nindent 4 }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: {{ .Values.service.TargetPort }}
      protocol: {{ .Values.service.protocols }}
      name: {{ .Values.service.name }}
  selector:
    {{- include "node-app-chart.selectorLabels" . | nindent 4 }}

Deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "node-app-chart.fullname" . }}
  labels:
    {{- include "node-app-chart.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "node-app-chart.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      {{- with .Values.podAnnotations }}
      annotations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      labels:
        {{- include "node-app-chart.labels" . | nindent 8 }}
        {{- with .Values.podLabels }}
        {{- toYaml . | nindent 8 }}
        {{- end }}
    spec:
      {{- with .Values.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      serviceAccountName: {{ include "node-app-chart.serviceAccountName" . }}
      securityContext:
        {{- toYaml .Values.podSecurityContext | nindent 8 }}
      containers:
        - name: {{ .Chart.Name }}
          securityContext:
            {{- toYaml .Values.securityContext | nindent 12 }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: {{ .Values.service.TargetPort }}
              protocol: TCP
          livenessProbe:
            {{- toYaml .Values.livenessProbe | nindent 12 }}
          readinessProbe:
            {{- toYaml .Values.readinessProbe | nindent 12 }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          {{- with .Values.volumeMounts }}
          volumeMounts:
            {{- toYaml . | nindent 12 }}
          {{- end }}
      {{- with .Values.volumes }}
      volumes:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
      {{- end }}


# ingress configuration 

helm upgrade node-app-chart ./node-app-chart -n default -f node-app-chart/values.yaml 
W1202 11:38:26.483416  141586 warnings.go:70] annotation "kubernetes.io/ingress.class" is deprecated, please use 'spec.ingressClassName' instead
Release "node-app-chart" has been upgraded. Happy Helming!
NAME: node-app-chart
LAST DEPLOYED: Mon Dec  2 11:38:26 2024
NAMESPACE: default
STATUS: deployed
REVISION: 3
NOTES:
1. Get the application URL by running these commands:
  http://node-app.local/

projects/neurowvzr on  main [?] 
❯ kubectl get pods
NAME                             READY   STATUS    RESTARTS   AGE
node-app-chart-75d585ff7-52qt8   1/1     Running   0          58m

projects/neurowvzr on  main [?] 
❯ kubectl describe ingress node-app-chart
Name:             node-app-chart
Labels:           app.kubernetes.io/instance=node-app-chart
                  app.kubernetes.io/managed-by=Helm
                  app.kubernetes.io/name=node-app-chart
                  app.kubernetes.io/version=1.16.0
                  helm.sh/chart=node-app-chart-0.1.0
Namespace:        default
Address:          
Ingress Class:    <none>
Default backend:  <default>
Rules:
  Host            Path  Backends
  ----            ----  --------
  node-app.local  
                  /   node-app-chart:80 (10.244.0.4:3000)
Annotations:      kubernetes.io/ingress.class: nginx
                  meta.helm.sh/release-name: node-app-chart
                  meta.helm.sh/release-namespace: default
                  nginx.ingress.kubernetes.io/rewrite-target: /
Events:
  Type    Reason  Age   From                      Message
  ----    ------  ----  ----                      -------
  Normal  Sync    39s   nginx-ingress-controller  Scheduled for sync


 
 # Commands to setup
 helm install node-app-chart ./node-app-chart
 minikube start -p "mycluster"
 minikube startus
 
 helm install node-app-chart ./node-app-chart
 kubectl get pods
 
 kubectl get svc
 kubectl get all 
 helm install node-app-chart ./node-app-chart
 helm list -A
 helm upgrade node-app-chart 
 helm upgrade node-app-chart ./node-app-chart -n default -f node-app-chart/values.yaml 


 # Enable the ingress in minikube
 minikube addons enable ingress -p mycluster


 minikube profile list

 helm upgrade node-app-chart ./node-app-chart -n default -f node-app-chart/values.yaml 
 kubectl get pods
 kubectl describe ingress node-app-chart
 kubectl get all
 minikube ip -p mycluster
 kubectl logs -n kube-system -l app.kubernetes.io/name=ingress-nginx


# Domain setup in local

minikube ip
192.168.49.2
file : /etc/hosts
## Added in file :

192.168.49.2 test-app.local

# Check on the browser

http://node-app.local/uptime