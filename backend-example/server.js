// Exemplo de servidor backend para conectar com MySQL
// Este arquivo é apenas um exemplo - você pode adaptar conforme sua infraestrutura

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração de CORS mais restritiva
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sem origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Lista de domínios permitidos
    const allowedOrigins = [
      'https://mectechequipamentos.com.br',
      'https://www.mectechequipamentos.com.br',
      'https://sistema.mectechequipamentos.com.br',
      'http://localhost:3000',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:8080'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400 // 24 horas
};

// Middleware de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP por janela de tempo
  message: {
    error: 'Muitas requisições deste IP, tente novamente em 15 minutos.',
    retryAfter: '15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Aplicar rate limiting
app.use('/api/', limiter);

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Limitar tamanho do JSON
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuração do banco MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fabrica_produtos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Pool de conexões
const pool = mysql.createPool(dbConfig);

// Middleware de tratamento de erros
const handleError = (res, error, message = 'Erro interno do servidor') => {
  console.error(message, error);
  res.status(500).json({ 
    error: message,
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

// Middleware de validação de entrada
const validateProductParams = (req, res, next) => {
  const { page, limit, category, search, availability } = req.query;
  
  // Validar e sanitizar parâmetros
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
  
  // Sanitizar string de busca
  const sanitizedSearch = search ? 
    search.toString().replace(/[<>\"'&]/g, '').substring(0, 100) : undefined;
  
  // Validar categoria
  const sanitizedCategory = category ? 
    category.toString().replace(/[^a-zA-Z0-9\s\-_]/g, '') : undefined;
  
  // Validar availability
  const sanitizedAvailability = availability === 'true' ? true : 
                               availability === 'false' ? false : undefined;
  
  req.sanitizedQuery = {
    page: pageNum,
    limit: limitNum,
    category: sanitizedCategory,
    search: sanitizedSearch,
    availability: sanitizedAvailability
  };
  
  next();
};

// Rota para buscar todos os produtos
app.get('/api/products', validateProductParams, async (req, res) => {
  try {
    const { page, limit, category, search, availability } = req.sanitizedQuery;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        id, 
        name, 
        description, 
        price, 
        image, 
        category, 
        specifications,
        availability,
        created_at,
        updated_at
      FROM products 
      WHERE 1=1
    `;
    
    const queryParams = [];

    // Filtros opcionais
    if (category) {
      query += ' AND category = ?';
      queryParams.push(category);
    }

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (availability !== undefined) {
      query += ' AND availability = ?';
      queryParams.push(availability === 'true');
    }

    // Ordenação e paginação
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(parseInt(limit), parseInt(offset));

    // Executar query
    const [products] = await pool.execute(query, queryParams);

    // Contar total de registros
    let countQuery = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
    const countParams = [];
    
    if (category) {
      countQuery += ' AND category = ?';
      countParams.push(category);
    }
    
    if (search) {
      countQuery += ' AND (name LIKE ? OR description LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }
    
    if (availability !== undefined) {
      countQuery += ' AND availability = ?';
      countParams.push(availability === 'true');
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      products,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    handleError(res, error, 'Erro ao buscar produtos');
  }
});

// Middleware de validação de ID
const validateId = (req, res, next) => {
  const { id } = req.params;
  const productId = parseInt(id);
  
  if (!productId || productId <= 0 || !Number.isInteger(productId)) {
    return res.status(400).json({ 
      error: 'ID inválido',
      message: 'O ID deve ser um número inteiro positivo'
    });
  }
  
  req.sanitizedId = productId;
  next();
};

// Rota para buscar produto por ID
app.get('/api/products/:id', validateId, async (req, res) => {
  try {
    const id = req.sanitizedId;

    const [products] = await pool.execute(
      `SELECT 
        id, 
        name, 
        description, 
        price, 
        image, 
        category, 
        specifications,
        availability,
        created_at,
        updated_at
      FROM products 
      WHERE id = ?`,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(products[0]);

  } catch (error) {
    handleError(res, error, 'Erro ao buscar produto');
  }
});

// Rota para buscar produtos por categoria
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const [products] = await pool.execute(
      `SELECT 
        id, 
        name, 
        description, 
        price, 
        image, 
        category, 
        specifications,
        availability,
        created_at,
        updated_at
      FROM products 
      WHERE category = ? 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?`,
      [category, parseInt(limit), parseInt(offset)]
    );

    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM products WHERE category = ?',
      [category]
    );

    const total = countResult[0].total;

    res.json({
      products,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    handleError(res, error, 'Erro ao buscar produtos por categoria');
  }
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Encerrando servidor...');
  pool.end();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Encerrando servidor...');
  pool.end();
  process.exit(0);
});
