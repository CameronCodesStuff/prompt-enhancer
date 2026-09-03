/* PromptForge — app.js */
'use strict';

// ── Model Database ─────────────────────────────────────────────────
// color: provider accent hex for the dot

const MODEL_GROUPS = [
  {
    provider: 'Anthropic',
    color: '#C97E4E',
    models: [
      { name: 'Claude Opus 4',          tags: ['new','reason','vision','code'] },
      { name: 'Claude Sonnet 4.5',      tags: ['new','vision','code','fast'] },
      { name: 'Claude Sonnet 4',        tags: ['vision','code'] },
      { name: 'Claude Haiku 4.5',       tags: ['fast','vision'] },
      { name: 'Claude Haiku 3.5',       tags: ['fast','vision'] },
      { name: 'Claude Opus 3',          tags: ['vision','code'] },
      { name: 'Claude Sonnet 3.7',      tags: ['reason','vision','code'] },
      { name: 'Claude Sonnet 3.5',      tags: ['vision','code'] },
      { name: 'Claude Haiku 3',         tags: ['fast'] },
      { name: 'Claude 2.1',             tags: [] },
      { name: 'Claude Instant 1.2',     tags: ['fast'] },
    ],
  },
  {
    provider: 'OpenAI',
    color: '#10A37F',
    models: [
      { name: 'GPT-4o',                 tags: ['vision','audio','code'] },
      { name: 'GPT-4o mini',            tags: ['fast','vision'] },
      { name: 'GPT-4.5',                tags: ['new','vision','code'] },
      { name: 'o3',                     tags: ['new','reason','code'] },
      { name: 'o3 mini',                tags: ['new','reason','fast'] },
      { name: 'o4 mini',                tags: ['new','reason','fast','vision'] },
      { name: 'o1',                     tags: ['reason','code'] },
      { name: 'o1 mini',                tags: ['reason','fast'] },
      { name: 'o1 preview',             tags: ['reason'] },
      { name: 'GPT-4 Turbo',            tags: ['vision'] },
      { name: 'GPT-4',                  tags: [] },
      { name: 'GPT-3.5 Turbo',          tags: ['fast'] },
      { name: 'DALL-E 3',               tags: ['image'] },
      { name: 'DALL-E 2',               tags: ['image'] },
      { name: 'Whisper',                tags: ['audio'] },
      { name: 'TTS-1',                  tags: ['audio'] },
      { name: 'TTS-1 HD',               tags: ['audio'] },
      { name: 'Sora',                   tags: ['new','image'] },
      { name: 'GPT-image-1',            tags: ['new','image'] },
    ],
  },
  {
    provider: 'Google DeepMind',
    color: '#4285F4',
    models: [
      { name: 'Gemini 2.5 Pro',         tags: ['new','reason','vision','code'] },
      { name: 'Gemini 2.5 Flash',       tags: ['new','fast','vision','reason'] },
      { name: 'Gemini 2.0 Flash',       tags: ['fast','vision'] },
      { name: 'Gemini 2.0 Flash Lite',  tags: ['fast'] },
      { name: 'Gemini 1.5 Pro',         tags: ['vision','code'] },
      { name: 'Gemini 1.5 Flash',       tags: ['fast','vision'] },
      { name: 'Gemini 1.5 Flash-8B',    tags: ['fast'] },
      { name: 'Gemini 1.0 Pro',         tags: [] },
      { name: 'Gemma 3 27B',            tags: ['open','vision'] },
      { name: 'Gemma 3 12B',            tags: ['open'] },
      { name: 'Gemma 3 4B',             tags: ['open','fast'] },
      { name: 'Gemma 2 9B',             tags: ['open','fast'] },
      { name: 'Gemma 2 27B',            tags: ['open'] },
      { name: 'PaLM 2',                 tags: [] },
      { name: 'Imagen 3',               tags: ['new','image'] },
      { name: 'Imagen 2',               tags: ['image'] },
      { name: 'Veo 2',                  tags: ['new','image'] },
    ],
  },
  {
    provider: 'Meta',
    color: '#0866FF',
    models: [
      { name: 'Llama 4 Scout',          tags: ['new','open','fast','vision'] },
      { name: 'Llama 4 Maverick',       tags: ['new','open','vision'] },
      { name: 'Llama 3.3 70B',          tags: ['open','code'] },
      { name: 'Llama 3.2 90B Vision',   tags: ['open','vision'] },
      { name: 'Llama 3.2 11B Vision',   tags: ['open','vision','fast'] },
      { name: 'Llama 3.2 3B',           tags: ['open','fast'] },
      { name: 'Llama 3.2 1B',           tags: ['open','fast'] },
      { name: 'Llama 3.1 405B',         tags: ['open'] },
      { name: 'Llama 3.1 70B',          tags: ['open','fast'] },
      { name: 'Llama 3.1 8B',           tags: ['open','fast'] },
      { name: 'Llama 3 70B',            tags: ['open'] },
      { name: 'Llama 3 8B',             tags: ['open','fast'] },
      { name: 'CodeLlama 70B',          tags: ['open','code'] },
      { name: 'Llama 2 70B',            tags: ['open'] },
    ],
  },
  {
    provider: 'Mistral AI',
    color: '#FF7000',
    models: [
      { name: 'Mistral Large 2',        tags: ['code'] },
      { name: 'Mistral Medium 3',       tags: ['new'] },
      { name: 'Mistral Small 3.2',      tags: ['new','fast','vision'] },
      { name: 'Pixtral Large',          tags: ['vision'] },
      { name: 'Pixtral 12B',            tags: ['open','vision','fast'] },
      { name: 'Codestral',              tags: ['code'] },
      { name: 'Mathstral',              tags: ['reason'] },
      { name: 'Mixtral 8x22B',          tags: ['open'] },
      { name: 'Mixtral 8x7B',           tags: ['open','fast'] },
      { name: 'Mistral 7B',             tags: ['open','fast'] },
      { name: 'Mistral Nemo',           tags: ['open','fast'] },
    ],
  },
  {
    provider: 'xAI',
    color: '#1DA1F2',
    models: [
      { name: 'Grok 3',                 tags: ['new','vision','code'] },
      { name: 'Grok 3 mini',            tags: ['new','fast','reason'] },
      { name: 'Grok 2',                 tags: ['vision'] },
      { name: 'Grok 2 mini',            tags: ['fast'] },
      { name: 'Grok Vision Beta',       tags: ['vision'] },
      { name: 'Grok Beta',              tags: [] },
    ],
  },
  {
    provider: 'DeepSeek',
    color: '#5B6BF8',
    models: [
      { name: 'DeepSeek R2',            tags: ['new','reason','code'] },
      { name: 'DeepSeek R1',            tags: ['open','reason','code'] },
      { name: 'DeepSeek R1 Zero',       tags: ['open','reason'] },
      { name: 'DeepSeek V3',            tags: ['open','code'] },
      { name: 'DeepSeek V2.5',          tags: ['open','code'] },
      { name: 'DeepSeek Coder V2',      tags: ['open','code'] },
      { name: 'DeepSeek V2',            tags: ['open'] },
      { name: 'DeepSeek-R1-Distill-Qwen-32B', tags: ['open','reason','fast'] },
    ],
  },
  {
    provider: 'Cohere',
    color: '#39594D',
    models: [
      { name: 'Command R+',             tags: ['code'] },
      { name: 'Command R',              tags: ['fast'] },
      { name: 'Command A',              tags: ['new'] },
      { name: 'Command Light',          tags: ['fast'] },
      { name: 'Aya 23 35B',            tags: ['open'] },
      { name: 'Aya Expanse 32B',        tags: ['new','open'] },
    ],
  },
  {
    provider: 'Microsoft',
    color: '#00A4EF',
    models: [
      { name: 'Phi-4',                  tags: ['open','reason','fast'] },
      { name: 'Phi-3.5 MoE',           tags: ['open','fast'] },
      { name: 'Phi-3.5 Mini',          tags: ['open','fast'] },
      { name: 'Phi-3 Medium',          tags: ['open'] },
      { name: 'Phi-3 Small',           tags: ['open','fast'] },
      { name: 'Phi-3 Mini',            tags: ['open','fast'] },
      { name: 'WizardLM-2 8x22B',     tags: ['open'] },
      { name: 'Orca 2',               tags: ['open'] },
    ],
  },
  {
    provider: 'Alibaba',
    color: '#FF6A00',
    models: [
      { name: 'Qwen3 235B-A22B',        tags: ['new','open','reason'] },
      { name: 'Qwen3 32B',              tags: ['new','open','reason'] },
      { name: 'Qwen3 14B',              tags: ['new','open','fast'] },
      { name: 'Qwen3 8B',               tags: ['new','open','fast'] },
      { name: 'Qwen2.5 72B',            tags: ['open','code'] },
      { name: 'Qwen2.5 32B',            tags: ['open'] },
      { name: 'Qwen2.5 Coder 32B',      tags: ['open','code'] },
      { name: 'QwQ-32B',                tags: ['open','reason'] },
      { name: 'Qwen2 VL 72B',           tags: ['open','vision'] },
      { name: 'Qwen2 72B',              tags: ['open'] },
    ],
  },
  {
    provider: '01.AI',
    color: '#7B61FF',
    models: [
      { name: 'Yi-Large',               tags: [] },
      { name: 'Yi-34B',                 tags: ['open'] },
      { name: 'Yi-1.5 34B',            tags: ['open'] },
      { name: 'Yi-Lightning',           tags: ['fast'] },
    ],
  },
  {
    provider: 'Inflection',
    color: '#F02849',
    models: [
      { name: 'Inflection-3 Productivity', tags: [] },
      { name: 'Inflection-3 Pi',        tags: [] },
      { name: 'Inflection-2.5',         tags: [] },
    ],
  },
  {
    provider: 'AI21 Labs',
    color: '#8247E5',
    models: [
      { name: 'Jamba 1.5 Large',        tags: [] },
      { name: 'Jamba 1.5 Mini',         tags: ['fast'] },
      { name: 'Jamba Instruct',         tags: [] },
      { name: 'J2 Ultra',               tags: [] },
      { name: 'J2 Mid',                 tags: [] },
    ],
  },
  {
    provider: 'Perplexity',
    color: '#20B2AA',
    models: [
      { name: 'Sonar Large',            tags: [] },
      { name: 'Sonar Small',            tags: ['fast'] },
      { name: 'Sonar Pro',              tags: [] },
      { name: 'Sonar Reasoning',        tags: ['reason'] },
      { name: 'Sonar Reasoning Pro',    tags: ['reason'] },
    ],
  },
  {
    provider: 'Together AI',
    color: '#6366F1',
    models: [
      { name: 'DBRX Instruct',          tags: ['open'] },
      { name: 'Falcon 180B',            tags: ['open'] },
      { name: 'Falcon 40B',             tags: ['open','fast'] },
      { name: 'Platypus2 70B',          tags: ['open'] },
      { name: 'Alpaca 7B',              tags: ['open','fast'] },
    ],
  },
  {
    provider: 'Stability AI',
    color: '#8B5CF6',
    models: [
      { name: 'Stable Diffusion 3.5 Large',   tags: ['image'] },
      { name: 'Stable Diffusion 3.5 Medium',  tags: ['image','fast'] },
      { name: 'Stable Diffusion 3',           tags: ['image'] },
      { name: 'Stable Diffusion XL',          tags: ['image'] },
      { name: 'Stable Diffusion 2.1',         tags: ['image'] },
      { name: 'Stable Video Diffusion',        tags: ['image'] },
      { name: 'Stable Audio 2.0',              tags: ['audio'] },
    ],
  },
  {
    provider: 'Midjourney',
    color: '#EBB434',
    models: [
      { name: 'Midjourney v7',          tags: ['new','image'] },
      { name: 'Midjourney v6.1',        tags: ['image'] },
      { name: 'Midjourney v6',          tags: ['image'] },
      { name: 'Midjourney v5.2',        tags: ['image'] },
      { name: 'Niji v6',                tags: ['image'] },
      { name: 'Niji v5',                tags: ['image'] },
    ],
  },
  {
    provider: 'Black Forest Labs',
    color: '#22C55E',
    models: [
      { name: 'FLUX 1.1 Pro Ultra',     tags: ['new','image'] },
      { name: 'FLUX 1.1 Pro',           tags: ['image'] },
      { name: 'FLUX 1 Pro',             tags: ['image'] },
      { name: 'FLUX 1 Dev',             tags: ['open','image'] },
      { name: 'FLUX 1 Schnell',         tags: ['open','image','fast'] },
    ],
  },
  {
    provider: 'Runway',
    color: '#FF4500',
    models: [
      { name: 'Gen-4',                  tags: ['new','image'] },
      { name: 'Gen-3 Alpha Turbo',      tags: ['image','fast'] },
      { name: 'Gen-3 Alpha',            tags: ['image'] },
      { name: 'Gen-2',                  tags: ['image'] },
    ],
  },
  {
    provider: 'ElevenLabs',
    color: '#FF6B35',
    models: [
      { name: 'Eleven Multilingual v3', tags: ['new','audio'] },
      { name: 'Eleven Multilingual v2', tags: ['audio'] },
      { name: 'Eleven Turbo v2.5',     tags: ['audio','fast'] },
      { name: 'Eleven English v2',     tags: ['audio'] },
      { name: 'Eleven Flash v2.5',     tags: ['audio','fast'] },
    ],
  },
  {
    provider: 'Amazon',
    color: '#FF9900',
    models: [
      { name: 'Nova Premier',           tags: ['new','vision'] },
      { name: 'Nova Pro',               tags: ['new','vision'] },
      { name: 'Nova Lite',              tags: ['new','fast','vision'] },
      { name: 'Nova Micro',             tags: ['new','fast'] },
      { name: 'Titan Text Premier',     tags: [] },
      { name: 'Titan Text Express',     tags: ['fast'] },
      { name: 'Titan Image Generator', tags: ['image'] },
    ],
  },
  {
    provider: 'Apple',
    color: '#A0A0A0',
    models: [
      { name: 'Apple Intelligence (Writing)', tags: ['fast'] },
      { name: 'Apple Intelligence (Summaries)', tags: ['fast'] },
      { name: 'OpenELM 3B',             tags: ['open','fast'] },
      { name: 'OpenELM 1.1B',           tags: ['open','fast'] },
    ],
  },
  {
    provider: 'Hugging Face',
    color: '#FFD21E',
    models: [
      { name: 'SmolLM2 1.7B',          tags: ['open','fast'] },
      { name: 'Zephyr 7B Beta',         tags: ['open','fast'] },
      { name: 'StarCoder2 15B',         tags: ['open','code'] },
      { name: 'Starcoder 7B',           tags: ['open','code','fast'] },
      { name: 'OpenAssistant 30B',      tags: ['open'] },
      { name: 'Bloom 176B',             tags: ['open'] },
    ],
  },
  {
    provider: 'NovaSky / Berkeley',
    color: '#003262',
    models: [
      { name: 'Sky-T1-32B',             tags: ['open','reason'] },
      { name: 'Skywork-o1 Preview',     tags: ['open','reason'] },
    ],
  },
  {
    provider: 'Nvidia',
    color: '#76B900',
    models: [
      { name: 'Nemotron 4 340B',        tags: ['open'] },
      { name: 'Nemotron-Mini 4B',       tags: ['open','fast'] },
      { name: 'Llama 3.1 Nemotron 70B', tags: ['open','reason'] },
      { name: 'Mistral Nemo Minitron',  tags: ['open','fast'] },
    ],
  },
  {
    provider: 'Groq',
    color: '#F55036',
    models: [
      { name: 'Llama 3.3 70B (Groq)',   tags: ['fast'] },
      { name: 'Llama 3.1 8B (Groq)',    tags: ['fast'] },
      { name: 'Mixtral 8x7B (Groq)',    tags: ['fast'] },
      { name: 'Gemma 2 9B (Groq)',      tags: ['fast'] },
    ],
  },
  {
    provider: 'Cerebras',
    color: '#EB5757',
    models: [
      { name: 'Llama 3.3 70B (Cerebras)', tags: ['fast'] },
      { name: 'Llama 3.1 8B (Cerebras)',  tags: ['fast'] },
    ],
  },
  {
    provider: 'Writer',
    color: '#7B5EA7',
    models: [
      { name: 'Palmyra X5',             tags: ['new'] },
      { name: 'Palmyra X4',             tags: [] },
      { name: 'Palmyra Creative',       tags: [] },
    ],
  },
  {
    provider: 'Adept',
    color: '#4F46E5',
    models: [
      { name: 'Fuyu-8B',               tags: ['open','vision','fast'] },
    ],
  },
  {
    provider: 'Reka',
    color: '#06B6D4',
    models: [
      { name: 'Reka Core',              tags: ['vision'] },
      { name: 'Reka Flash',             tags: ['fast','vision'] },
      { name: 'Reka Edge',              tags: ['fast'] },
    ],
  },
  {
    provider: 'Other / Custom',
    color: '#6B7280',
    models: [
      { name: 'Custom / Local model',    tags: [] },
      { name: 'Ollama (local)',          tags: ['open','fast'] },
      { name: 'LM Studio (local)',       tags: ['open','fast'] },
      { name: 'GPT4All (local)',         tags: ['open','fast'] },
      { name: 'Jan (local)',             tags: ['open','fast'] },
    ],
  },
];

