module.exports = {
  reactStrictMode: true,
  eslint: {
    // eslint é uma devDependency; a imagem de produção do Docker instala
    // apenas dependências de produção, então o lint roda separadamente
    // (via `npm run lint`) e não bloqueia o build.
    ignoreDuringBuilds: true,
  },
}
