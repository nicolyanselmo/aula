Backend (Firebase) - instruções iniciais

Este diretório é um placeholder para a integração com Firebase:

Sugestão:
- `backend/functions/` para Cloud Functions (Node.js)
- `firebase.json` e `firestore.rules` no root do backend para deploy

Recomendações iniciais:
- Usar Cloud Functions para lógica crítica: decrementar estoque, validar disponibilidade e enviar notificações.
- Criar regras do Firestore que limitem quem pode alterar produtos (apenas funcionários).