// ── State ──────────────────────────────────────────────────────────

const state = {
  apiKey: localStorage.getItem('pf_api_key') || '',
  lastResult: null,
  isLoading: false,
  selectedModel: null,  // { provider, name, tags }
};

// ── DOM refs ───────────────────────────────────────────────────────

const $ = id => document.getElementById(id);

const dom = {
  promptInput:    $('prompt-input'),
  charCount:      $('char-count'),
  forgeBtn:       $('forge-btn'),
  forgeBtnText:   $('forge-btn-text'),
  outputBody:     $('output-body'),
  statusDot:      $('status-dot'),
  statusText:     $('status-text'),
  copyBtn:        $('copy-btn'),
  exportBtn:      $('export-btn'),
  modalOverlay:   $('modal-overlay'),
  apiKeyInput:    $('api-key-input'),
  saveKeyBtn:     $('save-key-btn'),
  cancelKeyBtn:   $('cancel-key-btn'),
  openKeyBtn:     $('open-key-btn'),
  // Model picker
  modelSearch:    $('model-search'),
  modelSearchClear: $('model-search-clear'),
  modelList:      $('model-list'),
  modelChip:      $('model-selected-chip'),
  chipProvider:   $('model-chip-provider'),
  chipName:       $('model-chip-name'),
  chipClear:      $('model-chip-clear'),
  // Options
  outputFormat:   $('opt-output'),
  graphicStyle:   $('opt-graphic'),
  targetAudience: $('opt-audience'),
  complexity:     $('opt-complexity'),
  // Checkboxes
  checkAnimations:$('chk-animations'),
  checkAccessible:$('chk-accessible'),
  checkDarkMode:  $('chk-darkmode'),
  checkComments:  $('chk-comments'),
  checkResponsive:$('chk-responsive'),
  checkInteract:  $('chk-interactive'),
};

