import { ServiceKey } from './Service'

export interface PresenceService {
  setActivity(activity: string): Promise<void>
  /**
   * Set an activity that stays visible while the game is running (regular
   * activities are cleared when a game starts). Cleared automatically when
   * the last game process exits.
   */
  setPlaying(activity: string): Promise<void>
}

export const PresenceServiceKey: ServiceKey<PresenceService> = 'PresenceService'
