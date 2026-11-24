# Línea base de seguridad AWS

- CloudFront con WAF, HTTPS/ACM, reglas administradas y rate limiting.
- Cognito con Authorization Code + PKCE, invitaciones, MFA para roles financieros y tokens cortos.
- Aurora/RDS PostgreSQL privado, TLS, KMS, Secrets Manager, backups y pruebas de restauración.
- S3 documental privado, Block Public Access, SSE-KMS, versionamiento, URL prefirmada corta, antivirus, lifecycle y CloudTrail Data Events.
- EKS con namespaces, Pod Identity/IRSA, imágenes no-root, filesystem de solo lectura, Network Policies, probes, limits, HPA, PDB y escaneo ECR.
- GuardDuty, CloudTrail, CloudWatch y X-Ray para detección, auditoría y observabilidad.
