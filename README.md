# DevOps Training — CI/CD Demo Site

A simple static HTML/CSS/JS site deployed to Amazon S3, served through
Amazon CloudFront, with an automated GitHub Actions pipeline.

## Pipeline

```
Code Push -> GitHub Actions -> Test -> Build/Package -> Deploy
```

Pushing to `main` triggers `.github/workflows/deploy.yml`, which:

1. **Test** — runs `npm test` (`test.js`) to sanity-check `index.html`.
2. **Build/Package** — runs `npm run build` (`build.js`), which stamps the
   version from the `VERSION` file into `index.html` and produces `dist/`.
3. **Deploy** — syncs `dist/` to the S3 bucket and invalidates the
   CloudFront distribution so the new version is served immediately.

## Required GitHub repository secrets

| Secret | Description |
| --- | --- |
| `AWS_DEPLOY_ROLE_ARN` | IAM role ARN assumed via GitHub's OIDC provider (no static AWS keys needed) |
| `S3_BUCKET_NAME` | Name of the S3 bucket hosting the site |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID in front of the bucket |

## Local development

```bash
npm test    # run checks against index.html
npm run build   # produce dist/ with the stamped version
```

Bump the version by editing `VERSION` and pushing to `main`.
