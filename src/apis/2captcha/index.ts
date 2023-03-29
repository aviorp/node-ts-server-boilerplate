import axios from 'axios';

const captchaInstance = axios.create({
  baseURL: 'http://2captcha.com',
  params: {
    key: process.env.CAPTCHA_API_KEY,
    json: true,
  },
});
captchaInstance.interceptors.response.use(response => response.data);

enum STATUS {
  CAPCHA_NOT_READY = 'CAPCHA_NOT_READY',
  ERROR_CAPTCHA_UNSOLVABLE = 'ERROR_CAPTCHA_ERROR_CAPTCHA_UNSOLVABLE',
  ERROR_ZERO_BALANCE = 'ERROR_ZERO_BALANCE',
}

async function getCaptchaRequestId<T>(params): Promise<T> {
  const { method, siteKey, pageUrl, publicKey, surl } = params;

  const data = await captchaInstance.get('/in.php', {
    params: {
      sitekey: siteKey,
      pageurl: pageUrl,
      publickey: publicKey,
      method,
      surl,
    },
  });

  if (data.request === STATUS.ERROR_ZERO_BALANCE) {
    throw new Error('2captcha balance is 0');
  }

  return data.request;
}

async function getSolvedCaptcha(requestId, sleepMs = 15000): Promise<any> {
  const data = await captchaInstance.get('/res.php', {
    params: {
      action: 'get',
      id: requestId,
    },
  });

  if (data.request === STATUS.CAPCHA_NOT_READY) {
    await setTimeout(() => {}, sleepMs);

    return getSolvedCaptcha(requestId, 5000);
  }

  if (data.status !== 1) {
    if (data.request === STATUS.ERROR_CAPTCHA_UNSOLVABLE) throw new Error('capthca cannot be solved');
  }

  return data.request;
}

export async function hCaptcha({ siteKey, pageUrl }): Promise<string> {
  const params = {
    method: 'hcaptcha',
    siteKey,
    pageUrl,
  };

  const requestId = await getCaptchaRequestId(params);
  const id = await getSolvedCaptcha(requestId);

  return id;
}

export async function funCaptcha(pageUrl: string): Promise<string> {
  const params = {
    method: 'funcaptcha',
    pageUrl,
    surl: 'https://client-api.arkoselabs.com',
    publicKey: 'FDED3FA5-1764-490F-8BA3-7CE7B0553BC9',
  };

  const requestId = await getCaptchaRequestId(params);
  const id = await getSolvedCaptcha(requestId);

  return id;
}
