export function notFoundHandler(req, res) {
  res.status(404).json({
    ok: false,
    message: 'The requested endpoint does not exist.',
  });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      ok: false,
      message: 'The request body contains invalid JSON.',
    });
  }

  console.error('[api] Unhandled error:', error);

  return res.status(error.status || 500).json({
    ok: false,
    message: 'Something went wrong on our side. Please try again shortly.',
  });
}
