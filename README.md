# tigrcorn.com

Standalone MdWrk lander repository for [tigrcorn.com](https://tigrcorn.com).

## Commands

- `npmctl install`
- `npmctl check`
- `npmctl build`
- `npmctl docker:build`
- `npmctl dns:plan`
- `npmctl deploy:dry-run`

The local npm scripts mirror those npmctl lifecycle commands for CI and Docker workers.

## Deployment

This repo deploys as the `tigrcorn-com` self-hosted Docker service. DNS is managed through Namecheap for the `tigrcorn.com` zone and is declared in `site.manifest.json`.