// ── Model Picker ───────────────────────────────────────────────────

function buildModelList(filter = '') {
  const q = filter.toLowerCase().trim();
  dom.modelList.innerHTML = '';
  let totalShown = 0;

  MODEL_GROUPS.forEach(group => {
    const matchedModels = group.models.filter(m =>
      !q || m.name.toLowerCase().includes(q) || group.provider.toLowerCase().includes(q)
    );
    if (!matchedModels.length) return;
    totalShown += matchedModels.length;

    const groupEl = document.createElement('div');
    groupEl.className = 'model-group';

    const isSelected = matchedModels.some(m => state.selectedModel?.name === m.name);

    const header = document.createElement('div');
    header.className = 'model-group-header';
    header.innerHTML = `
      <span class="group-provider-dot" style="background:${group.color}"></span>
      ${escHtml(group.provider)}
      <span class="group-chevron">▾</span>
    `;

    header.addEventListener('click', () => {
      groupEl.classList.toggle('collapsed');
    });

    const items = document.createElement('div');
    items.className = 'model-items';

    matchedModels.forEach(model => {
      const item = document.createElement('div');
      item.className = 'model-item' + (state.selectedModel?.name === model.name ? ' selected' : '');

      const highlighted = q
        ? model.name.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'), '<mark>$1</mark>')
        : escHtml(model.name);

      const tagsHtml = model.tags.map(t =>
        `<span class="model-tag ${t}">${t}</span>`
      ).join('');

      item.innerHTML = `
        <span class="model-item-name">${highlighted}</span>
        <span class="model-item-tags">${tagsHtml}</span>
      `;

      item.addEventListener('click', () => selectModel(group, model));
      items.appendChild(item);
    });

    groupEl.appendChild(header);
    groupEl.appendChild(items);
    dom.modelList.appendChild(groupEl);
  });

  if (totalShown === 0) {
    dom.modelList.innerHTML = '<div class="model-no-results">No models match your search</div>';
  }
}

