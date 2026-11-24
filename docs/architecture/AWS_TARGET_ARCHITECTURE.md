# Arquitectura AWS objetivo

```text
Usuarios -> Route 53 -> CloudFront + WAF
                         |-> S3 privado (frontend Vite compilado)
                         |-> /api/* -> API Gateway -> ALB interno -> EKS
                                                          |-> viaggio-api / worker
                                                               |-> Aurora PostgreSQL
                                                               |-> ElastiCache Redis
                                                               |-> S3 documentos privados
                                                               |-> SQS / EventBridge / SES
                                                               |-> Secrets Manager / CloudWatch / X-Ray
```

El JSX se compila en CI y se publica como archivos estáticos en S3 privado mediante CloudFront Origin Access Control. El frontend no se ejecuta dentro de Kubernetes.

EKS se reserva para un monolito modular `viaggio-api`, `viaggio-worker` y migraciones como Job. API Gateway es el único ingreso externo a API; el ALB es interno. Terraform administrará infraestructura y Kustomize los manifiestos por entorno cuando se inicie esa fase.

No se aprovisiona AWS en PR 01.
