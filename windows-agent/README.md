# SmartLab Windows Agent (Member 1)

Create the C#/.NET solution here, for example `SmartLab.Agent/SmartLab.Agent.csproj`.

Planned responsibilities:
- Stable registered computer identity.
- Supported Windows session event collection.
- Authenticated HTTPS event delivery to `/api/v1/agent/events`.
- Local retry queue and idempotent event IDs.
- Service installation/deployment instructions.

The agent should not collect passwords. Production use requires approved Windows event permissions, per-agent credentials or certificates, TLS, and college IT approval for identity integration. Do not claim a normal agent executable enforces pre-desktop login.
