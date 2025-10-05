#!/bin/bash

# ===============================
# Configurações da VM e do Projeto
# ===============================
USER="root"
HOST="177.154.180.41"
DEST="/var/www/api_natalService"
REPO="https://github.com/francinaldodeandrade/backend_natal_service.git"
BRANCH="main"

# ===============================
# 1. Atualizar repositório local
# ===============================
echo "🔄 Verificando atualizações no Git..."
git fetch origin $BRANCH
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/$BRANCH)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo "✅ Nenhuma atualização encontrada."
    exit 0
else
    echo "🚀 Novas alterações detectadas. Preparando deploy..."
fi

# ===============================
# 2. Criar arquivo temporário para envio
# ===============================
TMP_DIR=$(mktemp -d)
echo "📦 Criando cópia do projeto em $TMP_DIR"
git archive $BRANCH | tar -x -C $TMP_DIR

# ===============================
# 3. Enviar arquivos para a VM
# ===============================
echo "📤 Enviando arquivos para $USER@$HOST:$DEST..."
scp -r $TMP_DIR/* $USER@$HOST:$DEST || { echo "❌ Erro ao enviar arquivos"; exit 1; }

# ===============================
# 4. Conectar na VM e atualizar app
# ===============================
echo "🔧 Instalando dependências e reiniciando aplicação..."
ssh $USER@$HOST << EOF
    cd $DEST
    # Instalar dependências
    npm install
    # Verificar se PM2 já está rodando
    if pm2 list | grep -q natal-service; then
        pm2 restart natal-service
    else
        pm2 start index.js --name natal-service
    fi
    pm2 save
EOF

# ===============================
# 5. Limpeza e conclusão
# ===============================
rm -rf $TMP_DIR
echo "✅ Deploy concluído! Acesse: http://$HOST:3030"


# #!/bin/bash

# APP_DIR="/var/www/api_natalService"

# echo "🔄 Entrando no diretório $APP_DIR"
# cd $APP_DIR || exit

# echo "📦 Atualizando código..."
# git reset --hard
# git pull origin main

# echo "📦 Instalando dependências..."
# npm install --omit=dev

# echo "🔧 Reiniciando aplicação com PM2..."
# pm2 restart api_natalService || pm2 start src/server.js --name api_natalService

# echo "✅ Deploy concluído!"
