const panels = document.querySelectorAll('.panel-head');
panels.forEach((button) => {
  button.addEventListener('click', () => {
    const panel = button.closest('.panel');
    panel.classList.toggle('open');
  });
});

const searchData = [
  {
    title: 'Как правильно жениться?',
    description: 'Введение, цели, причины создания и структура цикла.',
    url: 'marriage.html',
    keywords: 'жениться брак жена супруга сватовство семья мужчина женщина выбор критерии никах введение цели причины цикл лекций материал'
  },
  {
    title: 'Введение к циклу',
    description: 'Суть материала и направление обучающего цикла лекций.',
    url: 'marriage.html#intro',
    keywords: 'введение суть материал цикл лекции методология вступления в брак образование мусульман'
  },
  {
    title: 'Цели цикла лекций',
    description: 'Цели цикла: понимание брака, методология поиска и современные вызовы.',
    url: 'marriage.html#lecture-goals',
    keywords: 'цели цикла лекций важность брака методология поиска супруга супруги вызовы опасности психология либерализм феминизм'
  },
  {
    title: 'Причины создания цикла лекций',
    description: 'Причины создания цикла и ремарка об ориентации материала.',
    url: 'marriage.html#lecture-reasons',
    keywords: 'причины создания цикла лекций общество семьи ошибки мусульман исламское общество довольство Аллаха'
  },
  {
    title: 'Цели создания данного материала',
    description: 'Рецензии, экспертная обратная связь, команда и курирование.',
    url: 'marriage.html#material-goals',
    keywords: 'цели создания материала эксперты рецензии обратная связь команда аудиторы имамы исламские вузы специалисты курирование консультации'
  },
  {
    title: 'Глава 1. Общая характеристика благих людей. Кто такой благой мужчина?',
    description: 'Первая опубликованная глава цикла.',
    url: 'chapter1.html',
    keywords: 'мужчина благой хороший ответственность аллах мечеть договор знание семья'
  },
  {
    title: 'История феминизма: как, зачем и в чьих интересах?',
    description: 'Тема в разработке.',
    url: 'marriage.html#chapter-2',
    keywords: 'феминизм история модерн промышленная революция эмансипация идентичность'
  },
  {
    title: 'Кто такая благая женщина?',
    description: 'Тема в разработке.',
    url: 'marriage.html#chapter-3',
    keywords: 'женщина благая покорность преданность нрав религия жена'
  },
  {
    title: 'Где и как искать хорошую жену?',
    description: 'Тема в разработке.',
    url: 'marriage.html#chapter-4',
    keywords: 'искать жена джамаат знакомые рекомендация сватовство'
  },
  {
    title: 'Алгоритм поиска и оценки конкретной кандидатуры',
    description: 'Тема в разработке.',
    url: 'marriage.html#chapter-5',
    keywords: 'алгоритм оценка кандидатура внешность встреча вопросы поведение'
  },
  {
    title: 'Новая эпоха и современные явления',
    description: 'Тема в разработке.',
    url: 'marriage.html#chapter-7',
    keywords: 'новая эпоха кинематограф социальные сети саморазвитие карьеризм что если быт'
  },
  {
    title: 'Семья и воспитание',
    description: 'Будущий раздел о семье и воспитании.',
    url: 'index.html#sections',
    keywords: 'семья дети воспитание отец мать дом ответственность'
  },
  {
    title: 'Аудио-лекции',
    description: 'Страница под аудио, записи и серии.',
    url: 'audio.html',
    keywords: 'аудио лекции запись mp3 скачать слушать серии'
  },
  {
    title: 'О проекте',
    description: 'Короткая страница о формате и задаче проекта.',
    url: 'about.html',
    keywords: 'проект way the straight way цель польза материалы статьи'
  }
];

const synonymMap = {
  'брак': ['жениться', 'женитьба', 'никах', 'свадьба', 'семья'],
  'жениться': ['брак', 'никах', 'жена', 'супруга', 'сватовство'],
  'жена': ['супруга', 'женщина', 'брак', 'жениться'],
  'муж': ['мужчина', 'семья', 'ответственность'],
  'мужчина': ['муж', 'ответственность', 'семья', 'благой'],
  'женщина': ['жена', 'супруга', 'благая'],
  'лекция': ['аудио', 'запись', 'слушать'],
  'аудио': ['лекция', 'запись', 'слушать'],
  'дети': ['воспитание', 'семья', 'дом'],
  'воспитание': ['дети', 'семья', 'дом'],
  'ценности': ['традиции', 'семья', 'польза'],
  'ислам': ['аллах', 'религия', 'мусульманин']
};

function normalizeText(value) {
  return (value || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я0-9\s-]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function expandTerms(terms) {
  const expanded = new Set(terms);
  terms.forEach((term) => {
    const synonyms = synonymMap[term] || [];
    synonyms.forEach((item) => expanded.add(normalizeText(item)));
  });
  return [...expanded];
}

function scoreItem(item, terms) {
  const haystack = normalizeText(`${item.title} ${item.description} ${item.keywords}`);
  let score = 0;
  terms.forEach((term) => {
    if (!term) return;
    if (haystack.includes(term)) score += 6;
    haystack.split(' ').forEach((word) => {
      if (word === term) score += 5;
      else if (term.length >= 4 && word.startsWith(term)) score += 3;
      else if (term.length >= 5 && word.includes(term)) score += 2;
    });
  });
  return score;
}

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput && searchResults) {
  searchInput.addEventListener('input', () => {
    const raw = normalizeText(searchInput.value);
    if (!raw) {
      searchResults.classList.remove('open');
      searchResults.innerHTML = '';
      document.querySelectorAll('.panel').forEach((panel) => { panel.hidden = false; });
      return;
    }

    const terms = expandTerms(raw.split(' ').filter((word) => word.length > 1));
    const results = searchData
      .map((item) => ({ ...item, score: scoreItem(item, terms) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7);

    document.querySelectorAll('.panel').forEach((panel) => {
      const text = normalizeText(`${panel.innerText} ${panel.dataset.search}`);
      panel.hidden = !terms.some((term) => text.includes(term));
    });

    if (!results.length) {
      searchResults.innerHTML = '<div class="search-empty">Точных совпадений нет. Попробуйте другое слово: брак, семья, аудио, воспитание.</div>';
    } else {
      searchResults.innerHTML = results.map((item) => `
        <a class="search-item" href="${item.url}">
          <strong>${item.title}</strong>
          <span>${item.description}</span>
        </a>
      `).join('');
    }
    searchResults.classList.add('open');
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-wrap')) {
      searchResults.classList.remove('open');
    }
  });
}
