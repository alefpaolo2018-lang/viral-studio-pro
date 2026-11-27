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
- Curvas Flash Out e Impact Punch foram implementadas na prévia e no mixer de exportação, com o mesmo mapa de tempo para voz e imagem. Ainda precisam de homologação em Safari/iPhone e em arquivos reais, especialmente VFR, 4K e 60 FPS.
- Isolamento avançado de voz/música, estabilização avançada, remoção de fundo, integração de métricas Instagram e recursos de IA generativa permanecem pendentes. O pacote de efeitos local descrito abaixo já foi integrado.
- Bibliotecas comerciais, músicas licenciadas, modelos e serviços proprietários de terceiros não foram copiados. Paridade integral depende de licenciamento, permissões, implementação e homologação.
- Não contratar serviços pagos sem autorização.

Não declarar homologação, sincronização labial perfeita ou paridade integral enquanto estes requisitos não forem atendidos.

## Mobile Pro 2.1
40 verificações de integração em DOM simulado passaram: importação sem teto artificial, menus contextuais, corte, áudio vinculado, controles de qualidade, posicionamento de texto, aparagem e escala temporal. Acrescentados posteriormente miniaturas amostradas, alça de reordenação e pinça da camada; sintaxe verificada. Núcleo, mixagem e verificação de sincronização preservados. Homologação física do iPhone, gestos reais e exportação de mídia continuam pendentes.

## Auto Director full pipeline
- Added one-click pipeline: Portuguese Whisper transcription, speech-aware silence trimming, optional opening-hook teaser, remapping of existing overlay/audio layers, progressive word captions, conservative sampled exposure/contrast/saturation, per-clip transitions and subtle zoom keyframes.
- Original video speech is extracted into synchronized audio layers (including clip playback-rate timing), original picture track is muted to prevent double audio, voice cleanup is applied as a low-memory high-pass/low-pass/compressor/adaptive expander graph in both preview and export, and imported music is automatically ducked under speech.
- Added 17 model-level integration checks: hook selection, silence cuts, layer remapping, teaser ordering, music continuity, extracted speech tracks, duplicate-audio prevention, mixed voice/music plan, playback-rate preservation, audio-layer source bounds, caption style persistence, project validation and FPS conversion.
- JavaScript syntax checked for studio.mjs, core.mjs and renderer.mjs. Actual device/browser media export and lip-sync still require real-device validation.
- Limitations: no copyrighted/trending music is auto-inserted; users add a track they are licensed to use. Speech recognition requires network access to download the selected Whisper model. Optional on-device MediaPipe face and common-object tracking is attempted for vertical reframing; availability and detections depend on browser/device performance. If tracking is unavailable, landscape framing is preserved rather than cropped blindly.

- Added optional MediaPipe face/object detection on sampled frames, smoothed subject centers, and keyframed crop position for vertical 9:16 reframing when a presenter or supported object is detected.

- Audio playback-rate regression tests added to `tests.mjs`: extracted voice layers and ordinary audio overlays retain source/output duration ratios and pass project validation at non-1× speed.

- Additional verification in the tool-side harness: 17 passing checks including crop translation, voice-cleanup node graph, teaser selection, and cache-busting version.

## Master Effects Pack 1.0 — integrado ao Mobile Pro 2.12
- Quatro LUTs 3D (.cube) instaladas no projeto: Warm Vintage, Teal & Orange, Cyberpunk Neon e Noir High Contrast. O editor também aceita importar LUTs .cube próprias e guardá-las localmente.
- Parser .cube com validação de tamanho, domínio, contagem de amostras e interpolação trilinear; WebGL2 com textura 3D e fallback por pixels quando WebGL2 não estiver disponível.
- Shaders GLSL para RGB Split Glitch, Zoom Blur, VHS/scanlines, film grain, light leak, whip pan, ink matte, bokeh e dust; transições Flash, Dip, Glitch, Zoom Blur, Light Leak, Whip Pan e Ink Matte.
- Blend modes Screen, Multiply, Overlay e Linear Dodge em camadas de imagem/vídeo.
- Presets de texto/legenda Bounce Pop, Typewriter e Neon Glow; fontes Montserrat, Bebas Neue, Anton e Permanent Marker, com fallback do sistema.
- Curvas de velocidade Flash Out e Impact Punch com curva aplicada à prévia e ao áudio exportado, preservando o mesmo relógio de origem do vídeo.
- Biblioteca de cinco efeitos sonoros WAV sintetizados localmente (Whoosh, Riser, Impact, Glitch e Shutter); Auto Director acrescenta Whoosh original na abertura quando identifica um trecho de gancho.
- Manifesto em v2/effects/manifest.json e quatro arquivos .cube em v2/effects/luts/. O PWA inclui cache dos novos módulos e LUTs.
- Não foram incluídos MP4/PNG comerciais ou de terceiros citados apenas como fontes no documento do usuário: o arquivo não continha esses binários/licenças. O editor gera versões procedurais por shader e permite importar overlays licenciados pelo usuário.
- 36 verificações no harness de integração passaram, cobrindo regressões do núcleo, parsing/interpolação de LUT, amostras das quatro LUTs, shaders, blend modes, speed ramps, áudio extraído e legendas remapeadas. Mais 19 verificações finais passaram para a integral das curvas de áudio, schema, cache PWA e imports. Sintaxe dos módulos core, effects, renderer, studio e testes verificada.
- O gate adaptativo de limpeza de voz agora agenda a automação usando o mesmo mapa variável de tempo, evitando deslocar a redução de ruído durante os presets de velocidade.
- Ainda pendente: execução visual do WebGL em Safari/iOS real, gestos de toque e exportação/codificação de vídeos reais. Não declarar homologação física ou sincronização labial universal até esses testes.
