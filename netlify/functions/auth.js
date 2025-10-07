// netlify/functions/auth.js
// ✅ GitHub OAuth handler for Decap CMS on Netlify
// Works with environment variables: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, OAUTH_ALLOWED_ORIGINS

const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

exports.handler = async (event) => {
  try {
    const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      return {
        statusCode: 500,
        body: 'Missing GitHub OAuth credentials in environment variables.',
      };
    }

    const host = event.headers.host || '';
    const referer = event.headers.referer || `https://${host}/`;
    const siteBase = new URL(referer).origin;
    const functionUrl = `${siteBase}/.netlify/functions/auth`;

    const allowed = (process.env.OAUTH_ALLOWED_ORIGINS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const origin = event.headers.origin || siteBase;
    const okOrigin = allowed.length === 0 || allowed.includes(origin);

    const params = new URLSearchParams(event.queryStringParameters || {});
    const code = params.get('code');

    // ✅ Step 1: Redirect user to GitHub authorization
    if (!code) {
      const authorize = new URL('https://github.com/login/oauth/authorize');
      authorize.searchParams.set('client_id', CLIENT_ID);
      authorize.searchParams.set('scope', 'repo'); // or "public_repo" if your repo is public
      authorize.searchParams.set('redirect_uri', functionUrl);

      return {
        statusCode: 302,
        headers: { Location: authorize.toString() },
        body: '',
      };
    }

    // ✅ Step 2: Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: functionUrl,
      }),
    });

    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok || !tokenJson.access_token) {
      return {
        statusCode: 400,
        body: `OAuth error: ${JSON.stringify(tokenJson)}`,
      };
    }

    const token = tokenJson.access_token;

    // ✅ Step 3: Notify Decap CMS of success
    const html = `
<!doctype html>
<html>
  <body>
    <script>
      (function () {
        var payload = JSON.stringify({ token: ${JSON.stringify(token)} });
        ${okOrigin
          ? "window.opener && window.opener.postMessage('authorization:github:success:' + payload, '*');"
          : ''}
        window.close();
      })();
    </script>
  </body>
</html>`;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: html,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: `Function error: ${e.message}`,
    };
  }
};