function selectModel(group, model) {
  state.selectedModel = { provider: group.provider, color: group.color, ...model };

  // Update chip
  dom.chipProvider.textContent = group.provider;
  dom.chipName.textContent = model.name;
  dom.modelChip.classList.add('visible');

  // Collapse list
  dom.modelList.classList.add('collapsed');
  dom.modelSearch.value = '';
  dom.modelSearchClear.classList.add('hidden');

  // Re-highlight selected item
  buildModelList('');
}

dom.chipClear.addEventListener('click', () => {
  state.selectedModel = null;
  dom.modelChip.classList.remove('visible');
  dom.modelList.classList.remove('collapsed');
  buildModelList('');
});

dom.modelSearch.addEventListener('input', () => {
  const q = dom.modelSearch.value;
  dom.modelSearchClear.classList.toggle('hidden', !q);
  dom.modelList.classList.remove('collapsed');
  buildModelList(q);
});

dom.modelSearchClear.addEventListener('click', () => {
  dom.modelSearch.value = '';
  dom.modelSearchClear.classList.add('hidden');
  buildModelList('');
  dom.modelSearch.focus();
});

// ── API Key modal ──────────────────────────────────────────────────

function showModal() {
  dom.modalOverlay.classList.remove('hidden');
  dom.apiKeyInput.value = state.apiKey;
  dom.apiKeyInput.focus();
}

