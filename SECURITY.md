# Security Policy

## Reporting a vulnerability

If you believe you have found a security issue in this site or in the
NavisLabs platform, please report it by email:

- **security@navislabs.in** (preferred)
- hello@navislabs.in

We acknowledge reports within two business days and aim to resolve
verified vulnerabilities as quickly as reasonable.

The machine-readable contact record lives at
[`/.well-known/security.txt`](public/.well-known/security.txt) per
RFC 9116.

## Scope

This repository is the marketing site (Next.js, statically prerendered).
It talks to Calendly for scheduling and, when configured, PostHog for
analytics. It has no server routes, no user accounts, and stores no
customer data.

For product-platform vulnerabilities, use the same contact addresses and
mention the platform component in the subject line.

## Please do not

- Perform automated scans that generate significant traffic.
- Attempt denial-of-service testing.
- Publish details of an unresolved vulnerability.
