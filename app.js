/* PromptForge — app.js (black & purple edition) */
'use strict';

// ── Model Database ─────────────────────────────────────────────────
// provider: label shown in UI
// apiProvider: which API family this model uses (determines which key is needed)
// keyPlaceholder: hint text for the API key input

const MODEL_GROUPS = [
  {
    provider: 'Anthropic',
    color: '#C97E4E',
    apiProvider: 'anthropic',
    keyLabel: 'Anthropic API Key',
    keyPlaceholder: 'sk-ant-…',
    keyUrl: 'https://console.anthropic.com',
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
    apiProvider: 'openai',
    keyLabel: 'OpenAI API Key',
    keyPlaceholder: 'sk-…',
    keyUrl: 'https://platform.openai.com/api-keys',
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
    apiProvider: 'google',
    keyLabel: 'Google AI API Key',
    keyPlaceholder: 'AIza…',
    keyUrl: 'https://aistudio.google.com/app/apikey',
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
    apiProvider: 'meta',
    keyLabel: 'Meta / Llama API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://llama.meta.com',
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
    apiProvider: 'mistral',
    keyLabel: 'Mistral API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://console.mistral.ai/api-keys',
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
    apiProvider: 'xai',
    keyLabel: 'xAI API Key',
    keyPlaceholder: 'xai-…',
    keyUrl: 'https://console.x.ai',
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
    apiProvider: 'deepseek',
    keyLabel: 'DeepSeek API Key',
    keyPlaceholder: 'sk-…',
    keyUrl: 'https://platform.deepseek.com',
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
    apiProvider: 'cohere',
    keyLabel: 'Cohere API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://dashboard.cohere.com/api-keys',
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
    apiProvider: 'azure',
    keyLabel: 'Azure / Microsoft API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://azure.microsoft.com/en-us/products/ai-services',
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
    apiProvider: 'alibaba',
    keyLabel: 'Alibaba / Qwen API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://dashscope.aliyun.com',
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
    provider: 'Stability AI',
    color: '#8B5CF6',
    apiProvider: 'stability',
    keyLabel: 'Stability AI API Key',
    keyPlaceholder: 'sk-…',
    keyUrl: 'https://platform.stability.ai/account/keys',
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
    apiProvider: 'midjourney',
    keyLabel: 'Midjourney API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://www.midjourney.com',
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
    apiProvider: 'bfl',
    keyLabel: 'Black Forest Labs API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://api.bfl.ml',
    models: [
      { name: 'FLUX 1.1 Pro Ultra',     tags: ['new','image'] },
      { name: 'FLUX 1.1 Pro',           tags: ['image'] },
      { name: 'FLUX 1 Pro',             tags: ['image'] },
      { name: 'FLUX 1 Dev',             tags: ['open','image'] },
      { name: 'FLUX 1 Schnell',         tags: ['open','image','fast'] },
    ],
  },
  {
    provider: 'Perplexity',
    color: '#20B2AA',
    apiProvider: 'perplexity',
    keyLabel: 'Perplexity API Key',
    keyPlaceholder: 'pplx-…',
    keyUrl: 'https://www.perplexity.ai/settings/api',
    models: [
      { name: 'Sonar Large',            tags: [] },
      { name: 'Sonar Small',            tags: ['fast'] },
      { name: 'Sonar Pro',              tags: [] },
      { name: 'Sonar Reasoning',        tags: ['reason'] },
      { name: 'Sonar Reasoning Pro',    tags: ['reason'] },
    ],
  },
  {
    provider: 'ElevenLabs',
    color: '#FF6B35',
    apiProvider: 'elevenlabs',
    keyLabel: 'ElevenLabs API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://elevenlabs.io/app/settings/api-keys',
    models: [
      { name: 'Eleven Multilingual v3', tags: ['new','audio'] },
      { name: 'Eleven Multilingual v2', tags: ['audio'] },
      { name: 'Eleven Turbo v2.5',     tags: ['audio','fast'] },
      { name: 'Eleven English v2',     tags: ['audio'] },
      { name: 'Eleven Flash v2.5',     tags: ['audio','fast'] },
    ],
  },
  {
    provider: 'Runway',
    color: '#FF4500',
    apiProvider: 'runway',
    keyLabel: 'Runway API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://app.runwayml.com',
    models: [
      { name: 'Gen-4',                  tags: ['new','image'] },
      { name: 'Gen-3 Alpha Turbo',      tags: ['image','fast'] },
      { name: 'Gen-3 Alpha',            tags: ['image'] },
      { name: 'Gen-2',                  tags: ['image'] },
    ],
  },
  {
    provider: 'Amazon',
    color: '#FF9900',
    apiProvider: 'aws',
    keyLabel: 'AWS / Bedrock Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://aws.amazon.com/bedrock',
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
    provider: 'Groq',
    color: '#F55036',
    apiProvider: 'groq',
    keyLabel: 'Groq API Key',
    keyPlaceholder: 'gsk_…',
    keyUrl: 'https://console.groq.com/keys',
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
    apiProvider: 'cerebras',
    keyLabel: 'Cerebras API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: 'https://cloud.cerebras.ai',
    models: [
      { name: 'Llama 3.3 70B (Cerebras)', tags: ['fast'] },
      { name: 'Llama 3.1 8B (Cerebras)',  tags: ['fast'] },
    ],
  },
  {
    provider: 'Nvidia',
    color: '#76B900',
    apiProvider: 'nvidia',
    keyLabel: 'NVIDIA API Key',
    keyPlaceholder: 'nvapi-…',
    keyUrl: 'https://build.nvidia.com',
    models: [
      { name: 'Nemotron 4 340B',        tags: ['open'] },
      { name: 'Nemotron-Mini 4B',       tags: ['open','fast'] },
      { name: 'Llama 3.1 Nemotron 70B', tags: ['open','reason'] },
      { name: 'Mistral Nemo Minitron',  tags: ['open','fast'] },
    ],
  },
  {
    provider: 'Other / Custom',
    color: '#6B7280',
    apiProvider: 'custom',
    keyLabel: 'Custom API Key',
    keyPlaceholder: 'Enter key…',
    keyUrl: null,
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

// API keys stored per apiProvider: localStorage key = `pf_key_<apiProvider>`
const state = {
  lastResult: null,
  isLoading: false,
  selectedModel: null,  // { provider, apiProvider, name, tags, color, keyLabel, keyPlaceholder, keyUrl }
};

function getKey(apiProvider) {
  return localStorage.getItem(`pf_key_${apiProvider}`) || '';
}

function saveKey(apiProvider, key) {
  if (key) {
    localStorage.setItem(`pf_key_${apiProvider}`, key);
  } else {
    localStorage.removeItem(`pf_key_${apiProvider}`);
  }
}

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
  openKeyBtn:     $('open-key-btn'),
  apiKeyList:     $('api-key-list'),
  cancelKeyBtn:   $('cancel-key-btn'),
  modelBadge:     $('model-badge'),
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

    const isSelectedGroup = group.models.some(m => state.selectedModel?.name === m.name);
    const isFirstGroup = totalShown === matchedModels.length; // true only for the first group
    // Collapse by default unless: actively searching, or this is the selected group, or it's the first group
    const startCollapsed = !q && !isSelectedGroup && !isFirstGroup;

    const groupEl = document.createElement('div');
    groupEl.className = 'model-group' + (startCollapsed ? ' collapsed' : '');

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
  state.selectedModel = {
    provider: group.provider,
    color: group.color,
    apiProvider: group.apiProvider,
    keyLabel: group.keyLabel,
    keyPlaceholder: group.keyPlaceholder,
    keyUrl: group.keyUrl,
    ...model
  };

  // Update chip
  dom.chipProvider.textContent = group.provider;
  dom.chipName.textContent = model.name;
  dom.modelChip.classList.add('visible');

  // Collapse list
  dom.modelList.classList.add('collapsed');
  dom.modelSearch.value = '';
  dom.modelSearchClear.classList.add('hidden');

  // Update topbar badge
  dom.modelBadge.textContent = model.name.toUpperCase();

  // Show inline API key entry if no key set for this provider
  showInlineApiKeyIfNeeded(group);

  // Re-build to show selected state
  buildModelList('');
}

// Inline API key row shown below the model chip when a model is selected
function showInlineApiKeyIfNeeded(group) {
  // Remove any existing inline key row
  const existing = document.getElementById('inline-api-row');
  if (existing) existing.remove();

  const key = getKey(group.apiProvider);
  const row = document.createElement('div');
  row.id = 'inline-api-row';
  row.className = 'model-api-row';

  const hasKey = !!key;
  const keyUrl = group.keyUrl ? ` · <a href="${group.keyUrl}" target="_blank" rel="noopener" style="color:var(--purple3)">Get key</a>` : '';

  row.innerHTML = `
    <div class="model-api-label">${escHtml(group.keyLabel)}${keyUrl}</div>
    <div class="model-api-input-row">
      <input
        class="model-api-input"
        type="password"
        id="inline-api-input"
        placeholder="${escHtml(group.keyPlaceholder)}"
        autocomplete="off"
        spellcheck="false"
        value="${hasKey ? '••••••••••••' : ''}"
      />
      <button class="model-api-save" id="inline-api-save">Save</button>
    </div>
    <div class="model-api-status ${hasKey ? 'saved' : ''}" id="inline-api-status">
      ${hasKey ? '✓ Key saved' : 'No key set — paste your key above'}
    </div>
  `;

  // Insert after model chip
  dom.modelChip.after(row);

  const input = document.getElementById('inline-api-input');
  const saveBtn = document.getElementById('inline-api-save');
  const status = document.getElementById('inline-api-status');

  // Clear placeholder on focus if showing dots
  input.addEventListener('focus', () => {
    if (getKey(group.apiProvider)) input.value = '';
  });

  saveBtn.addEventListener('click', () => {
    const val = input.value.trim();
    if (!val || val.startsWith('•')) {
      status.className = 'model-api-status error';
      status.textContent = 'Paste your actual key first';
      return;
    }
    saveKey(group.apiProvider, val);
    status.className = 'model-api-status saved';
    status.textContent = '✓ Key saved';
    input.value = '••••••••••••';
    setStatus('ready', 'API key saved — ready to forge');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') saveBtn.click();
  });
}

dom.chipClear.addEventListener('click', () => {
  state.selectedModel = null;
  dom.modelChip.classList.remove('visible');
  dom.modelList.classList.remove('collapsed');
  dom.modelBadge.textContent = 'NO MODEL';
  const existing = document.getElementById('inline-api-row');
  if (existing) existing.remove();
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

// ── API Key modal (manual, shows all providers) ────────────────────

function buildKeyModal() {
  dom.apiKeyList.innerHTML = '';

  // Only show providers that have been used or that have a key set
  const relevantGroups = MODEL_GROUPS.filter(g => getKey(g.apiProvider));

  if (relevantGroups.length === 0) {
    dom.apiKeyList.innerHTML = '<div style="font-family:var(--font-mono);font-size:11px;color:var(--ghost);padding:8px 0;">No keys saved yet. Select a model to add your key.</div>';
    return;
  }

  relevantGroups.forEach(group => {
    const key = getKey(group.apiProvider);
    const item = document.createElement('div');
    item.className = 'api-key-item';

    item.innerHTML = `
      <div class="api-key-item-header">
        <span class="api-key-item-dot" style="background:${group.color}"></span>
        <span class="api-key-item-name">${escHtml(group.provider)}</span>
        <span class="api-key-item-status ${key ? 'set' : ''}">${key ? 'KEY SET' : 'NOT SET'}</span>
      </div>
      <div class="api-key-input-row">
        <input
          class="api-key-input"
          type="password"
          data-provider="${escHtml(group.apiProvider)}"
          placeholder="${escHtml(group.keyPlaceholder)}"
          autocomplete="off"
          value="${key ? '••••••••••••' : ''}"
        />
        <button class="api-key-save-btn" data-provider="${escHtml(group.apiProvider)}">Save</button>
        ${key ? `<button class="api-key-clear-btn" data-provider="${escHtml(group.apiProvider)}">Clear</button>` : ''}
      </div>
    `;

    const input = item.querySelector('.api-key-input');
    const saveBtn = item.querySelector('.api-key-save-btn');
    const clearBtn = item.querySelector('.api-key-clear-btn');

    input.addEventListener('focus', () => {
      if (getKey(group.apiProvider)) input.value = '';
    });

    saveBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val && !val.startsWith('•')) {
        saveKey(group.apiProvider, val);
        buildKeyModal();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        saveKey(group.apiProvider, '');
        buildKeyModal();
      });
    }

    dom.apiKeyList.appendChild(item);
  });
}

