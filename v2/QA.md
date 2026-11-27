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

## Mobile Pro 2.1
40 verificações de integração em DOM simulado passaram: importação sem teto artificial, menus contextuais, corte, áudio vinculado, controles de qualidade, posicionamento de texto, aparagem e escala temporal. Acrescentados posteriormente miniaturas amostradas, alça de reordenação e pinça da camada; sintaxe verificada. Núcleo, mixagem e verificação de sincronização preservados. Homologação física do iPhone, gestos reais e exportação de mídia continuam pendentes.

## Auto Director full pipeline
- Added one-click pipeline: Portuguese Whisper transcription, speech-aware silence trimming, optional opening-hook teaser, remapping of existing overlay/audio layers, progressive word captions, conservative sampled exposure/contrast/saturation, per-clip transitions and subtle zoom keyframes.
- Original video speech is extracted into synchronized audio layers (including clip playback-rate timing), original picture track is muted to prevent double audio, voice cleanup is applied as a low-memory high-pass/low-pass/compressor/adaptive expander graph in both preview and export, and imported music is automatically ducked under speech.
- Added 13 model-level integration checks: hook selection, silence cuts, layer remapping, teaser ordering, music continuity, extracted speech tracks, duplicate-audio prevention, mixed voice/music plan, playback-rate preservation, audio-layer source bounds, caption style persistence, project validation and FPS conversion.
- JavaScript syntax checked for studio.mjs, core.mjs and renderer.mjs. Actual device/browser media export and lip-sync still require real-device validation.
- Limitations: no copyrighted/trending music is auto-inserted; users add a track they are licensed to use. Speech recognition requires network access to download the selected Whisper model. Optional on-device MediaPipe face and common-object tracking is attempted for vertical reframing; availability and detections depend on browser/device performance. If tracking is unavailable, landscape framing is preserved rather than cropped blindly.

- Added optional MediaPipe face/object detection on sampled frames, smoothed subject centers, and keyframed crop position for vertical 9:16 reframing when a presenter or supported object is detected.
