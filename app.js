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
    renderImageList(character.images, imageListElement);
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
    container.textContent = markdown;
  } catch (error) {
    container.innerHTML = '<p>Character Bibleの読み込みに失敗しました。</p>';
    console.error(error);
  }
}

function renderImageList(imagePath, container) {
  container.innerHTML = '';

  const placeholder = document.createElement('p');
  placeholder.textContent = 'Reference Images will be displayed here.';
  container.appendChild(placeholder);

  container.dataset.imagePath = imagePath;
}

function setupImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const closeButton = document.getElementById('modal-close');

  if (!modal || !modalImage || !closeButton) {
    return;
  }

  closeButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
  }
}
