import type { Trigger } from './match';
import { materials, tools, experienceLevels, tableSpace, messLevels } from '../data/vocab';

/** Plain-language heading for an adaptation, e.g. "No printing press". */
export function describeTrigger(t: Trigger): string {
  switch (t.type) {
    case 'missing-material':
      return `No ${materials[t.item].label.toLowerCase()}`;
    case 'missing-tool':
      return `No ${tools[t.item].label.toLowerCase()}`;
    case 'more-students':
      return `Up to ${t.upTo} students`;
    case 'fewer-students':
      return `As few as ${t.downTo} students`;
    case 'shorter-sessions':
      return `Sessions as short as ${t.minMinutes} minutes`;
    case 'fewer-sessions':
      return `Only ${t.minSessions} session${t.minSessions === 1 ? '' : 's'}`;
    case 'younger':
      return `Students as young as ${t.minAge}`;
    case 'older':
      return `Students up to age ${t.maxAge}`;
    case 'experience':
      return `${experienceLevels[t.level]} students`;
    case 'no-sink':
      return 'No sink';
    case 'less-space':
      return `${tableSpace[t.tableSpace].split(' (')[0]} table space`;
    case 'lower-mess':
      return `${messLevels[t.mess]} mess only`;
    case 'no-ventilation':
      return 'No extra ventilation';
  }
}
