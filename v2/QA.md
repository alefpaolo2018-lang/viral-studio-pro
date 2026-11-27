# Viral Studio Pro V2 — status de desenvolvimento

Publicação beta opcional autorizada pelo usuário. A entrada principal permanece na V1.2; a V2 estará em /v2/index.html. Liberação definitiva continua condicionada à homologação.

## Implementado no código
- Núcleo modular com timeline de clipes independentes, operações imutáveis, histórico e mídias locais.
- Áudio vinculado ao clipe, extração explícita, faixas independentes, mixagem offline.
- Legendas ligadas à mídia original, Whisper local, revisão, SRT.
- Keyframes, máscaras, camadas de imagem e vídeo sem voz, transições de entrada sem sobreposição temporal.
- Ajustes de imagem, projetos locais, roteiros, ideias, câmera, teleprompter, identidade visual e métricas manuais.
- Exportação H.264/AAC experimental, validação de quadros e verificação de atraso codificado por canal.

## Verificações executadas
49 verificações em lógica JavaScript e DOM simulado, incluindo metadados de dois vídeos reais e sinais sintéticos para teste de atraso. Não representam teste de codificação de mídia em navegador. O teste de núcleo reproduzível está em v2/tests.mjs (node v2/tests.mjs).

## Bloqueios de liberação
- Teste real do editor completo em Safari/iPhone e desktop, incluindo controles de toque, persistência e exportação.
- Verificar H.264/AAC, fontes de diferentes FPS, VFR, edit lists, arquivos sem áudio, múltiplas mídias, corte e reordenação, cancelamento, duração e sincronia labial. A verificação de 5 ms compara a mixagem codificada ao plano, não certifica sincronia labial.
- Testar o download/inferência do Whisper e a precisão em português; revisar legendas e desempenho.
- Exportação de velocidade com voz preservada, curvas de velocidade, 4K e 60 FPS ainda não implementados/validados na V2.
- Isolamento de voz/música, tracking, estabilização avançada, remoção de fundo, efeitos e modelos adicionais, integração de métricas Instagram e recursos de IA generativa pendentes.
- Bibliotecas comerciais, músicas licenciadas, modelos e serviços proprietários de terceiros não foram copiados. Paridade integral depende de licenciamento, permissões, implementação e homologação.
- Não contratar serviços pagos sem autorização.

Não declarar homologação, sincronização labial perfeita ou paridade integral enquanto estes requisitos não forem atendidos.