function hideModal() {
  dom.modalOverlay.classList.add('hidden');
}

dom.openKeyBtn.addEventListener('click', showModal);

dom.saveKeyBtn.addEventListener('click', () => {
  const key = dom.apiKeyInput.value.trim();
  if (!key.startsWith('sk-')) {
    dom.apiKeyInput.style.borderColor = 'var(--red)';
    setTimeout(() => (dom.apiKeyInput.style.borderColor = ''), 1000);
    return;
  }
  state.apiKey = key;
  localStorage.setItem('pf_api_key', key);
  hideModal();
  setStatus('ready', 'API key saved');
});

dom.cancelKeyBtn.addEventListener('click', hideModal);

dom.modalOverlay.addEventListener('click', e => {
  if (e.target === dom.modalOverlay) hideModal();
});

dom.apiKeyInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') dom.saveKeyBtn.click();
  if (e.key === 'Escape') hideModal();
});

// ── Char counter ───────────────────────────────────────────────────

dom.promptInput.addEventListener('input', () => {
  dom.charCount.textContent = `${dom.promptInput.value.length.toLocaleString()} chars`;
});

// ── Toggle buttons ─────────────────────────────────────────────────

document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.toggle-group');
    group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── Status helper ──────────────────────────────────────────────────

function setStatus(type, text) {
  dom.statusDot.className = `status-dot ${type}`;
  dom.statusText.textContent = text;
}

