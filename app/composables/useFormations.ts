import { computed } from 'vue'
import { formations } from '~/data/formations'
import type { Formation } from '~/data/formations'
import { categories } from '~/data/categories'

const LEVEL_MAP: Record<string, string> = {
  'Initiation': 'Initiation',
  'Beginner': 'Initiation',
  'Intermédiaire': 'Intermédiaire',
  'Avancé': 'Avancé',
  'Expert': 'Expert',
  'A1-A2': 'Initiation',
  'B1-B2': 'Intermédiaire',
  'C1-C2': 'Avancé',
  'Tous Niveaux': 'Tous Niveaux',
}

export function useFormations() {
  const allFormations = formations
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const selectedLevel = ref('')

  const uniqueCategories = computed(() => {
    const cats = new Set(allFormations.map((f) => f.categorie))
    return Array.from(cats).sort()
  })

  const categoryCards = computed(() => categories)

  const uniqueLevels = ['Initiation', 'Intermédiaire', 'Avancé', 'Expert']

  const filteredFormations = computed(() => {
    let result = allFormations

    if (selectedCategory.value) {
      result = result.filter((f) => f.categorie === selectedCategory.value)
    }

    if (selectedLevel.value) {
      result = result.filter((f) => {
        const mapped = LEVEL_MAP[f.niveau] || f.niveau
        return mapped === selectedLevel.value
      })
    }

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        (f) =>
          f.titre.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.categorie.toLowerCase().includes(q)
      )
    }

    return result
  })

  function getFormationById(id: string): Formation | undefined {
    return allFormations.find((f) => f.id === id)
  }

  function getFormationsByCategory(categorie: string): Formation[] {
    return allFormations.filter((f) => f.categorie === categorie)
  }

  return {
    allFormations,
    searchQuery,
    selectedCategory,
    selectedLevel,
    uniqueCategories,
    uniqueLevels,
    categoryCards,
    filteredFormations,
    getFormationById,
    getFormationsByCategory,
  }
}
