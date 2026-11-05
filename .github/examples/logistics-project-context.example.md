# Example: Project Context (Logistics Platform)

> Reference example of a filled-in `project_context.md`. Copy the structure, not the content. The template lives at the repo root: `project_context.md`.

## Business Domain

This project belongs to the logistics and transportation domain.

The platform helps companies manage freight shipments, drivers, vehicles, delivery tracking, and operational reporting through a centralized web platform.

---

## Business Goal

The main goal of the platform is to improve operational visibility and reduce manual coordination between logistics operators, drivers, and customers.

The system should:

- centralize shipment management
- provide real-time delivery tracking
- reduce operational delays
- improve delivery traceability
- simplify communication between stakeholders

---

## Main Users

| User Type | Description |
|---|---|
| Logistics Operator | Manages shipments, assigns drivers, and monitors operations |
| Driver | Receives delivery assignments and updates shipment status |
| Customer | Tracks delivery progress and delivery confirmations |
| Administrator | Manages system configuration, permissions, and operational monitoring |

---

## Main Workflows

### Shipment Creation Workflow

1. Operator creates shipment
2. Shipment is assigned to a driver
3. Driver receives assignment
4. Delivery process starts
5. Shipment status updates in real time
6. Customer receives delivery confirmation

---

### Delivery Tracking Workflow

1. Driver updates shipment status
2. Backend processes updates
3. Customer tracking page refreshes status
4. Alerts are triggered for delays or incidents

---

### Incident Reporting Workflow

1. Driver reports operational issue
2. Operator reviews incident
3. Corrective actions are assigned
4. Incident is resolved and logged

---

## Business Rules

| Rule ID | Rule |
|---|---|
| BR-001 | Only authenticated operators can create shipments |
| BR-002 | Drivers can only access shipments assigned to them |
| BR-003 | Shipment status transitions must follow the allowed lifecycle |
| BR-004 | Customers can only track shipments linked to their orders |
| BR-005 | Delivery confirmation requires proof of delivery |
| BR-006 | Operational incidents must be auditable |

---

## Operational Constraints

The platform has several operational constraints:

- shipments are business-critical operations
- mobile access is required for drivers
- low-latency updates are important
- delivery tracking should remain available during peak traffic
- operational downtime must be minimized

---

## Scalability Expectations

Expected scale during the first year:

- ~10,000 active shipments per day
- ~2,000 concurrent users during peak hours
- continuous growth in shipment tracking events
- increasing reporting and analytics usage

Future scalability considerations:

- multi-region support
- event-driven tracking updates
- real-time operational dashboards

---

## Security Considerations

The platform handles operational and customer-related information.

Security expectations include:

- role-based authentication and authorization
- secure session handling
- audit logging for operational changes
- restricted access to operational dashboards
- secure handling of customer delivery information
- protection against unauthorized shipment access

---

## Reliability Expectations

The platform is operationally critical.

Requirements include:

- high availability during business hours
- rollback capability during releases
- operational monitoring and alerting
- reliable delivery event processing
- retry-safe shipment updates

---

## Known Risks

| Risk | Impact |
|---|---|
| Delayed shipment updates | Operational confusion and customer dissatisfaction |
| External GPS provider instability | Tracking interruptions |
| High reporting workloads | Potential performance degradation |
| Operational dependency on real-time updates | Increased infrastructure sensitivity |

---

## Current Challenges

Current operational and technical challenges include:

- manual shipment coordination
- fragmented operational visibility
- inconsistent delivery tracking
- limited operational observability
- delayed incident response
- duplicated operational workflows

---

## Future Expectations

The platform is expected to evolve with:

- AI-assisted route optimization
- predictive delivery delay analysis
- automated operational alerts
- mobile applications
- external ERP integrations
- event-driven architecture for tracking updates
- advanced operational analytics

---

## Final Notes

The platform prioritizes operational reliability, maintainability, scalability, and real-time visibility over rapid feature delivery without quality controls.
