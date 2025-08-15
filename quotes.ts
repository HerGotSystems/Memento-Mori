
import { Quote } from '@/types/mortality';

export const MEMENTO_MORI_QUOTES: Quote[] = [
  {
    text: "It is not death that a man should fear, but never beginning to live.",
    author: "Marcus Aurelius",
    category: "stoic"
  },
  {
    text: "Death is not the opposite of life, but a part of it.",
    author: "Haruki Murakami",
    category: "modern"
  },
  {
    text: "The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.",
    author: "Mark Twain",
    category: "modern"
  },
  {
    text: "Memento mori - remember you will die. Remember you must die. This is not a morbid practice but a way to appreciate and savor every moment of life.",
    author: "Amy Krouse Rosenthal",
    category: "modern"
  },
  {
    text: "You could die today. Let this determine what you do and say and think.",
    author: "Marcus Aurelius",
    category: "stoic"
  },
  {
    text: "Death is nothing to us. When we are, death is not yet present, and when death is present, we are not.",
    author: "Epicurus",
    category: "stoic"
  },
  {
    text: "The meaning of life is that it stops.",
    author: "Franz Kafka",
    category: "existential"
  },
  {
    text: "Life is like a candle flame, flickering and dancing, beautiful because it burns.",
    author: "Ugo Betti",
    category: "modern"
  },
  {
    text: "We are here to drink beer. We are here to kill war. We are here to laugh at the odds and live our lives so well that Death will tremble to take us.",
    author: "Charles Bukowski",
    category: "modern"
  },
  {
    text: "Death is the veil which those who live call life; They sleep, and it is lifted.",
    author: "Percy Bysshe Shelley",
    category: "modern"
  },
  {
    text: "The bitterest tears shed over graves are for words left unsaid and deeds left undone.",
    author: "Harriet Beecher Stowe",
    category: "modern"
  },
  {
    text: "Death is not extinguishing the light; it is only putting out the lamp because the dawn has come.",
    author: "Rabindranath Tagore",
    category: "modern"
  },
  {
    text: "Every man dies. Not every man really lives.",
    author: "William Wallace",
    category: "modern"
  },
  {
    text: "The goal isn't to live forever, the goal is to create something that will.",
    author: "Chuck Palahniuk",
    category: "modern"
  },
  {
    text: "Death is the great equalizer.",
    author: "Claudius",
    category: "stoic"
  },
  {
    text: "Life is pleasant. Death is peaceful. It's the transition that's troublesome.",
    author: "Isaac Asimov",
    category: "modern"
  },
  {
    text: "The boundaries which divide Life from Death are at best shadowy and vague. Who shall say where the one ends, and where the other begins?",
    author: "Edgar Allan Poe",
    category: "modern"
  },
  {
    text: "Death is the ultimate boundary of human matters.",
    author: "Horace",
    category: "stoic"
  },
  {
    text: "All conditioned things are impermanent. Work out your salvation with diligence.",
    author: "Buddha",
    category: "buddhist"
  },
  {
    text: "Death is not the greatest loss in life. The greatest loss is what dies inside us while we live.",
    author: "Norman Cousins",
    category: "modern"
  }
];

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * MEMENTO_MORI_QUOTES.length);
  return MEMENTO_MORI_QUOTES[randomIndex];
}

export function getQuotesByCategory(category: Quote['category']): Quote[] {
  return MEMENTO_MORI_QUOTES.filter(quote => quote.category === category);
}

export function getAllQuotes(): Quote[] {
  return [...MEMENTO_MORI_QUOTES];
}
