# Tejere Anderson Services

Static React/Vite website using the existing Anbe visual design and the supplied Tejere HTML concept as its content source.

## Branches

- `anbe`: the original site, preserved before the Tejere changes.
- `tejere`: the Tejere site and its separate Cloudflare Pages configuration.
- `master`: unchanged. The existing Anbe Cloudflare projects have not been reconfigured.

The branches are local until explicitly pushed. Do not merge Tejere into Anbe's production branch. Anbe's Git-connected Pages project may build previews for other branches; review its preview-branch settings before connecting/pushing Tejere there.

## Content and design

Edit `client/src/data/tejere.ts` for company details, services, leadership, terrain, history, and placeholders. `***` means the information was not supplied. The EGTL history is labelled as the CEO's professional experience, not a company contract portfolio. No Anbe testimonials, clients, project metrics, or contact details are reused.

`client/app/design.css` preserves the original Anbe page styling. `client/app/tejere.css` contains small adjustments for the new content. The existing animated video hero is retained and still loads its video from its original CloudFront URL. The supplied concept's portrait is stored in `client/public-tejere`.

Only `client/public-tejere` is copied into the published build. The inherited `client/public`, admin, and worker directories are not part of this deployment. The Tejere routes do not use the Anbe API, databases, authentication, reports, or EmailJS. Old implementation files remain in the repository for reference and on `anbe`.

The contact form is visibly disabled and sends/saves nothing. Replace the missing contact information and implement an agreed delivery method before enabling it. Newsletter submission and placeholder social links are not active.

## Local commands

```sh
npm ci
npm run install:all
npm run dev
npm run typecheck
npm run build
npm run test:smoke
```

Browser smoke tests use installed Microsoft Edge and a dedicated local port, 4187. They cover the public pages, removed routes, mobile navigation, terrain controls, missing details and disabled enquiry submission.

## Cloudflare Pages

- Project: `tejere-anderson-services`
- Production branch: `tejere`
- Output: `client/dist`
- Configuration: root `wrangler.toml`
- No Worker functions, bindings, secrets or backend resources are required.

```sh
# First-time setup only:
npx wrangler pages project create tejere-anderson-services --production-branch tejere

# Build and upload only to Tejere:
npm run deploy
```

The deployment is a direct upload, separate from Anbe's Git integration. Future changes require `npm run deploy`; committing locally does not publish them. A custom domain has not been specified.

For a future Git integration, select only the `tejere` production branch, use build command `npm ci --prefix client && npm run build`, and output directory `client/dist`. Cloudflare does not let a Direct Upload project switch to Git integration; create a new Git-connected Pages project if automatic deployments are required.

Cloudflare references: [Pages configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/), [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [Branch controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/).
