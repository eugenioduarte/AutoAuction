type FilterState = {
  selectedMake: string | null
  selectedModel: string | null
  selectedFuel: string | null
  selectedEngineSize: string | null
  yearRange: [string, string]
  mileageRange: [string, string]
  auctionDateRange: [string, string]
  startingBidRange: [string, string]
  onlyFavourites: boolean
}

type FilterAction =
  | { type: 'SET_MAKE'; payload: string | null }
  | { type: 'SET_MODEL'; payload: string | null }
  | { type: 'SET_FUEL'; payload: string | null }
  | { type: 'SET_ENGINE_SIZE'; payload: string | null }
  | { type: 'SET_YEAR'; payload: [string, string] }
  | { type: 'SET_MILEAGE'; payload: [string, string] }
  | { type: 'SET_AUCTION_DATE'; payload: [string, string] }
  | { type: 'SET_STARTING_BID'; payload: [string, string] }
  | { type: 'SET_ONLY_FAVOURITES'; payload: boolean }
  | { type: 'RESET' }

const initialFilterState: FilterState = {
  selectedMake: null,
  selectedModel: null,
  selectedFuel: null,
  selectedEngineSize: null,
  yearRange: ['', ''],
  mileageRange: ['', ''],
  auctionDateRange: ['', ''],
  startingBidRange: ['', ''],
  onlyFavourites: false,
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_MAKE':
      return { ...state, selectedMake: action.payload, selectedModel: null }
    case 'SET_MODEL':
      return { ...state, selectedModel: action.payload }
    case 'SET_FUEL':
      return { ...state, selectedFuel: action.payload }
    case 'SET_ENGINE_SIZE':
      return { ...state, selectedEngineSize: action.payload }
    case 'SET_YEAR':
      return { ...state, yearRange: action.payload }
    case 'SET_MILEAGE':
      return { ...state, mileageRange: action.payload }
    case 'SET_AUCTION_DATE':
      return { ...state, auctionDateRange: action.payload }
    case 'SET_STARTING_BID':
      return { ...state, startingBidRange: action.payload }
    case 'SET_ONLY_FAVOURITES':
      return { ...state, onlyFavourites: action.payload }
    case 'RESET':
      return initialFilterState
    default:
      return state
  }
}

export { FilterAction, filterReducer, FilterState, initialFilterState }
