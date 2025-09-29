// Configurações de segurança para a aplicação
export const SECURITY_CONFIG = {
  // Configurações de CSP (Content Security Policy)
  CSP: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'img-src': ["'self'", "data:", "https:", "blob:"],
    'connect-src': [
      "'self'", 
      "https://sistema.mectechequipamentos.com.br",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"]
  },

  // Domínios permitidos para imagens
  ALLOWED_IMAGE_DOMAINS: [
    'sistema.mectechequipamentos.com.br',
    'mectechequipamentos.com.br',
    'localhost',
    '127.0.0.1'
  ],

  // Configurações de rate limiting
  RATE_LIMIT: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por IP
    message: 'Muitas requisições deste IP, tente novamente em 15 minutos.'
  },

  // Configurações de validação
  VALIDATION: {
    MAX_SEARCH_LENGTH: 100,
    MAX_LIMIT: 100,
    MIN_LIMIT: 1,
    MAX_PAGE: 1000
  },

  // Headers de segurança
  SECURITY_HEADERS: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  }
};

// Função para sanitizar strings
export const sanitizeString = (input: string, maxLength: number = 100): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>\"'&]/g, '') // Remover caracteres perigosos
    .trim()
    .substring(0, maxLength);
};

// Função para validar URLs
export const isValidUrl = (url: string, allowedDomains: string[]): boolean => {
  try {
    const urlObj = new URL(url);
    return allowedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
};

// Função para validar números
export const validateNumber = (value: any, min: number = 0, max: number = Infinity): number | undefined => {
  const num = parseInt(value);
  if (isNaN(num) || num < min || num > max) return undefined;
  return num;
};
