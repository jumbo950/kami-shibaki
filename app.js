document.addEventListener('DOMContentLoaded', () => {
  initializeViewer();
});

async function initializeViewer() {
  const characterNameElement = document.getElementById('character-name');
  const bibleContentElement = document.getElementById('bible-content');
  const imageListElement = document.getElementById('image-list');

  try {
    const manifest = await fetchJson('manifest.json');
    const characterId = getCharacterId();
    const character = findCharacter(manifest, characterId);

    if (!character) {
      characterNameElement.textContent = 'Character Not Found';
      bibleContentElement.innerHTML = '<p>指定されたキャラクターが見つかりません。</p>';
      imageListElement.innerHTML = '';
      return;
    }

    characterNameElement.textContent = character.name;

    await loadBible(character.bible, bibleContentElement);
    await loadImageList(character.images, imageListElement);
    setupImageModal();
  } catch (error) {
    characterNameElement.textContent = 'Load Error';
    bibleContentElement.innerHTML = '<p>データの読み込みに失敗しました。</p>';
    imageListElement.innerHTML = '';
    console.error(error);
  }
}

function getCharacterId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id') || 'agro';
}

function findCharacter(manifest, characterId) {
  if (!manifest || !Array.isArray(manifest.characters)) {
    return null;
  }

  return manifest.characters.find((character) => character.id === characterId) || null;
}

async function fetchJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to fetch JSON: ${path}`);
  }

  return response.json();
}

async function fetchText(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to fetch text: ${path}`);
  }

  return response.text();
}

async function loadBible(path, container) {
  try {
    const markdown = await fetchText(path);
    container.innerHTML = renderMarkdown(markdown);
  } catch (error) {
    container.innerHTML = '<p>Character Bibleの読み込みに失敗しました。</p>';
    console.error(error);
  }
}

async function loadImageList(path, container) {
  try {
    const imageList = await fetchJson(path);
    renderImageList(imageList, container);
  } catch (error) {
    container.innerHTML = '<p>Reference Imagesの読み込みに失敗しました。</p>';
    console.error(error);
  }
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const html = [];
  let inCodeBlock = false;
  let codeLines = [];
  let inList = false;
  let inTable = false;
  let tableAlignments = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        codeLines = [];
        inCodeBlock = false;
      } else {
        closeList();
        closeTable();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (trimmed === '') {
      closeList();
      closeTable();
      continue;
    }

    if (isTableHeader(lines, index)) {
      closeList();
      closeTable();
      tableAlignments = parseTableAlignments(lines[index + 1]);
      html.push('<table>');
      html.push('<thead>');
      html.push(`<tr>${parseTableRow(line, tableAlignments, 'th')}</tr>`);
      html.push('</thead>');
      html.push('<tbody>');
      inTable = true;
      index += 1;
      continue;
    }

    if (inTable && isTableRow(line)) {
      html.push(`<tr>${parseTableRow(line, tableAlignments, 'td')}</tr>`);
      continue;
    }

    if (inTable) {
      closeTable();
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      const text = renderInlineMarkdown(headingMatch[2]);
      html.push(`<h${level}>${text}</h${level}>`);
      continue;
    }

    const listMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (listMatch) {
      closeTable();
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${renderInlineMarkdown(listMatch[1])}</li>`);
      continue;
    }

    closeList();
    closeTable();
    html.push(`<p>${renderInlineMarkdown(trimmed)}</p>`);
  }

  if (inCodeBlock) {
    html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
  }

  closeList();
  closeTable();

  return html.join('\n');

  function closeList() {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  }

  function closeTable() {
    if (inTable) {
      html.push('</tbody>');
      html.push('</table>');
      inTable = false;
      tableAlignments = [];
    }
  }
}

function isTableHeader(lines, index) {
  if (index + 1 >= lines.length) {
    return false;
  }

  return isTableRow(lines[index]) && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1]);
}

function isTableRow(line) {
  return line.includes('|') && line.trim().length > 0;
}

function parseTableAlignments(separatorLine) {
  return splitTableRow(separatorLine).map((cell) => {
    const trimmed = cell.trim();
    const startsWithColon = trimmed.startsWith(':');
    const endsWithColon = trimmed.endsWith(':');

    if (startsWithColon && endsWithColon) {
      return 'center';
    }

    if (endsWithColon) {
      return 'right';
    }

    return 'left';
  });
}

function parseTableRow(line, alignments, cellTag) {
  return splitTableRow(line)
    .map((cell, index) => {
      const alignment = alignments[index] || 'left';
      return `<${cellTag} style="text-align: ${alignment};">${renderInlineMarkdown(cell.trim())}</${cellTag}>`;
    })
    .join('');
}

function splitTableRow(line) {
  let trimmed = line.trim();

  if (trimmed.startsWith('|')) {
    trimmed = trimmed.slice(1);
  }

  if (trimmed.endsWith('|')) {
    trimmed = trimmed.slice(0, -1);
  }

  return trimmed.split('|');
}

function renderInlineMarkdown(text) {
  let html = escapeHtml(text);

  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

  return html;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderImageList(imageList, container) {
  container.innerHTML = '';

  if (!imageList || !Array.isArray(imageList.images) || imageList.images.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Reference Images are not registered.';
    container.appendChild(emptyMessage);
    return;
  }

  imageList.images.forEach((image) => {
    if (!image || !image.path) {
      return;
    }

    const button = document.createElement('button');
    button.className = 'image-button';
    button.type = 'button';

    const thumbnail = document.createElement('img');
    thumbnail.src = image.path;
    thumbnail.alt = image.title || 'Reference Image';
    thumbnail.loading = 'lazy';

    const caption = document.createElement('span');
    caption.textContent = image.title || image.path;

    button.appendChild(thumbnail);
    button.appendChild(caption);

    button.addEventListener('click', () => {
      openImageModal(image.path, image.title || 'Reference Image');
    });

    container.appendChild(button);
  });
}

function setupImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const closeButton = document.getElementById('modal-close');

  if (!modal || !modalImage || !closeButton) {
    return;
  }

  closeButton.addEventListener('click', closeImageModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeImageModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeImageModal();
    }
  });
}

function openImageModal(path, title) {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');

  if (!modal || !modalImage) {
    return;
  }

  modalImage.src = path;
  modalImage.alt = title;
  modal.setAttribute('aria-hidden', 'false');
}

function closeImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');

  if (!modal || !modalImage) {
    return;
  }

  modal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
}
