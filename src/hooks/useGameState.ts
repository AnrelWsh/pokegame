import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPokemon, fetchPokemonList, fetchPokemonSpecies, getRandomFromList } from '../lib/api';
import type { Pokemon, PokemonSpecies } from '../lib/types';

export interface GameState {
  pokemon: Pokemon | null;
  species: PokemonSpecies | null;
  loading: boolean;
  error: string | null;
  guessed: boolean;
  revealed: boolean;
  wrongGuesses: number[];
  handleGuess: (id: number) => boolean;
  abandon: () => void;
  nextPokemon: () => void;
}

export function useGameState(): GameState {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guessed, setGuessed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState<number[]>([]);
  const loadingRef = useRef(false);

  const loadNewPokemon = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);
    setGuessed(false);
    setRevealed(false);
    setWrongGuesses([]);
    setPokemon(null);
    setSpecies(null);

    try {
      const list = await fetchPokemonList();
      const random = getRandomFromList(list);
      const [pok, spec] = await Promise.all([
        fetchPokemon(random.id),
        fetchPokemonSpecies(random.id),
      ]);
      setPokemon(pok);
      setSpecies(spec);
    } catch {
      setError('Erreur lors du chargement du Pokémon. Réessayez.');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadNewPokemon();
  }, [loadNewPokemon]);

  const handleGuess = useCallback(
    (id: number): boolean => {
      if (!pokemon || guessed) return false;
      if (id === pokemon.id) {
        setGuessed(true);
        setRevealed(true);
        return true;
      }
      setWrongGuesses((prev) => (prev.includes(id) ? prev : [...prev, id]));
      return false;
    },
    [pokemon, guessed]
  );

  const abandon = useCallback(() => {
    setRevealed(true);
  }, []);

  return {
    pokemon,
    species,
    loading,
    error,
    guessed,
    revealed,
    wrongGuesses,
    handleGuess,
    abandon,
    nextPokemon: loadNewPokemon,
  };
}