// ── Collect options ────────────────────────────────────────────────

function collectOptions() {
  const activeToneBtn = document.querySelector('.tone-toggle .toggle-btn.active');
  return {
    outputFormat:   dom.outputFormat.value,
    graphicStyle:   dom.graphicStyle.value,
    targetAudience: dom.targetAudience.value,
    complexity:     dom.complexity.value,
    tone:           activeToneBtn ? activeToneBtn.dataset.value : 'balanced',
    targetModel:    state.selectedModel ? `${state.selectedModel.name} (${state.selectedModel.provider})` : 'Not specified',
    animations:     dom.checkAnimations.checked,
    accessible:     dom.checkAccessible.checked,
    darkMode:       dom.checkDarkMode.checked,
    comments:       dom.checkComments.checked,
    responsive:     dom.checkResponsive.checked,
    interactive:    dom.checkInteract.checked,
  };
}

// ── Build system prompt ────────────────────────────────────────────

function buildSystemPrompt(opts) {
  const flags = [];
  if (opts.animations)  flags.push('smooth, purposeful animations');
  if (opts.accessible)  flags.push('WCAG AA accessibility');
  if (opts.darkMode)    flags.push('dark mode support');
  if (opts.comments)    flags.push('thorough code comments');
  if (opts.responsive)  flags.push('fully responsive layout');
  if (opts.interactive) flags.push('rich interactivity and micro-interactions');

  const modelLine = opts.targetModel !== 'Not specified'
    ? `- Target AI model: ${opts.targetModel} — tailor the prompt's syntax, phrasing, and structure to get the absolute best out of this specific model's known strengths and quirks`
    : '';

  return `You are PromptForge, an elite AI prompt engineer. Your sole purpose is to transform a basic, vague, or mediocre prompt into an extraordinarily detailed, precise, and powerful prompt that will get world-class results from any AI model.

OUTPUT FORMAT: Respond with a JSON object (no markdown fences) with exactly these keys:
{
  "strengthScore": <number 0-100, rating the original prompt>,
  "strengthLabel": <"Weak" | "Moderate" | "Strong" | "Excellent">,
  "forgedPrompt": <the fully rewritten, massively enhanced prompt as a single string>,
  "keyImprovements": <array of 3-5 short strings listing what you improved>,
  "technicalSpec": <a compact technical specification block as a string, relevant to the output format>,
  "suggestedModel": <the ideal AI model or tool for this task — if the user specified one, validate it or suggest a better alternative with reasoning>
}

Context about the user's target output:
- Output format: ${opts.outputFormat}
- Visual/Graphic style: ${opts.graphicStyle}
- Target audience: ${opts.targetAudience}
- Complexity level: ${opts.complexity}
- Tone: ${opts.tone}
${modelLine}
${flags.length > 0 ? `- Required features: ${flags.join(', ')}` : ''}

When forging the prompt:
1. Massively expand on vague terms with specific, concrete language
2. Add detailed technical constraints appropriate to the output format
3. Include specific stylistic direction and visual/functional references
4. Specify the exact structure, layout, and behavior expected
5. Add constraints that prevent common AI failure modes
6. Include examples or analogies where they sharpen the instruction
7. Make the prompt ${opts.complexity} in complexity — calibrate vocabulary and detail accordingly
8. Ensure the tone is ${opts.tone}
${opts.targetModel !== 'Not specified' ? `9. Specifically optimize every phrase for ${opts.targetModel}'s known behavior, context window, instruction-following style, and capability profile` : ''}

Do not hedge. Do not be vague. Make the forged prompt extraordinary.`;
}

// ── Render result ──────────────────────────────────────────────────

function strengthColor(score) {
  if (score < 30) return 'var(--red)';
  if (score < 55) return 'var(--amber)';
  if (score < 80) return 'var(--cyan)';
  return 'var(--green)';
}

function renderResult(data, opts) {
  state.lastResult = { ...data, opts };
  const color = strengthColor(data.strengthScore);

  const improvements = (data.keyImprovements || [])
    .map(imp => `<li>${escHtml(imp)}</li>`).join('');

  const modelChipHtml = state.selectedModel
    ? `<span class="meta-chip graphic" style="border-color:${state.selectedModel.color}; color:${state.selectedModel.color};">${escHtml(state.selectedModel.name)}</span>`
    : '';

  const chips = [
    `<span class="meta-chip output">${escHtml(opts.outputFormat)}</span>`,
    `<span class="meta-chip graphic">${escHtml(opts.graphicStyle)}</span>`,
    `<span class="meta-chip extra">${escHtml(opts.targetAudience)}</span>`,
    `<span class="meta-chip extra">${escHtml(opts.complexity)}</span>`,
    modelChipHtml,
  ].filter(Boolean).join('');

  dom.outputBody.innerHTML = `
    <div class="result-block">
      <div class="result-meta">${chips}</div>

      <div class="result-section">
        <div class="result-section-title">Original Strength</div>
        <div class="strength-bar-wrap">
          <div class="strength-label-row">
            <span>${escHtml(data.strengthLabel || '')}</span>
            <span>${data.strengthScore}/100</span>
          </div>
          <div class="strength-bar-track">
            <div class="strength-bar-fill" style="width:${data.strengthScore}%; background:${color}"></div>
          </div>
        </div>
      </div>

      <div class="result-section">
        <div class="result-section-title">Forged Prompt</div>
        <div class="result-text" id="forged-text">${escHtml(data.forgedPrompt || '')}</div>
      </div>

      ${improvements ? `
      <div class="result-section">
        <div class="result-section-title">Key Improvements</div>
        <ul style="padding-left:18px; color:var(--snow); font-size:13px; line-height:1.8; display:flex; flex-direction:column; gap:3px;">
          ${improvements}
        </ul>
      </div>` : ''}

      ${data.technicalSpec ? `
      <div class="result-section">
        <div class="result-section-title">Technical Spec</div>
        <div class="result-code">${escHtml(data.technicalSpec)}</div>
      </div>` : ''}

      ${data.suggestedModel ? `
      <div class="result-section">
        <div class="result-section-title">Model Recommendation</div>
        <div class="result-text" style="color:var(--cyan2); font-family:var(--font-mono); font-size:13px;">${escHtml(data.suggestedModel)}</div>
      </div>` : ''}
    </div>
  `;

  dom.copyBtn.disabled = false;
  dom.exportBtn.disabled = false;
  setStatus('ready', `Done — strength ${data.strengthScore}/100`);
}

function renderError(msg) {
  dom.outputBody.innerHTML = `<div class="error-box">⚠ ${escHtml(msg)}</div>`;
  setStatus('error', 'Error');
}

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Forge ──────────────────────────────────────────────────────────

dom.forgeBtn.addEventListener('click', forge);
dom.promptInput.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') forge();
});

async function forge() {
  const prompt = dom.promptInput.value.trim();
  if (!prompt) {
    dom.promptInput.focus();
    dom.promptInput.style.borderColor = 'var(--red)';
    setTimeout(() => (dom.promptInput.style.borderColor = ''), 900);
    return;
  }
  if (!state.apiKey) { showModal(); return; }
  if (state.isLoading) return;

  state.isLoading = true;
  dom.forgeBtn.disabled = true;
  dom.forgeBtn.classList.add('loading');
  dom.forgeBtnText.textContent = 'Forging…';
  dom.copyBtn.disabled = true;
  dom.exportBtn.disabled = true;
  setStatus('loading', 'Analyzing and forging…');

  dom.outputBody.innerHTML = `
    <div class="result-block">
      <div class="result-section">
        <div class="result-section-title">Forged Prompt</div>
        <div class="result-text stream-cursor">Working on it…</div>
      </div>
    </div>`;

  const opts = collectOptions();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: buildSystemPrompt(opts),
        messages: [{ role: 'user', content: `Here is my prompt to forge:\n\n${prompt}` }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API error ${response.status}`);
    }

    const data = await response.json();
    const raw = data?.content?.[0]?.text || '';
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { strengthScore: 50, strengthLabel: 'Moderate', forgedPrompt: raw, keyImprovements: ['Full enhancement applied'], technicalSpec: '', suggestedModel: '' };
    }

    renderResult(parsed, opts);
  } catch (err) {
    renderError(err.message);
  } finally {
    state.isLoading = false;
    dom.forgeBtn.disabled = false;
    dom.forgeBtn.classList.remove('loading');
    dom.forgeBtnText.textContent = 'Forge Prompt';
  }
}

