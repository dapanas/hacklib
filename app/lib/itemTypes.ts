export type ItemType = 'book' | 'boardgame' | 'videogame' | 'electronics';

export interface ItemTypeConfig {
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  route: string;
  detailRoute: string;
}

export const ITEM_TYPES: Record<ItemType, ItemTypeConfig> = {
  book: {
    label: 'Book',
    emoji: '📚',
    color: 'primary',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-700',
    borderColor: 'border-primary-200',
    route: '/books',
    detailRoute: '/book'
  },
  boardgame: {
    label: 'Board Game',
    emoji: '🎲',
    color: 'boardgame',
    bgColor: 'bg-boardgame-50',
    textColor: 'text-boardgame-700',
    borderColor: 'border-boardgame-200',
    route: '/boardgames',
    detailRoute: '/boardgame'
  },
  videogame: {
    label: 'Video Game',
    emoji: '🎮',
    color: 'videogame',
    bgColor: 'bg-videogame-50',
    textColor: 'text-videogame-700',
    borderColor: 'border-videogame-200',
    route: '/videogames',
    detailRoute: '/videogame'
  },
  electronics: {
    label: 'Electronics',
    emoji: '🔌',
    color: 'electronics',
    bgColor: 'bg-electronics-50',
    textColor: 'text-electronics-700',
    borderColor: 'border-electronics-200',
    route: '/electronics',
    detailRoute: '/electronic'
  }
};

export function getItemTypeConfig(itemType: ItemType): ItemTypeConfig {
  return ITEM_TYPES[itemType];
}

export function getItemTypeFromRoute(route: string): ItemType | null {
  switch (route) {
    case '/books':
    case '/book':
      return 'book';
    case '/boardgames':
    case '/boardgame':
      return 'boardgame';
    case '/videogames':
    case '/videogame':
      return 'videogame';
    case '/electronics':
    case '/electronic':
      return 'electronics';
    default:
      return null;
  }
}

export function getItemTypeFromId(itemId: string): ItemType {
  // Try to determine item type from ID patterns
  if (itemId.includes('--')) {
    const parts = itemId.split('--');
    if (parts.length >= 2) {
      // Check if it matches known patterns
      if (itemId.includes('boardgame') || itemId.includes('bg-')) {
        return 'boardgame';
      }
      if (itemId.includes('videogame') || itemId.includes('vg-')) {
        return 'videogame';
      }
      if (itemId.includes('electronic') || itemId.includes('el-')) {
        return 'electronics';
      }
    }
  }
  
  // Default to book for backward compatibility
  return 'book';
}

export function getItemTypeBadge(itemType: ItemType): string {
  const config = getItemTypeConfig(itemType);
  return `${config.emoji} ${config.label}`;
}

export function getItemTypeIcon(itemType: ItemType): string {
  return getItemTypeConfig(itemType).emoji;
}

export function getItemTypeLabel(itemType: ItemType): string {
  return getItemTypeConfig(itemType).label;
}

export function getItemTypeColor(itemType: ItemType): string {
  return getItemTypeConfig(itemType).color;
}

export function getItemTypeRoute(itemType: ItemType): string {
  return getItemTypeConfig(itemType).route;
}

export function getItemTypeDetailRoute(itemType: ItemType): string {
  return getItemTypeConfig(itemType).detailRoute;
}

export function getAllItemTypes(): ItemType[] {
  return Object.keys(ITEM_TYPES) as ItemType[];
}

export function getItemTypeStats(): Record<ItemType, number> {
  // This would be populated by the data layer
  return {
    book: 0,
    boardgame: 0,
    videogame: 0,
    electronics: 0
  };
}
