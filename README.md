# 🏠 Kozen Secret Manager Module

Kozen-Secret extends the Kozen automation ecosystem with a unified way to manage API keys, credentials, and certificates across multiple secret backends. By inheriting Kozen’s dependency injection, structured logging, and multi-interface runtime, teams can expose the same secret-management capabilities through CLI actions or Model Context Protocol (MCP) tools with minimal additional wiring [Kozen Wiki](https://github.com/mongodb-industry-solutions/kozen-engine/wiki).

## 🧭 Positioning within Kozen
Kozen provides a lightweight task execution framework that mixes automation pipelines, IaC orchestrators, and MCP-aware assistants under one configuration-driven runtime [Kozen Wiki](https://github.com/mongodb-industry-solutions/kozen-engine/wiki). Kozen-Secret plugs into that foundation the same way other modules—such as Kozen Triggers for change-stream automation—register controllers and services via the Kozen IoC container [Kozen Triggers Wiki](https://github.com/mongodb-industry-solutions/kozen-trigger/wiki). This keeps the operator experience consistent: existing Kozen deployments can load the secret module through configuration, and newcomers can bootstrap both modules side by side.

## 🔐 Vault coverage today
Kozen-Secret bundles delegates for AWS Secrets Manager—focused on retrieving JSON secrets through the AWS SDK—and MongoDB Client-Side Field Level Encryption (CSFLE), which stores encrypted documents with optional AWS KMS support when running in hybrid environments [AWS Secrets Manager Overview](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) [MongoDB CSFLE Guide](https://www.mongodb.com/docs/manual/core/csfle/). The module bridges both providers through a shared controller, so operators choose the backend per action (`--driver=aws|mdb`) while the IoC configuration resolves credentials, regions, and database settings.

## 🛤️ Roadmap and integrations
The provider architecture is intentionally pluggable; future releases target additional enterprise vaults such as Azure Key Vault, Google Cloud Secret Manager, HashiCorp Vault, CyberArk Conjur, and 1Password Secrets Automation. Because the module relies on standard Kozen composition rules, it can co-exist with workflow modules that trigger rotations, audit access, or hydrate application configuration at deploy time—streamlining secret operations across automations inspired by Kozen Triggers’ self-hosted patterns [Kozen Triggers Wiki](https://github.com/mongodb-industry-solutions/kozen-trigger/wiki).

## 📚 References
- [Kozen Triggers Wiki](https://github.com/mongodb-industry-solutions/kozen-trigger/wiki)
- [Disclaimer and Usage Policy](https://github.com/mongodb-industry-solutions/kozen-engine/wiki/POLICY)
- [How to Contribute to Kozen Ecosystem](https://github.com/mongodb-industry-solutions/kozen-engine/wiki/Contribute)
- [Official Kozen Documentation](https://github.com/mongodb-industry-solutions/kozen-engine/wiki)
- [AWS Secrets Manager Overview](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)
- [MongoDB CSFLE Guide](https://www.mongodb.com/docs/manual/core/csfle/)

---

← Previous: [Home](https://github.com/mongodb-industry-solutions/kozen-secret/wiki) | Next: [Introduction](https://github.com/mongodb-industry-solutions/kozen-secret/wiki/Introduction) →
