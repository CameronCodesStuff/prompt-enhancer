/* PromptForge — app.js */

'use strict';

// ── State ──────────────────────────────────────────────────────────

const state = {
  apiKey: localStorage.getItem('pf_api_key') || '',
  lastResult: null,
  isLoading: false,
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
  // Options
  outputFormat:   $('opt-output'),
  graphicStyle:   $('opt-graphic'),
  targetAudience: $('opt-audience'),
  complexity:     $('opt-complexity'),
  // Toggles
  toneGroup:      document.querySelector('.tone-toggle'),
  // Checkboxes
  checkAnimations:$('chk-animations'),
  checkAccessible:$('chk-accessible'),
  checkDarkMode:  $('chk-darkmode'),
  checkComments:  $('chk-comments'),
  checkResponsive:$('chk-responsive'),
  checkInteract:  $('chk-interactive'),
};

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
  const len = dom.promptInput.value.length;
  dom.charCount.textContent = `${len.toLocaleString()} chars`;
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

  return `You are PromptForge, an elite AI prompt engineer. Your sole purpose is to transform a basic, vague, or mediocre prompt into an extraordinarily detailed, precise, and powerful prompt that will get world-class results from any AI model.

OUTPUT FORMAT: Respond with a JSON object (no markdown fences) with exactly these keys:
{
  "strengthScore": <number 0-100, rating the original prompt>,
  "strengthLabel": <"Weak" | "Moderate" | "Strong" | "Excellent">,
  "forgedPrompt": <the fully rewritten, massively enhanced prompt as a single string>,
  "keyImprovements": <array of 3-5 short strings listing what you improved>,
  "technicalSpec": <a compact technical specification block as a string, relevant to the output format>,
  "suggestedModel": <the ideal AI model or tool for this task, e.g. "Claude Opus", "GPT-4o", "Midjourney v6">
}

Context about the user's target output:
- Output format: ${opts.outputFormat}
- Visual/Graphic style: ${opts.graphicStyle}
- Target audience: ${opts.targetAudience}
- Complexity level: ${opts.complexity}
- Tone: ${opts.tone}
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
9. The forged prompt should feel like it was written by a senior product manager, designer, and engineer collaborating together — exhaustively specific yet readable

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
  state.lastResult = data;

  const color = strengthColor(data.strengthScore);

  const improvements = (data.keyImprovements || [])
    .map(imp => `<li>${escHtml(imp)}</li>`)
    .join('');

  const chips = [
    `<span class="meta-chip output">${escHtml(opts.outputFormat)}</span>`,
    `<span class="meta-chip graphic">${escHtml(opts.graphicStyle)}</span>`,
    `<span class="meta-chip extra">${escHtml(opts.targetAudience)}</span>`,
    `<span class="meta-chip extra">${escHtml(opts.complexity)}</span>`,
  ].join('');

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
            <div class="strength-bar-fill"
                 style="width:${data.strengthScore}%; background:${color}"></div>
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
        <div class="result-section-title">Suggested Model</div>
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
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Forge! ─────────────────────────────────────────────────────────

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

  if (!state.apiKey) {
    showModal();
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

  // Loading placeholder
  dom.outputBody.innerHTML = `
    <div class="result-block">
      <div class="result-section">
        <div class="result-section-title">Forged Prompt</div>
        <div class="result-text stream-cursor" id="stream-placeholder">Working on it…</div>
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
        messages: [
          {
            role: 'user',
            content: `Here is my prompt to forge:\n\n${prompt}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API error ${response.status}`);
    }

    const data = await response.json();
    const raw = data?.content?.[0]?.text || '';

    // Strip possible markdown fences
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // Fallback: show raw text as forgedPrompt
      parsed = {
        strengthScore: 50,
        strengthLabel: 'Moderate',
        forgedPrompt: raw,
        keyImprovements: ['Full enhancement applied'],
        technicalSpec: '',
        suggestedModel: '',
      };
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
    setTimeout(() => {
      dom.copyBtn.classList.remove('success');
      dom.copyBtn.innerHTML = '<span>⧉</span> Copy';
    }, 2000);
  } catch {
    dom.copyBtn.textContent = 'Failed';
  }
});

// ── Export ─────────────────────────────────────────────────────────

dom.exportBtn.addEventListener('click', () => {
  if (!state.lastResult) return;

  const opts = collectOptions();
  const d = state.lastResult;
  const ts = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const lines = [
    '═══════════════════════════════════════════════',
    '  PROMPTFORGE — Exported Prompt',
    `  ${ts}`,
    '═══════════════════════════════════════════════',
    '',
    `Output Format  : ${opts.outputFormat}`,
    `Graphic Style  : ${opts.graphicStyle}`,
    `Audience       : ${opts.targetAudience}`,
    `Complexity     : ${opts.complexity}`,
    `Tone           : ${opts.tone}`,
    `Orig. Strength : ${d.strengthScore}/100 (${d.strengthLabel})`,
    `Suggested Model: ${d.suggestedModel || 'N/A'}`,
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
    ...(d.keyImprovements || []).map((imp, i) => `  ${i + 1}. ${imp}`),
    '',
    d.technicalSpec ? [
      '───────────────────────────────────────────────',
      'TECHNICAL SPEC',
      '───────────────────────────────────────────────',
      '',
      d.technicalSpec,
      '',
    ].join('\n') : '',
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
  if (!state.apiKey) {
    setStatus('', 'No API key — click the key icon');
    showModal();
  } else {
    setStatus('ready', 'Ready');
  }

  // Prompt examples cycling
  const examples = [
    'Make me a landing page for my SaaS product',
    'Write code for a snake game',
    'Create a data visualization dashboard',
    'Build a portfolio website for a photographer',
    'Make a CLI tool that converts CSV to JSON',
    'Design a mobile app UI for a fitness tracker',
  ];

  let exIdx = 0;
  dom.promptInput.setAttribute('placeholder', `e.g. "${examples[0]}"`);

  setInterval(() => {
    exIdx = (exIdx + 1) % examples.length;
    dom.promptInput.setAttribute('placeholder', `e.g. "${examples[exIdx]}"`);
  }, 4000);
})();