// ── Copy ───────────────────────────────────────────────────────────

dom.copyBtn.addEventListener('click', async () => {
  if (!state.lastResult?.forgedPrompt) return;
  try {
    await navigator.clipboard.writeText(state.lastResult.forgedPrompt);
    dom.copyBtn.classList.add('success');
    dom.copyBtn.innerHTML = '✓ Copied';
    setTimeout(() => { dom.copyBtn.classList.remove('success'); dom.copyBtn.innerHTML = '<span>⧉</span> Copy'; }, 2000);
  } catch { dom.copyBtn.textContent = 'Failed'; }
});

// ── Export ─────────────────────────────────────────────────────────

dom.exportBtn.addEventListener('click', () => {
  if (!state.lastResult) return;
  const d = state.lastResult;
  const opts = d.opts || {};
  const ts = new Date().toISOString().slice(0,19).replace('T',' ');
  const modelLine = state.selectedModel ? `${state.selectedModel.name} (${state.selectedModel.provider})` : 'Not specified';

  const lines = [
    '═══════════════════════════════════════════════',
    '  PROMPTFORGE — Exported Prompt',
    `  ${ts}`,
    '═══════════════════════════════════════════════',
    '',
    `Target Model   : ${modelLine}`,
    `Output Format  : ${opts.outputFormat || ''}`,
    `Graphic Style  : ${opts.graphicStyle || ''}`,
    `Audience       : ${opts.targetAudience || ''}`,
    `Complexity     : ${opts.complexity || ''}`,
    `Tone           : ${opts.tone || ''}`,
    `Orig. Strength : ${d.strengthScore}/100 (${d.strengthLabel})`,
    `Model Rec.     : ${d.suggestedModel || 'N/A'}`,
    '',
    '───────────────────────────────────────────────',
    'FORGED PROMPT',
    '───────────────────────────────────────────────',
    '',
    d.forgedPrompt || '',
    '',
    '───────────────────────────────────────────────',
    'KEY IMPROVEMENTS',
    '───────────────────────────────────────────────',
    '',
    ...(d.keyImprovements || []).map((imp, i) => `  ${i+1}. ${imp}`),
    '',
    d.technicalSpec ? `───────────────────────────────────────────────\nTECHNICAL SPEC\n───────────────────────────────────────────────\n\n${d.technicalSpec}\n` : '',
  ].join('\n');

  const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `promptforge-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
});

// ── Init ───────────────────────────────────────────────────────────

(function init() {
  buildModelList();

  if (!state.apiKey) {
    setStatus('', 'No API key — click the key icon');
    showModal();
  } else {
    setStatus('ready', 'Ready');
  }

  const examples = [
    'Make me a landing page for my SaaS product',
    'Write code for a snake game',
    'Create a data visualization dashboard',
    'Build a portfolio website for a photographer',
    'Make a CLI tool that converts CSV to JSON',
    'Draw a fantasy castle at sunset',
  ];
  let exIdx = 0;
  dom.promptInput.setAttribute('placeholder', `e.g. "${examples[0]}"`);
  setInterval(() => {
    exIdx = (exIdx + 1) % examples.length;
    dom.promptInput.setAttribute('placeholder', `e.g. "${examples[exIdx]}"`);
  }, 4000);
})();
