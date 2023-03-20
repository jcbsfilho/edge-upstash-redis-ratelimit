# Azion Edge Application with Upstash Redis Ratelimit

## Getting Started with Azion and Upstash Redis RateLimit

Rate limiting is a standard solution to many of these problems and should work out of the box.

## *1* - Create Account Azion

1. [Welcome to the Edge](https://manager.azion.com/signup/)
2. Create [Personal Token](https://manager.azion.com/iam/personal-tokens)

## *2* - Create a Redis database:

Create a Global database for the best edge latency in [Upstash Console](https://console.upstash.com/). 


## *3* - Deploy on Edge:

**There are two deployment modes**

----------

## Marketplace

*Build and Application [choose a template](https://stage-manager.azion.com/build-application/build/choose-template)*

Choose **Edge Application Upstash Ratelimit** template

Generate your personal github token:

Doc: [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)


Enter the information in the settings tab:

`Application Name` *Application name in RTM Azion*

`Edge Function args` *JSON args required for build and connection to redis database { UPSTASH_REDIS_REST_URL: "", UPSTASH_REDIS_REST_TOKEN: "", UPSTASH_LIMIT: 5, UPSTASH_LIMIT_WINDOW: "10 s" }*

`Github Personal Token` *Github Personal Token*

`Azion Personal Token` *Azion Personal Token*


----------

## Github Actions

*Secrets Github*

Add the Redis Database access credentials to the secrets

```bash
UPSTASH_REDIS_REST_URL=<>
UPSTASH_REDIS_REST_TOKEN=<>
UPSTASH_LIMIT=<>
UPSTASH_LIMIT_WINDOW=<>

```

Azion Personal token
```bash
AZION_PERSONAL_TOKEN=<>
```

*Create the Pull Request for automatic deployment*

Create a pull request to the main branch to automatically deploy.