dom.openKeyBtn.addEventListener('click', () => {
  buildKeyModal();
  dom.modalOverlay.classList.remove('hidden');
});

dom.cancelKeyBtn.addEventListener('click', () => {
  dom.modalOverlay.classList.add('hidden');
});

dom.modalOverlay.addEventListener('click', e => {
  if (e.target === dom.modalOverlay) dom.modalOverlay.classList.add('hidden');
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
  if (score < 80) return 'var(--purple2)';
  return '#7BE47B';
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
        <div class="result-text" style="color:var(--purple3); font-family:var(--font-mono); font-size:13px;">${escHtml(data.suggestedModel)}</div>
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

  // Check model selected
  if (!state.selectedModel) {
    dom.modelSearch.focus();
    setStatus('error', 'Pick a target model first');
    return;
  }

  // Check API key for this provider
  const apiKey = getKey(state.selectedModel.apiProvider);
  if (!apiKey) {
    const input = document.getElementById('inline-api-input');
    if (input) {
      input.focus();
      input.style.borderColor = 'var(--red)';
      setTimeout(() => (input.style.borderColor = ''), 900);
    }
    setStatus('error', `Add your ${state.selectedModel.keyLabel} first`);
    return;
  }

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
        'x-api-key': apiKey,
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
  setStatus('', 'Select a model to get started');

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
