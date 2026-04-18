import { useState, useRef, useEffect, useMemo } from 'react';
import { fetchPokemonList } from '../lib/api';
import { normalizeString } from '../lib/utils';
import type { PokemonListItem } from '../lib/types';

interface PokemonInputProps {
  onGuess: (id: number, name: string) => void;
  disabled?: boolean;
  excludeIds?: number[];
}

export function PokemonInput({ onGuess, disabled, excludeIds = [] }: PokemonInputProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<PokemonListItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPokemonList().then(setList);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = normalizeString(query);
    return list
      .filter(
        (p) =>
          !excludeIds.includes(p.id) &&
          (normalizeString(p.nameFr).includes(q) || normalizeString(p.name).includes(q))
      )
      .slice(0, 8);
  }, [query, list, excludeIds]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length]);

  const select = (item: PokemonListItem) => {
    onGuess(item.id, item.nameFr || item.name);
    setQuery('');
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || filtered.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIndex]) select(filtered[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Bonne réponse !' : 'Tapez un nom Pokémon…'}
          className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          autoComplete="off"
        />
        {query && !disabled && (
          <button
            onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {open && filtered.length > 0 && !disabled && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-xl overflow-hidden shadow-2xl z-50 animate-fade-in"
        >
          {filtered.map((item, i) => (
            <button
              key={item.id}
              onMouseDown={(e) => { e.preventDefault(); select(item); }}
              onMouseEnter={() => setActiveIndex(i)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-700 transition-colors ${
                i === activeIndex ? 'bg-gray-700' : ''
              }`}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                alt=""
                className="w-8 h-8 object-contain"
                loading="lazy"
              />
              <div>
                <span className="text-white font-medium">{item.nameFr || item.name}</span>
                {item.nameFr && item.nameFr !== item.name && (
                  <span className="text-gray-500 text-xs ml-2">#{item.id}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
