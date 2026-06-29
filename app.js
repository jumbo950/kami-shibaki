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
    container.textContent = markdown;
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
