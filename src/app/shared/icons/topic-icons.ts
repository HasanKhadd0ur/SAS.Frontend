export class TopicIcon {
  private static iconClassMap: Record<string, string> = {
    'icons/protest.svg': 'fa-solid fa-person-booth',
    'icons/fire.svg': 'fa-solid fa-fire',
    'icons/explosion.svg': 'fa-solid fa-bomb',
    'icons/police.svg': 'fa-solid fa-shield-alt',
    'icons/airstrike.svg': 'fa-solid fa-fighter-jet',
    'news/governorates': 'fa-solid fa-globe blue'
  };

  /**
   * Returns the FA icon class if found, otherwise null to use default Leaflet marker.
   */
  static getFaClass(iconUrl?: string | null): string | null {
    if (!iconUrl) return null;
    return this.iconClassMap[iconUrl] || null;
  }
}
